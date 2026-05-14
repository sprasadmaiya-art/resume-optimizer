const { PrismaClient } = require("@prisma/client");

async function test() {
  try {
    const p = new PrismaClient({});
    await p.$connect();
    console.log("Connected successfully!");
  } catch(e) {
    console.log("Error:", e.message);
  }
}
test();
