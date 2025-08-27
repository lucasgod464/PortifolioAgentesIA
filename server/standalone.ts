import express, { type Request, Response, NextFunction } from "express";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createServer } from "http";

// Carrega as variáveis de ambiente
dotenv.config();

// Logger inline
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Configuração do banco
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não encontrada. Certifique-se de que o banco de dados PostgreSQL está provisionado.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

const db = drizzle(pool, { schema });

// Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de logging
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

// Rotas básicas da API
app.get("/api/user", (req, res) => {
  res.status(401).json({ error: "Não autenticado" });
});

app.get("/api/agents", async (req, res) => {
  try {
    const agents = await db.select().from(schema.agents);
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar agentes" });
  }
});

// Servir arquivos estáticos
const distPath = path.resolve(process.cwd(), "dist", "public");
if (fs.existsSync(distPath)) {
  log(`✅ Serving static files from ${distPath}`);
  app.use(express.static(distPath));
  
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
} else {
  log(`❌ Build directory not found: ${distPath}`);
  app.use("*", (_req, res) => {
    if (_req.path.startsWith('/api')) {
      res.status(404).json({ error: "Endpoint não encontrado" });
    } else {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>NexusAI - Plataforma de Agentes IA</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <h1>🤖 NexusAI - API Funcionando</h1>
            <p>A API está funcionando corretamente!</p>
            <p>API disponível em <code>/api/*</code></p>
          </body>
        </html>
      `);
    }
  });
}

// Inicializar servidor
const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen({
  port,
  host: "0.0.0.0",
}, () => {
  log(`✨ Servidor iniciado na porta ${port}`);
  log(`🔗 Database URL: ${process.env.DATABASE_URL?.split('@')[1] || 'Configurada via variáveis de ambiente'}`);
});