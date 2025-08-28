import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Hook para gerenciar o sessionID
export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>('');
  
  useEffect(() => {
    // Verifica se já existe um sessionId no localStorage
    let id = localStorage.getItem('nexusai_session_id');
    
    // Se não existir, cria um novo e salva no localStorage
    if (!id) {
      id = uuidv4();
      localStorage.setItem('nexusai_session_id', id);
    }
    
    console.log('Session ID:', id);
    setSessionId(id);
  }, []);
  
  return sessionId;
};

// Hook para obter o logotipo da variável de ambiente
export const useLogoFromEnv = () => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  
  useEffect(() => {
    const envLogo = import.meta.env.VITE_LOGO_URL;
    const defaultLogo = 'https://sistemas-droppy.zbkdqg.easypanel.host/$/FD9Y4';
    
    const logoSrc = envLogo || defaultLogo;
    console.log('VITE_LOGO_URL ou URL padrão:', logoSrc);
    setLogoUrl(logoSrc);
  }, []);
  
  return logoUrl;
};

// Hook para obter título da aplicação
export const useAppTitle = () => {
  const [title, setTitle] = useState<string>('');
  
  useEffect(() => {
    const envTitle = import.meta.env.VITE_APP_TITLE;
    const defaultTitle = 'ArsenalAI - Agentes de Inteligência Artificial';
    
    const finalTitle = envTitle || defaultTitle;
    setTitle(finalTitle);
    
    // Atualiza o título da página
    document.title = finalTitle;
  }, []);
  
  return title;
};

// Hook para configurar cores do sistema via CSS
export const useThemeColors = () => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Cores configuráveis via .env
    const primaryColor = import.meta.env.VITE_PRIMARY_COLOR || '222 47% 11%';
    const secondaryColor = import.meta.env.VITE_SECONDARY_COLOR || '60 4.8% 95.9%';
    const accentColor = import.meta.env.VITE_ACCENT_COLOR || '24 9.8% 10%';
    const backgroundColor = import.meta.env.VITE_BACKGROUND_COLOR || '0 0% 100%';
    const foregroundColor = import.meta.env.VITE_FOREGROUND_COLOR || '20 14.3% 4.1%';
    
    // Aplica as cores personalizadas
    root.style.setProperty('--primary', primaryColor);
    root.style.setProperty('--secondary', secondaryColor);
    root.style.setProperty('--accent', accentColor);
    root.style.setProperty('--background', backgroundColor);
    root.style.setProperty('--foreground', foregroundColor);
    
    console.log('Cores personalizadas aplicadas:', {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
      background: backgroundColor,
      foreground: foregroundColor
    });
  }, []);
};

// Hook para obter a URL do webhook da variável de ambiente
export const useWebhookUrl = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  
  useEffect(() => {
    const envWebhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    const defaultWebhookUrl = 'https://n8n.yuccie.pro/webhook/portfolio_virtual';
    
    const finalWebhookUrl = envWebhookUrl || defaultWebhookUrl;
    console.log('VITE_WEBHOOK_URL ou URL padrão:', finalWebhookUrl);
    setWebhookUrl(finalWebhookUrl);
  }, []);
  
  return webhookUrl;
};

// Hook para obter o link do WhatsApp da variável de ambiente
export const useWhatsAppLink = () => {
  const [whatsappLink, setWhatsAppLink] = useState<string>('');
  
  useEffect(() => {
    const envWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const defaultWhatsAppNumber = '5544999998888';
    
    const whatsAppNumber = envWhatsAppNumber || defaultWhatsAppNumber;
    const finalWhatsAppLink = `https://wa.me/${whatsAppNumber}`;
    
    console.log('VITE_WHATSAPP_NUMBER ou número padrão:', whatsAppNumber);
    setWhatsAppLink(finalWhatsAppLink);
  }, []);
  
  return whatsappLink;
};
