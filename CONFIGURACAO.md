# 🎨 Configuração Personalizada via .env

Este guia mostra como personalizar totalmente sua aplicação NexusAI editando apenas o arquivo `.env`.

## 📋 Como Usar

1. **Copie o arquivo exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edite o arquivo `.env`** com suas configurações

3. **Reinicie a aplicação** para aplicar as mudanças

## 🎨 Configurações Visuais

### Logo da Aplicação
```env
VITE_LOGO_URL=https://seusite.com/sua-logo.png
```

### Título da Aplicação
```env
VITE_APP_TITLE=Minha Empresa - Agentes IA
```

## 🎨 Personalização de Cores

Use o formato HSL (Matiz, Saturação%, Luminosidade%):

```env
# Cor primária (botões, links principais)
VITE_PRIMARY_COLOR=350 89% 60%

# Cor secundária (fundos, cards)
VITE_SECONDARY_COLOR=200 50% 90%

# Cor de destaque (hover, ações)
VITE_ACCENT_COLOR=280 100% 70%

# Cor de fundo da página
VITE_BACKGROUND_COLOR=0 0% 98%

# Cor do texto principal
VITE_FOREGROUND_COLOR=0 0% 10%
```

### 🎨 Exemplos de Combinações de Cores

**Tema Azul Corporativo:**
```env
VITE_PRIMARY_COLOR=220 90% 50%
VITE_SECONDARY_COLOR=220 30% 95%
VITE_ACCENT_COLOR=220 100% 40%
VITE_BACKGROUND_COLOR=0 0% 100%
VITE_FOREGROUND_COLOR=220 30% 15%
```

**Tema Verde Tecnológico:**
```env
VITE_PRIMARY_COLOR=140 70% 45%
VITE_SECONDARY_COLOR=140 30% 95%
VITE_ACCENT_COLOR=140 80% 35%
VITE_BACKGROUND_COLOR=0 0% 99%
VITE_FOREGROUND_COLOR=140 20% 10%
```

**Tema Roxo Moderno:**
```env
VITE_PRIMARY_COLOR=270 75% 60%
VITE_SECONDARY_COLOR=270 25% 95%
VITE_ACCENT_COLOR=270 85% 50%
VITE_BACKGROUND_COLOR=0 0% 98%
VITE_FOREGROUND_COLOR=270 15% 15%
```

## 🔗 Configurações de Integração

### Webhook para Chat
```env
VITE_WEBHOOK_URL=https://seuapi.com/webhook/chat
```

### WhatsApp
```env
VITE_WHATSAPP_NUMBER=5511999998888
```

## 🗄️ Banco de Dados

### Configuração Completa
```env
DATABASE_URL=postgresql://usuario:senha@servidor:5432/banco
```

### Configuração Separada (alternativa)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=minhasenha
DB_NAME=meubancoagentes
```

## 🔐 Segurança

```env
# Chave para criptografia de sessões (mude sempre!)
SESSION_SECRET=sua_chave_super_secreta_e_longa_aqui_123456789

# Ambiente
NODE_ENV=production
```

## 🚀 Deploy em Plataformas

### EasyPanel
Adicione as variáveis na seção "Environment Variables"

### Netlify
1. Vá em Site Settings → Environment Variables
2. Adicione cada variável individualmente

### Vercel
1. Vá em Settings → Environment Variables
2. Adicione cada variável com valor correspondente

## ⚡ Exemplo Completo de .env

```env
# Identidade Visual
VITE_LOGO_URL=https://minhaempresa.com/logo.png
VITE_APP_TITLE=MinhaEmpresa AI - Assistentes Virtuais

# Cores (Tema Azul Corporativo)
VITE_PRIMARY_COLOR=220 90% 50%
VITE_SECONDARY_COLOR=220 30% 95%
VITE_ACCENT_COLOR=220 100% 40%
VITE_BACKGROUND_COLOR=0 0% 100%
VITE_FOREGROUND_COLOR=220 30% 15%

# Integrações
VITE_WEBHOOK_URL=https://minhaapi.com/webhook/agentes
VITE_WHATSAPP_NUMBER=5511987654321

# Banco de Dados
DATABASE_URL=postgresql://user:pass@servidor.com:5432/agentes_db

# Segurança
SESSION_SECRET=minha_chave_secreta_super_longa_e_aleatoria_12345
NODE_ENV=production
```

## 💡 Dicas

- **Cores HSL:** Use ferramentas como [HSL Color Picker](https://hslpicker.com) para escolher cores
- **Logo:** Recomendado PNG ou SVG com fundo transparente
- **Webhook:** Teste sempre a URL antes de configurar
- **Segurança:** Nunca compartilhe sua SESSION_SECRET

---

**Pronto!** 🎉 Agora você pode personalizar completamente sua aplicação apenas editando o arquivo `.env`!