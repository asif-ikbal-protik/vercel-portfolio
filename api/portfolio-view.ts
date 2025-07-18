import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage.js';
import { insertPortfolioViewSchema } from '@shared/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const viewData = insertPortfolioViewSchema.parse({
      ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      user_agent: req.headers['user-agent'] || null,
    });
    const view = await storage.createPortfolioView(viewData);
    return res.status(200).json({ success: true, view });
  } catch (error) {
    console.error('Error creating portfolio view:', error);
    return res.status(400).json({ success: false, error: 'Invalid view data' });
  }
}