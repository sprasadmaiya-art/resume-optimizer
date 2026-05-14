const { Pool } = require("pg");

try {
  const pool = new Pool({ connectionString: process.env.NON_EXISTENT_URL });
  console.log("Pool instantiated successfully!");
} catch(e) {
  console.log("Error:", e.message);
}
