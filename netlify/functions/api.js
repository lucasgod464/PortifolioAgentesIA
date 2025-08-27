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

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;

  try {
    // Route: GET /user
    if (path === '/user' && method === 'GET') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Não autenticado' })
      };
    }

    // Route: GET /agents
    if (path === '/agents' && method === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(mockAgents)
      };
    }

    // Route: POST /auth/login
    if (path === '/auth/login' && method === 'POST') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Credenciais inválidas' })
      };
    }

    // Default 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'API endpoint not found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};