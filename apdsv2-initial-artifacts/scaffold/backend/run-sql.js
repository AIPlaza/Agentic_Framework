const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("No DATABASE_URL found");
    process.exit(1);
  }
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected to DB.");
    const sql = fs.readFileSync('init.sql', 'utf8');
    
    // Some lines might already exist, so we will try to execute it,
    // but Prisma's from-empty creates tables IF they don't exist? No, it uses CREATE TABLE without IF NOT EXISTS.
    // Let's just run it, but if it fails because a table exists, we ignore or log.
    try {
        await client.query(sql);
        console.log("Successfully executed init.sql");
    } catch (e) {
        console.error("Error executing SQL. It might mean tables already exist:", e.message);
    }
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.end();
  }
}

main();
