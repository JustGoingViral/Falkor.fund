import { 
  users, type User, type InsertUser,
  properties, type Property, type InsertProperty,
  tokens, type Token, type InsertToken,
  transactions, type Transaction, type InsertTransaction,
  investment_stages, type InvestmentStage, type InsertInvestmentStage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTokenBalance(id: number, amount: number): Promise<User | undefined>;

  // Property methods
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Token methods
  getToken(): Promise<Token | undefined>;
  createToken(token: InsertToken): Promise<Token>;
  updateTokenPrice(price: number): Promise<Token | undefined>;
  
  // Transaction methods
  getTransactions(userId?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Investment Stage methods
  getInvestmentStages(propertyId?: number): Promise<InvestmentStage[]>;
  createInvestmentStage(stage: InsertInvestmentStage): Promise<InvestmentStage>;
  updateInvestmentStage(id: number, status: string): Promise<InvestmentStage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private tokens: Map<number, Token>;
  private transactions: Map<number, Transaction>;
  private investmentStages: Map<number, InvestmentStage>;
  
  currentUserId: number;
  currentPropertyId: number;
  currentTokenId: number;
  currentTransactionId: number;
  currentInvestmentStageId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.tokens = new Map();
    this.transactions = new Map();
    this.investmentStages = new Map();
    
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentTokenId = 1;
    this.currentTransactionId = 1;
    this.currentInvestmentStageId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create initial token (Emerald Coin)
    const token: InsertToken = {
      name: "Emerald Coin",
      symbol: "EMC",
      total_supply: 10000000,
      circulating_supply: 5000000,
      price: 2.35,
      logo_url: "https://via.placeholder.com/150/10B981/FFFFFF?text=EMC"
    };
    this.createToken(token);
    
    // Create sample properties
    const emeraldIsland: InsertProperty = {
      name: "Emerald Island",
      description: "A 1,053-acre sustainable development featuring 38,000 multifamily units, hotels, and innovative infrastructure including tunnels and canals.",
      location: "Florida, USA",
      size_acres: 1053,
      total_units: 38000,
      total_value: 2500000000,
      price_per_token: 250,
      tokens_available: 2000000,
      image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      status: "active"
    };
    const property1 = this.createProperty(emeraldIsland);
    
    const greenport: InsertProperty = {
      name: "GREENPORT Airport",
      description: "A 5,426-acre next-generation airport facility with a 10,000 ft runway and technology center, designed with sustainability at its core.",
      location: "Texas, USA",
      size_acres: 5426,
      total_units: 0,
      total_value: 1028000000,
      price_per_token: 102.80,
      tokens_available: 1000000,
      image_url: "https://images.unsplash.com/photo-1578986568870-144d3d3afff7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      status: "active"
    };
    const property2 = this.createProperty(greenport);
    
    // Create investment stages for Emerald Island
    const stages: InsertInvestmentStage[] = [
      {
        property_id: property1.id,
        name: "Land Acquisition",
        description: "Initial land purchase and permitting",
        target_amount: 500000000,
        current_amount: 500000000,
        status: "completed",
        start_date: new Date("2023-01-01"),
        end_date: new Date("2023-06-30")
      },
      {
        property_id: property1.id,
        name: "Infrastructure Development",
        description: "Roads, utilities, and basic infrastructure",
        target_amount: 750000000,
        current_amount: 350000000,
        status: "in_progress",
        start_date: new Date("2023-07-01"),
        end_date: new Date("2024-06-30")
      },
      {
        property_id: property1.id,
        name: "Phase 1 Construction",
        description: "First 10,000 residential units",
        target_amount: 1250000000,
        current_amount: 0,
        status: "pending",
        start_date: new Date("2024-07-01"),
        end_date: new Date("2026-12-31")
      },
      {
        property_id: property2.id,
        name: "Land Acquisition",
        description: "Purchase of airport land and initial permits",
        target_amount: 328000000,
        current_amount: 328000000,
        status: "completed",
        start_date: new Date("2023-03-01"),
        end_date: new Date("2023-09-30")
      },
      {
        property_id: property2.id,
        name: "Runway Construction",
        description: "10,000 ft runway and basic airport infrastructure",
        target_amount: 450000000,
        current_amount: 200000000,
        status: "in_progress",
        start_date: new Date("2023-10-01"),
        end_date: new Date("2024-10-31")
      }
    ];
    
    stages.forEach(stage => this.createInvestmentStage(stage));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, created_at: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserTokenBalance(id: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const currentBalance = parseFloat(user.token_balance?.toString() || "0");
    const updatedBalance = currentBalance + amount;
    
    const updatedUser = {
      ...user,
      token_balance: updatedBalance,
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  // Token methods
  async getToken(): Promise<Token | undefined> {
    return this.tokens.get(1); // We only have one token for this demo
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = this.currentTokenId++;
    const token: Token = { 
      ...insertToken, 
      id, 
      last_updated: new Date() 
    };
    this.tokens.set(id, token);
    return token;
  }
  
  async updateTokenPrice(price: number): Promise<Token | undefined> {
    const token = await this.getToken();
    if (!token) return undefined;
    
    const totalSupply = parseFloat(token.total_supply.toString());
    const marketCap = totalSupply * price;
    
    const updatedToken: Token = {
      ...token,
      price: price,
      last_updated: new Date(),
    };
    
    this.tokens.set(token.id, updatedToken);
    return updatedToken;
  }

  // Transaction methods
  async getTransactions(userId?: number): Promise<Transaction[]> {
    const transactions = Array.from(this.transactions.values());
    if (userId) {
      return transactions.filter(tx => tx.user_id === userId);
    }
    return transactions;
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id, 
      created_at: new Date() 
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Investment Stage methods
  async getInvestmentStages(propertyId?: number): Promise<InvestmentStage[]> {
    const stages = Array.from(this.investmentStages.values());
    if (propertyId) {
      return stages.filter(stage => stage.property_id === propertyId);
    }
    return stages;
  }

  async createInvestmentStage(insertStage: InsertInvestmentStage): Promise<InvestmentStage> {
    const id = this.currentInvestmentStageId++;
    const stage: InvestmentStage = { ...insertStage, id };
    this.investmentStages.set(id, stage);
    return stage;
  }
  
  async updateInvestmentStage(id: number, status: string): Promise<InvestmentStage | undefined> {
    const stage = this.investmentStages.get(id);
    if (!stage) return undefined;
    
    const updatedStage: InvestmentStage = {
      ...stage,
      status,
    };
    
    this.investmentStages.set(id, updatedStage);
    return updatedStage;
  }
}

import { DatabaseStorage } from "./DatabaseStorage";

// Use DatabaseStorage for persistent storage with PostgreSQL
export const storage = new DatabaseStorage();
