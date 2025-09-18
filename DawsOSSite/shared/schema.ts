import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const demoRequests = pgTable("demo_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  sector: text("sector"),
  urgency: text("urgency"),
  sloRequirements: text("slo_requirements"),
  useCase: text("use_case"),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  role: text("role").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  sector: z.string().optional(),
  urgency: z.string().optional(),
  sloRequirements: z.string().optional(),
  useCase: z.string().optional(),
  newsletter: z.boolean().default(false),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Valid email is required"),
  role: z.string().min(1, "Role is required"),
  message: z.string().optional(),
});

// Retail product tables
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull(), // 'kit' or 'subscription'
  tier: text("tier").notNull(), // 'starter', 'pro', 'bundle'
  features: jsonb("features").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const purchases = pgTable("purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'completed', 'failed'
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id").notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  status: text("status").notNull(), // 'active', 'cancelled', 'past_due'
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const downloads = pgTable("downloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: varchar("product_id").notNull(),
  purchaseId: varchar("purchase_id").notNull(),
  fileName: text("file_name").notNull(),
  downloadUrl: text("download_url").notNull(),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  lastDownloadedAt: timestamp("last_downloaded_at"),
});

// Insert schemas for retail products
export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Product slug is required"),
  price: z.string().min(1, "Price is required"),
  type: z.enum(["kit", "subscription"]),
  tier: z.enum(["starter", "pro", "bundle"]),
  features: z.array(z.string()),
});

export const insertPurchaseSchema = createInsertSchema(purchases).omit({
  id: true,
  createdAt: true,
  completedAt: true,
}).extend({
  userId: z.string(),
  productId: z.string(),
  amount: z.string(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  userId: z.string(),
  productId: z.string(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Download = typeof downloads.$inferSelect;
