// Mock API for local development
export async function mockApiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (url === '/api/contact') {
    // Simulate successful contact submission
    return new Response(JSON.stringify({ 
      success: true, 
      contact: { 
        id: Date.now(),
        name: (data as any)?.name || '',
        email: (data as any)?.email || '',
        subject: (data as any)?.subject || '',
        message: (data as any)?.message || '',
        created_at: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (url === '/api/portfolio-view') {
    // Simulate successful view tracking
    return new Response(JSON.stringify({ 
      success: true, 
      view: { 
        id: Date.now(),
        ip_address: '127.0.0.1',
        user_agent: 'Mozilla/5.0 (Mock Browser)',
        created_at: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Default error response
  return new Response(JSON.stringify({ 
    success: false, 
    error: 'Endpoint not found' 
  }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
} 