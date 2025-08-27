const express = require('express');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database setup
let db;
if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  db = pool;
}

// Mock data for demo
const mockAgents = [
  {
    id: 1,
    title: "Assistente Vendas",
    description: "Especialista em vendas e conversão de leads em clientes. Ajuda a identificar oportunidades e fechar negócios com estratégias personalizadas.",
    icon: "📈"
  },
  {
    id: 2,
    title: "Suporte Técnico",
    description: "Resolutivo e eficiente em questões técnicas. Oferece soluções rápidas para problemas de software e hardware.",
    icon: "🔧"
  },
  {
    id: 3,
    title: "Marketing Digital",
    description: "Especialista em campanhas digitais e estratégias de crescimento online. Otimiza presença digital e engajamento.",
    icon: "🎯"
  }
];

// API Routes
app.get('/api/user', (req, res) => {
  res.status(401).json({ error: 'Não autenticado' });
});

app.get('/api/agents', async (req, res) => {
  try {
    if (db) {
      const result = await db.query('SELECT * FROM agents ORDER BY id');
      res.json(result.rows);
    } else {
      res.json(mockAgents);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.json(mockAgents);
  }
});

app.post('/api/auth/login', (req, res) => {
  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Serve static files
const distPath = path.join(__dirname, '..', 'dist', 'public');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>NexusAI</title></head>
        <body>
          <h1>🤖 NexusAI API</h1>
          <p>Build do frontend não encontrado. API disponível em /api/*</p>
        </body>
      </html>
    `);
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Servindo arquivos de: ${distPath}`);
  console.log(`🔗 Database: ${process.env.DATABASE_URL ? 'Conectado' : 'Mock data'}`);
});

module.exports = app;