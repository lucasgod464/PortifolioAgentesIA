#!/usr/bin/env node

// Script de inicialização para produção
// Evita problemas com Vite em produção

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define NODE_ENV como production se não estiver definido
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Importa e executa o servidor
await import('./dist/index.js');