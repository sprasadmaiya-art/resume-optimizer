const { PrismaClient } = require("@prisma/client");

async function test() {
  try {
    const p = new PrismaClient({ 
      url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres"
    });
    console.log("Instantiated successfully!");
  } catch(e) {
    console.log("Error:", e.message);
  }
}
test();
