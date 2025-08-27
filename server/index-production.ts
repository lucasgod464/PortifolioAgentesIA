import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
// Logger inline para evitar dependências
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit", 
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
import { setupProductionServer } from "./production";
import { serveStaticResiliente } from "./staticWrapper";
import dotenv from "dotenv";
import { initializeDatabase } from "./initializeDatabase";

// Carrega as variáveis de ambiente do arquivo .env e .env.local
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

(async () => {
  try {
    // Inicializa o banco de dados antes de configurar as rotas
    await initializeDatabase();
    console.log('Banco de dados verificado e inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1); // Encerra o processo se o banco de dados não puder ser inicializado
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Configuração de produção SEM Vite
  try {
    // Tenta primeiro usar a função resiliente
    try {
      serveStaticResiliente(app);
      log('✅ Arquivos estáticos servidos com função resiliente.');
    } catch (error) {
      // Se falhar, usa a função de produção
      log(`⚠️ Erro ao usar função resiliente: ${error}`);
      log('⚠️ Tentando função de produção...');
      setupProductionServer(app);
      log('✅ Servidor de produção configurado.');
    }
  } catch (error) {
    log(`❌ ERRO AO SERVIR ARQUIVOS ESTÁTICOS: ${error}`);
    
    // Cria um handler de fallback para pelo menos servir a API
    app.use('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        next(); // Deixa a API funcionar
      } else {
        // Retorna uma página simples
        res.set('Content-Type', 'text/html');
        res.send(`
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
              <div>
                <strong>Erro:</strong> ${error instanceof Error ? error.message : String(error)}
              </div>
            </body>
          </html>
        `);
      }
    });
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`✨ Servidor iniciado na porta ${port}`);
    log(`🔗 Database URL: ${process.env.DATABASE_URL?.split('@')[1] || 'Configurada via variáveis de ambiente'}`);
  });
})();