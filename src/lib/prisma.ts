import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Helper to URL-encode passwords that contain special characters (like @, #)
function fixConnectionString(url: string | undefined) {
  if (!url || !url.startsWith("postgre")) return url || "postgres://dummy:dummy@localhost:5432/dummy";
  try {
    const protocolSplit = url.indexOf("://");
    if (protocolSplit === -1) return url;
    
    const protocol = url.substring(0, protocolSplit + 3);
    const rest = url.substring(protocolSplit + 3);
    
    const lastAtIdx = rest.lastIndexOf("@");
    if (lastAtIdx === -1) return url;
    
    const credentials = rest.substring(0, lastAtIdx);
    const hostPart = rest.substring(lastAtIdx + 1);
    
    const colonIdx = credentials.indexOf(":");
    if (colonIdx === -1) return url;
    
    const user = credentials.substring(0, colonIdx);
    const password = credentials.substring(colonIdx + 1);
    
    let decodedPassword = password;
    try { decodedPassword = decodeURIComponent(password); } catch(e) {}
    
    const encodedPassword = encodeURIComponent(decodedPassword);
    return `${protocol}${user}:${encodedPassword}@${hostPart}`;
  } catch (e) {
    return url;
  }
}

const prismaClientSingleton = () => {
  const connectionString = fixConnectionString(process.env.DATABASE_URL);
  
  // CRITICAL: Prisma's Rust engine still reads process.env.DATABASE_URL directly for validation
  // even when using an adapter. We MUST override it so the Rust engine doesn't crash on unencoded '@' symbols.
  process.env.DATABASE_URL = connectionString;
  
  // Next.js Edge / Vercel requires explicit SSL configuration for Supabase and other cloud providers
  const pool = new Pool({ 
    connectionString,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
  });
  const adapter = new PrismaPg(pool);
  
  // Override the datasource URL dynamically to prevent Rust engine crash on special chars
  return new PrismaClient({ 
    adapter,
    // @ts-ignore
    datasources: {
      db: {
        url: connectionString
      }
    }
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;