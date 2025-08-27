import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { log } from "./logger";

export function serveStaticProduction(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    log(`Build directory not found: ${distPath}. Creating fallback handler.`);
    
    // Fallback para quando não há build
    app.use("*", (_req, res) => {
      if (_req.path.startsWith('/api')) {
        return; // Deixa a API funcionar
      }
      
      res.set('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>NexusAI - Plataforma de Agentes IA</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              h1 { color: #5f3dc4; }
              .message { background: #f0f0f0; padding: 20px; border-radius: 5px; }
              .api-info { background: #d4edda; padding: 15px; border-radius: 5px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <h1>🤖 NexusAI - Plataforma de Agentes IA</h1>
            <div class="message">
              <p>A API está funcionando corretamente!</p>
              <p>Para acessar a interface completa, faça o build do frontend primeiro.</p>
            </div>
            <div class="api-info">
              <h3>API Endpoints Disponíveis:</h3>
              <ul>
                <li><strong>POST /api/auth/login</strong> - Fazer login</li>
                <li><strong>GET /api/user</strong> - Obter usuário atual</li>
                <li><strong>GET /api/agents</strong> - Listar agentes</li>
                <li><strong>POST /api/agents</strong> - Criar agente</li>
              </ul>
            </div>
          </body>
        </html>
      `);
    });
  } else {
    log(`✅ Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    
    // Fallback para SPA
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
}