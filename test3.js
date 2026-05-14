const { PrismaClient } = require("@prisma/client");

try {
  const p = new PrismaClient();
  console.log("Success with no args");
} catch(e) {
  console.log("No args:", e.message);
}

try {
  const p2 = new PrismaClient({});
  console.log("Success with empty object");
} catch(e) {
  console.log("Empty object:", e.message);
}

try {
  const p3 = new PrismaClient({ datasourceUrl: "postgres://dummy" });
  console.log("Success with datasourceUrl");
} catch(e) {
  console.log("datasourceUrl:", e.message);
}
