const { PrismaClient } = require("@prisma/client");

async function test() {
  try {
    const p = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres" });
    await p.$connect();
    console.log("Connected successfully!");
  } catch(e) {
    console.log("Error:", e.message);
  }
}
test();
