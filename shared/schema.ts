import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  token_balance: decimal("token_balance", { precision: 18, scale: 6 }).default("0"),
  created_at: timestamp("created_at").defaultNow(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  size_acres: decimal("size_acres", { precision: 12, scale: 2 }).notNull(),
  total_units: integer("total_units"),
  total_value: decimal("total_value", { precision: 18, scale: 2 }).notNull(),
  price_per_token: decimal("price_per_token", { precision: 12, scale: 2 }).notNull(),
  tokens_available: integer("tokens_available").notNull(),
  image_url: text("image_url"),
  status: text("status").default("active"),
});

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  total_supply: decimal("total_supply", { precision: 18, scale: 2 }).notNull(),
  circulating_supply: decimal("circulating_supply", { precision: 18, scale: 2 }).notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  logo_url: text("logo_url"),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  property_id: integer("property_id").references(() => properties.id),
  type: text("type").notNull(),
  amount: decimal("amount", { precision: 18, scale: 6 }).notNull(),
  token_amount: decimal("token_amount", { precision: 18, scale: 6 }).notNull(),
  status: text("status").notNull(),
  hash: text("hash"),
  created_at: timestamp("created_at").defaultNow(),
});

export const investment_stages = pgTable("investment_stages", {
  id: serial("id").primaryKey(),
  property_id: integer("property_id").references(() => properties.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  target_amount: decimal("target_amount", { precision: 18, scale: 2 }).notNull(),
  current_amount: decimal("current_amount", { precision: 18, scale: 2 }).default("0"),
  status: text("status").default("pending"),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertTokenSchema = createInsertSchema(tokens).omit({
  id: true,
  last_updated: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  created_at: true,
});

export const insertInvestmentStageSchema = createInsertSchema(investment_stages).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type InsertToken = z.infer<typeof insertTokenSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type InsertInvestmentStage = z.infer<typeof insertInvestmentStageSchema>;

export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Token = typeof tokens.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type InvestmentStage = typeof investment_stages.$inferSelect;

// Investor types
export type InvestorType = "Institutional" | "Sovereign Fund" | "Retail";
