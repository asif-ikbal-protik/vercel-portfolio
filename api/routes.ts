import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertPortfolioViewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(400).json({ success: false, error: "Invalid contact data" });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });

  // Track portfolio views
  app.post("/api/portfolio-view", async (req, res) => {
    try {
      const viewData = insertPortfolioViewSchema.parse({
        ip_address: req.ip,
        user_agent: req.get('User-Agent') || null,
      });
      const view = await storage.createPortfolioView(viewData);
      res.json({ success: true, view });
    } catch (error) {
      console.error("Error creating portfolio view:", error);
      res.status(400).json({ success: false, error: "Invalid view data" });
    }
  });

  // Get portfolio view statistics
  app.get("/api/portfolio-views", async (req, res) => {
    try {
      const views = await storage.getPortfolioViews();
      res.json({ success: true, views, total: views.length });
    } catch (error) {
      console.error("Error fetching portfolio views:", error);
      res.status(500).json({ success: false, error: "Failed to fetch views" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
