const { PrismaClient } = require("@prisma/client");

try {
  const p3 = new PrismaClient({ accelerateUrl: "postgres://dummy:dummy@localhost:5432/dummy" });
  console.log("Success with accelerateUrl (postgres://)");
} catch(e) {
  console.log("accelerateUrl (postgres://):", e.message);
}
