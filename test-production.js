#!/usr/bin/env node

// Script para testar build de produção em porta diferente
import { execSync } from 'child_process';

// Define NODE_ENV como production
process.env.NODE_ENV = 'production';
process.env.PORT = '3000'; // Usa porta diferente para teste

console.log('🚀 Testando build de produção na porta 3000...');
console.log('📝 NODE_ENV:', process.env.NODE_ENV);

try {
  // Importa e executa o servidor
  await import('./dist/index.js');
} catch (error) {
  console.error('❌ Erro ao executar build de produção:', error.message);
  process.exit(1);
}