import { users, contacts, portfolio_views, type User, type InsertUser, type Contact, type InsertContact, type PortfolioView, type InsertPortfolioView } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createPortfolioView(view: InsertPortfolioView): Promise<PortfolioView>;
  getPortfolioViews(): Promise<PortfolioView[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.created_at);
  }

  async createPortfolioView(insertView: InsertPortfolioView): Promise<PortfolioView> {
    const [view] = await db
      .insert(portfolio_views)
      .values(insertView)
      .returning();
    return view;
  }

  async getPortfolioViews(): Promise<PortfolioView[]> {
    return await db.select().from(portfolio_views).orderBy(portfolio_views.created_at);
  }
}

export const storage = new DatabaseStorage();
