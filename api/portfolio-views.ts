import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle GET request to fetch all portfolio views
  if (req.method === 'GET') {
    try {
      const views = await storage.getPortfolioViews();
      const total = views.length;
      return res.status(200).json({ success: true, views, total });
    } catch (error) {
      console.error('Error fetching portfolio views:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch portfolio views' });
    }
  }

  // Handle other methods
  res.setHeader('Allow', ['GET']);
  return res.status(405).end('Method Not Allowed');
} 