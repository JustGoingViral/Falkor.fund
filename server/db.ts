import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
const { Pool } = pg;
import * as schema from '../shared/schema';
import { log } from './vite';

// Initialize PostgreSQL connection pool using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Initialize Drizzle with our schema
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });

// Function to run database migrations
export async function runMigrations() {
  log('Running database migrations...', 'db');
  try {
    // Create tables based on our schema
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT,
        token_balance NUMERIC DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT NOT NULL,
        size_acres NUMERIC NOT NULL,
        total_units INTEGER,
        total_value NUMERIC NOT NULL,
        price_per_token NUMERIC NOT NULL,
        tokens_available INTEGER NOT NULL,
        image_url TEXT,
        status TEXT DEFAULT 'active'
      );
    `);
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        total_supply NUMERIC NOT NULL,
        circulating_supply NUMERIC NOT NULL,
        price NUMERIC NOT NULL,
        logo_url TEXT,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        property_id INTEGER REFERENCES properties(id),
        type TEXT NOT NULL,
        amount NUMERIC NOT NULL,
        token_amount NUMERIC NOT NULL,
        status TEXT NOT NULL,
        hash TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS investment_stages (
        id SERIAL PRIMARY KEY,
        property_id INTEGER REFERENCES properties(id),
        name TEXT NOT NULL,
        description TEXT,
        target_amount NUMERIC NOT NULL,
        current_amount NUMERIC DEFAULT 0,
        status TEXT DEFAULT 'pending',
        start_date TIMESTAMP,
        end_date TIMESTAMP
      );
    `);

    // Initialize with seed data if tables are empty
    await seedInitialData();
    
    log('Database migrations completed successfully', 'db');
  } catch (error) {
    log(`Migration error: ${error}`, 'db');
    throw error;
  }
}

// Function to seed initial data
async function seedInitialData() {
  // Check if we already have data
  const tokenCount = await db.select().from(schema.tokens).then(res => res.length);
  
  if (tokenCount === 0) {
    log('Seeding initial data...', 'db');
    
    // Insert token
    const [token] = await db
      .insert(schema.tokens)
      .values({
        name: 'Emerald Coin',
        symbol: 'EMC',
        total_supply: 10000000,
        circulating_supply: 5000000,
        price: 2.35,
        logo_url: 'https://via.placeholder.com/150/10B981/FFFFFF?text=EMC'
      })
      .returning();
    
    // Insert properties
    const [emeraldIsland] = await db
      .insert(schema.properties)
      .values({
        name: 'Emerald Island',
        description: 'A 1,053-acre sustainable development featuring 38,000 multifamily units, hotels, and innovative infrastructure including tunnels and canals.',
        location: 'Florida, USA',
        size_acres: 1053,
        total_units: 38000,
        total_value: 2500000000,
        price_per_token: 250,
        tokens_available: 2000000,
        image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        status: 'active'
      })
      .returning();
      
    const [greenportAirport] = await db
      .insert(schema.properties)
      .values({
        name: 'GREENPORT Airport',
        description: 'A 5,426-acre next-generation airport facility with a 10,000 ft runway and technology center, designed with sustainability at its core.',
        location: 'Texas, USA',
        size_acres: 5426,
        total_units: 0,
        total_value: 1028000000,
        price_per_token: 102.80,
        tokens_available: 1000000,
        image_url: 'https://images.unsplash.com/photo-1578986568870-144d3d3afff7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        status: 'active'
      })
      .returning();
      
    // Create investment stages for Emerald Island
    await db.insert(schema.investment_stages).values([
      {
        property_id: emeraldIsland.id,
        name: 'Land Acquisition',
        description: 'Initial land purchase and permitting',
        target_amount: 500000000,
        current_amount: 500000000,
        status: 'completed',
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-06-30')
      },
      {
        property_id: emeraldIsland.id,
        name: 'Infrastructure Development',
        description: 'Roads, utilities, and basic infrastructure',
        target_amount: 750000000,
        current_amount: 350000000,
        status: 'in_progress',
        start_date: new Date('2023-07-01'),
        end_date: new Date('2024-06-30')
      },
      {
        property_id: emeraldIsland.id,
        name: 'Phase 1 Construction',
        description: 'First 10,000 residential units',
        target_amount: 1250000000,
        current_amount: 0,
        status: 'pending',
        start_date: new Date('2024-07-01'),
        end_date: new Date('2026-12-31')
      }
    ]);
    
    // Create investment stages for GREENPORT Airport
    await db.insert(schema.investment_stages).values([
      {
        property_id: greenportAirport.id,
        name: 'Land Acquisition',
        description: 'Purchase of airport land and initial permits',
        target_amount: 328000000,
        current_amount: 328000000,
        status: 'completed',
        start_date: new Date('2023-03-01'),
        end_date: new Date('2023-09-30')
      },
      {
        property_id: greenportAirport.id,
        name: 'Runway Construction',
        description: '10,000 ft runway and basic airport infrastructure',
        target_amount: 450000000,
        current_amount: 200000000,
        status: 'in_progress',
        start_date: new Date('2023-10-01'),
        end_date: new Date('2024-10-31')
      },
      {
        property_id: greenportAirport.id,
        name: 'Terminal Development',
        description: 'Passenger and cargo terminals',
        target_amount: 250000000,
        current_amount: 0,
        status: 'pending',
        start_date: new Date('2024-11-01'),
        end_date: new Date('2025-12-31')
      }
    ]);
    
    // Create a demo user
    await db.insert(schema.users).values({
      username: 'demo',
      password: 'password123', // In a real app, this would be hashed
      email: 'demo@example.com',
      token_balance: 1000
    });
    
    log('Initial data seeded successfully', 'db');
  }
}