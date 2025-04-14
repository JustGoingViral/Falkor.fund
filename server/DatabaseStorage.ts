import { 
  users, type User, type InsertUser,
  properties, type Property, type InsertProperty,
  tokens as tokenTable, type Token, type InsertToken,
  transactions, type Transaction, type InsertTransaction,
  investment_stages, type InvestmentStage, type InsertInvestmentStage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
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
  
  async updateUserTokenBalance(id: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const currentBalance = parseFloat(user.token_balance?.toString() || "0");
    const updatedBalance = currentBalance + amount;
    
    const [updatedUser] = await db
      .update(users)
      .set({ token_balance: updatedBalance.toString() })
      .where(eq(users.id, id))
      .returning();
      
    return updatedUser;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return db.select().from(properties);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  // Token methods
  async getToken(): Promise<Token | undefined> {
    const tokensList = await db.select().from(tokenTable);
    return tokensList[0] || undefined; // Return the first token (we only have one for this demo)
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const [token] = await db
      .insert(tokenTable)
      .values(insertToken)
      .returning();
    return token;
  }
  
  async updateTokenPrice(price: number): Promise<Token | undefined> {
    const allTokens = await db.select().from(tokenTable);
    if (allTokens.length === 0) return undefined;
    
    const tokenId = allTokens[0].id;
    
    const [updatedToken] = await db
      .update(tokenTable)
      .set({ price: price.toString() })
      .where(eq(tokenTable.id, tokenId))
      .returning();
      
    return updatedToken;
  }

  // Transaction methods
  async getTransactions(userId?: number): Promise<Transaction[]> {
    if (userId) {
      return db.select().from(transactions).where(eq(transactions.user_id, userId));
    }
    return db.select().from(transactions);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(insertTransaction)
      .returning();
    return transaction;
  }

  // Investment Stage methods
  async getInvestmentStages(propertyId?: number): Promise<InvestmentStage[]> {
    if (propertyId) {
      return db.select().from(investment_stages).where(eq(investment_stages.property_id, propertyId));
    }
    return db.select().from(investment_stages);
  }

  async createInvestmentStage(insertStage: InsertInvestmentStage): Promise<InvestmentStage> {
    const [stage] = await db
      .insert(investment_stages)
      .values(insertStage)
      .returning();
    return stage;
  }
  
  async updateInvestmentStage(id: number, status: string): Promise<InvestmentStage | undefined> {
    const [updatedStage] = await db
      .update(investment_stages)
      .set({ status })
      .where(eq(investment_stages.id, id))
      .returning();
      
    return updatedStage || undefined;
  }
}