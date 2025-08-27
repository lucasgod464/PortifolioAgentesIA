const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Database setup - only if DATABASE_URL is provided
let db;
if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  db = pool;
}

// Mock data for when database is not available
const mockAgents = [
  {
    id: 1,
    name: "Assistente Vendas",
    description: "Especialista em vendas e conversão",
    webhook_url: null,
    whatsapp_number: null
  },
  {
    id: 2,
    name: "Suporte Técnico",
    description: "Ajuda com problemas técnicos",
    webhook_url: null,
    whatsapp_number: null
  }
];

// Routes
app.get('/api/user', (req, res) => {
  res.status(401).json({ error: 'Não autenticado' });
});

app.get('/api/agents', async (req, res) => {
  try {
    if (db) {
      const result = await db.query('SELECT * FROM agents ORDER BY id');
      res.json(result.rows);
    } else {
      // Return mock data if no database
      res.json(mockAgents);
    }
  } catch (error) {
    console.error('Database error:', error);
    // Fallback to mock data
    res.json(mockAgents);
  }
});

app.post('/api/auth/login', (req, res) => {
  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Handle all API routes
module.exports = app;