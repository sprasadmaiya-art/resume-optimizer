const { PrismaClient } = require("@prisma/client");

try {
  const p3 = new PrismaClient({ accelerateUrl: process.env.DATABASE_URL || "prisma://dummy" });
  console.log("Success with accelerateUrl");
} catch(e) {
  console.log("accelerateUrl:", e.message);
}
