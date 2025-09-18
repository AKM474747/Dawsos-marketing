import { type User, type InsertUser, type DemoRequest, type InsertDemoRequest, type ContactMessage, type InsertContactMessage, type Product, type InsertProduct, type Purchase, type InsertPurchase, type Download, type Subscription } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(demoRequest: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Retail product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchasesByUser(userId: string): Promise<Purchase[]>;
  getUserDownloads(userId: string): Promise<Download[]>;
  getUserSubscriptions(userId: string): Promise<Subscription[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private demoRequests: Map<string, DemoRequest>;
  private contactMessages: Map<string, ContactMessage>;
  private products: Map<string, Product>;
  private purchases: Map<string, Purchase>;
  private downloads: Map<string, Download>;
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
    this.contactMessages = new Map();
    this.products = new Map();
    this.purchases = new Map();
    this.downloads = new Map();
    this.subscriptions = new Map();
    this.initializeProducts();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoRequest(insertDemoRequest: InsertDemoRequest): Promise<DemoRequest> {
    const id = randomUUID();
    const demoRequest: DemoRequest = {
      ...insertDemoRequest,
      id,
      createdAt: new Date(),
      sector: insertDemoRequest.sector || null,
      urgency: insertDemoRequest.urgency || null,
      sloRequirements: insertDemoRequest.sloRequirements || null,
      useCase: insertDemoRequest.useCase || null,
      newsletter: insertDemoRequest.newsletter || null,
    };
    this.demoRequests.set(id, demoRequest);
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      message: insertMessage.message || null,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  // Retail product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      description: insertProduct.description || null,
      isActive: insertProduct.isActive ?? true,
      features: JSON.stringify(insertProduct.features),
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const id = randomUUID();
    const purchase: Purchase = {
      ...insertPurchase,
      id,
      status: insertPurchase.status || 'pending',
      createdAt: new Date(),
      completedAt: null,
      stripePaymentIntentId: null,
    };
    this.purchases.set(id, purchase);
    return purchase;
  }

  async getPurchasesByUser(userId: string): Promise<Purchase[]> {
    return Array.from(this.purchases.values()).filter(purchase => purchase.userId === userId);
  }

  async getUserDownloads(userId: string): Promise<Download[]> {
    return Array.from(this.downloads.values()).filter(download => download.userId === userId);
  }

  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(sub => sub.userId === userId);
  }

  private initializeProducts() {
    // DawsOS Kit Products based on the content
    const products: (Omit<Product, 'id' | 'createdAt'> & { features: string[] })[] = [
      {
        name: "Build like DawsOS - Starter Kit",
        slug: "dawsos-starter",
        description: "Essential prompts, templates, and quickstart guide to get you building with the DawsOS method in 72 hours.",
        price: "49.00",
        type: "kit",
        tier: "starter",
        features: [
          "System prompts & persona scripts for operating-constitution work", 
          "Core templates: event taxonomy, schema change playbook",
          "72-hour Quickstart: from blank page to architecture draft",
          "1 n8n automation: sale→fulfillment workflow",
          "Downloadable ZIP with all templates"
        ],
        isActive: true,
      },
      {
        name: "Build like DawsOS - Pro Kit",
        slug: "dawsos-pro",
        description: "Complete toolkit with videos, community access, and all automation workflows to scale your agent-first business.",
        price: "199.00",
        type: "kit",
        tier: "pro",
        features: [
          "Everything in Starter Kit",
          "Video walkthroughs and tutorials",
          "6-month updates to all content",
          "Discord community access", 
          "All 5 n8n agents: sale→fulfillment, KPI watchdog, content factory, affiliate engine, release pipeline",
          "\"How to sell\" scripts and pricing matrices",
          "Agent workflow scaffolds and SLO badge patterns"
        ],
        isActive: true,
      },
      {
        name: "Build like DawsOS - Bundle + Workbench",
        slug: "dawsos-bundle",
        description: "Pro Kit plus 3 months of Agent Workbench subscription for exporting and running your flows.",
        price: "299.00",
        type: "kit",
        tier: "bundle",
        features: [
          "Everything in Pro Kit",
          "3 months Agent Workbench subscription",
          "Export templates to runnable n8n flows",
          "Generate GPT profiles and starter repos", 
          "Growing template library with one-click exporters",
          "Build, export, and run your agent workflows"
        ],
        isActive: true,
      }
    ];

    products.forEach(productData => {
      const id = randomUUID();
      const product: Product = {
        ...productData,
        id,
        description: productData.description || null,
        isActive: productData.isActive ?? true,
        features: JSON.stringify(productData.features),
        createdAt: new Date(),
      };
      this.products.set(id, product);
    });
  }
}

export const storage = new MemStorage();
