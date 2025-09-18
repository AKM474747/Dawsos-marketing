import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema, insertContactMessageSchema, insertProductSchema, insertPurchaseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request endpoint
  app.post("/api/demo-requests", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validatedData);
      res.json({ success: true, id: demoRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create demo request" 
        });
      }
    }
  });

  // Get demo requests (for admin purposes)
  app.get("/api/demo-requests", async (req, res) => {
    try {
      const requests = await storage.getDemoRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve demo requests" 
      });
    }
  });

  // Contact message endpoint
  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create contact message" 
        });
      }
    }
  });

  // Get contact messages (for admin purposes)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contact messages" 
      });
    }
  });

  // Retail product endpoints
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      // Parse features back to array for frontend consumption
      const parsedProducts = products.map(product => ({
        ...product,
        features: JSON.parse(product.features as string)
      }));
      res.json(parsedProducts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve products" 
      });
    }
  });

  // Get product by slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      // Parse features back to array
      const parsedProduct = {
        ...product,
        features: JSON.parse(product.features as string)
      };
      res.json(parsedProduct);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve product" 
      });
    }
  });

  // Create purchase (mock endpoint for now without Stripe)
  app.post("/api/purchases", async (req, res) => {
    try {
      const validatedData = insertPurchaseSchema.parse(req.body);
      const purchase = await storage.createPurchase(validatedData);
      res.json({ 
        success: true, 
        id: purchase.id,
        message: "Purchase created successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create purchase" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
