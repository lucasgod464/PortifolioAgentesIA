import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { log } from "./logger";

export function setupProductionServer(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    log(`❌ Build directory not found: ${distPath}`);
    
    // Fallback simples
    app.use("*", (_req, res) => {
      if (_req.path.startsWith('/api')) {
        return; // Deixa a API funcionar
      }
      
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
            <p>Build do frontend não encontrado. Execute o build primeiro.</p>
            <p>API disponível em <code>/api/*</code></p>
          </body>
        </html>
      `);
    });
  } else {
    log(`✅ Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    
    // SPA fallback
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
}