import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle GET request to fetch all contacts
  if (req.method === 'GET') {
    try {
      const contacts = await storage.getContacts();
      return res.status(200).json({ success: true, contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
  }

  // Handle other methods
  res.setHeader('Allow', ['GET']);
  return res.status(405).end('Method Not Allowed');
} 