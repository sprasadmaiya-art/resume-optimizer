import { Pool } from 'pg';

async function test() {
  try {
    const connectionString = "postgres://dummy:dummy@localhost:5432/dummy";
    const pool = new Pool({ connectionString });
    await pool.query('SELECT 1');
  } catch (e) {
    console.log("Expected Error:", e.message);
  }
}
test();
