import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get properties
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  
  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });
  
  // Get token (Emerald Coin)
  app.get("/api/token", async (req, res) => {
    try {
      const token = await storage.getToken();
      
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }
      
      res.json(token);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch token data" });
    }
  });
  
  // Update token price
  app.patch("/api/token/price", async (req, res) => {
    try {
      const schema = z.object({
        price: z.number().positive(),
      });
      
      const data = schema.parse(req.body);
      const updatedToken = await storage.updateTokenPrice(data.price);
      
      if (!updatedToken) {
        return res.status(404).json({ message: "Token not found" });
      }
      
      res.json(updatedToken);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update token price" });
    }
  });
  
  // Get transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const transactions = await storage.getTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  
  // Create transaction
  app.post("/api/transactions", async (req, res) => {
    try {
      const data = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(data);
      
      // If user_id is provided, update user's token balance
      if (data.user_id) {
        const amount = parseFloat(data.amount.toString());
        await storage.updateUserTokenBalance(data.user_id, amount);
      }
      
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });
  
  // Get investment stages
  app.get("/api/investment-stages", async (req, res) => {
    try {
      const propertyId = req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined;
      const stages = await storage.getInvestmentStages(propertyId);
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch investment stages" });
    }
  });
  
  // Update investment stage status
  app.patch("/api/investment-stages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const schema = z.object({
        status: z.string(),
      });
      
      const data = schema.parse(req.body);
      const updatedStage = await storage.updateInvestmentStage(id, data.status);
      
      if (!updatedStage) {
        return res.status(404).json({ message: "Investment stage not found" });
      }
      
      res.json(updatedStage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update investment stage" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
