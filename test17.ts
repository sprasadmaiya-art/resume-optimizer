import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: "dummy" });
const adapter = new PrismaPg(pool);

// Attempt 1: datasourceUrl flat property
const prisma1 = new PrismaClient({ adapter, datasourceUrl: "dummy" });

// Attempt 2: Override datasources with ts-ignore
const prisma2 = new PrismaClient({ 
  adapter, 
  // @ts-ignore
  datasources: { db: { url: "dummy" } }
});
