import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';
import { insertContactSchema } from '@shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const contactData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(contactData);
    return res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error('Error creating contact:', error);
    return res.status(400).json({ success: false, error: 'Invalid contact data' });
  }
}