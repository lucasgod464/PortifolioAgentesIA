import express from 'express';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../shared/schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database setup
let db;
if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1, // Vercel limitation
  });
  db = drizzle(pool, { schema });
}

// API routes
app.get('/api/user', (req, res) => {
  res.status(401).json({ error: 'Não autenticado' });
});

app.get('/api/agents', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not configured' });
    }
    const agents = await db.select().from(schema.agents);
    res.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Erro ao buscar agentes' });
  }
});

// Static files fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

export default app;