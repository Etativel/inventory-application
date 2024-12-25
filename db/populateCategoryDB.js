require("dotenv").config({ path: "../.env" });
const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS category_table (
    id SERIAL PRIMARY KEY,
    category VARCHAR NOT NULL);

INSERT INTO category_table (
category)
VALUES ('Electronics'),
('Furniture'),
('Tools & Machinery'),
('Clothing & Apparel'),
('Tools & Machinery'),
('Groceries'),
('Automotive'),
('Sports & Outdoor');
`;

async function main() {
  console.log("seeding...");
  const client = await pool.connect();

  try {
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    client.release();
  }
}

main();