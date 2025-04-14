import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { runMigrations } from "./db";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { spawn } from 'child_process';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up proxy for Falkor Exchange (Rails app running on port 3000)
app.use('/falkor', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/falkor': '/', // Remove the /falkor prefix when forwarding to the Rails app
  },
  // @ts-ignore - logLevel is a valid property but not in the type definition
  logLevel: 'debug',
  // @ts-ignore - Types are not being correctly inferred
  onProxyReq: (proxyReq, req, res) => {
    log(`Proxying request to Falkor Exchange: ${req.method} ${req.path}`);
  },
  // @ts-ignore - Types are not being correctly inferred
  onError: (err, req, res) => {
    log(`Proxy error: ${err.message}`, "error");
    res.status(502).json({ 
      message: "The Falkor Exchange seems to be taking a siesta, like Mark Twain on a hammock by the river."
    });
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Function to start Falkor Exchange
function startFalkorExchange() {
  log("Starting Falkor Exchange...");
  
  // Start the Falkor Exchange directly with Node.js
  const falkorProcess = spawn('node', ['FalkorExchange/server.js'], {
    stdio: 'pipe',
    detached: false
  });
  
  falkorProcess.stdout.on('data', (data) => {
    log(`Falkor Exchange: ${data.toString().trim()}`, "falkor");
  });
  
  falkorProcess.stderr.on('data', (data) => {
    log(`Falkor Exchange Error: ${data.toString().trim()}`, "error");
  });
  
  falkorProcess.on('close', (code) => {
    if (code !== 0) {
      log(`Falkor Exchange process exited with code ${code}`, "error");
    }
  });
  
  // Give the Falkor Exchange a moment to start up
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      log("Waiting for Falkor Exchange to start...");
      resolve();
    }, 2000);
  });
}

(async () => {
  try {
    // Run database migrations before registering routes
    await runMigrations();
    log("Database initialized successfully");
    
    // Start Falkor Exchange
    await startFalkorExchange();
    log("Falkor Exchange ready or starting up");
  } catch (error) {
    log(`Initialization error: ${error}`, "error");
  }
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const originalMessage = err.message || "Internal Server Error";
    
    // Mark Twain style humor for errors
    const humorousMessages = {
      400: "Well now, seems you've sent a request as crooked as a politician's path. Let's get that straightened out.",
      401: "I reckon you ain't authorized to do that. As I always say, 'Get your facts first, then you can distort them as you please.'",
      403: "Forbidden territory, friend! Like trying to enter the captain's quarters without an invitation.",
      404: "Can't find what you're looking for? Reminds me of that time I searched for common sense in Congress.",
      500: "The system appears to have tripped over its own feet. Even the Mississippi has its bad days."
    };
    
    const message = humorousMessages[status as keyof typeof humorousMessages] || 
      "Like a boat stuck on a sandbar, our system seems to be experiencing some troubles.";
    
    // Log the original error for debugging
    log(`Error ${status}: ${originalMessage}`, "error");
    
    res.status(status).json({ message, details: originalMessage });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
