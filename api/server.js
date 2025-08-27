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

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;

  // Route: GET /api/user
  if (url === '/api/user' && method === 'GET') {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  // Route: GET /api/agents
  if (url === '/api/agents' && method === 'GET') {
    return res.status(200).json(mockAgents);
  }

  // Route: POST /api/auth/login
  if (url === '/api/auth/login' && method === 'POST') {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Default 404
  res.status(404).json({ error: 'API endpoint not found' });
}