// Using ES Modules syntax
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API routes
app.get('/api/markets', (req, res) => {
  res.json({
    markets: [
      { id: 'emerald-usd', name: 'Emerald/USD', price: 128.45, change: 3.2 },
      { id: 'greenport-usd', name: 'Greenport/USD', price: 87.30, change: -1.5 },
      { id: 'falkor-usd', name: 'FALKOR/USD', price: 295.60, change: 12.8 }
    ]
  });
});

app.get('/api/portfolio', (req, res) => {
  res.json({
    balance: 25000.00,
    tokens: [
      { name: 'Emerald', amount: 120, value: 15414.00 },
      { name: 'Greenport', amount: 50, value: 4365.00 },
      { name: 'FALKOR', amount: 10, value: 2956.00 }
    ],
    totalValue: 22735.00
  });
});

// Catch-all route to serve the main index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Falkor Exchange running on port ${PORT}`);
});