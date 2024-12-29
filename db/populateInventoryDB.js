require("dotenv").config({ path: "../.env" });
const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS inventory_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    price INTEGER NOT NULL DEFAULT 0,
    quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER NOT NULL);
    
INSERT INTO inventory_table (name, description, price, quantity, category_id) VALUES
('Smartphone', '128GB, Dual-SIM', 699, 50, 1),
('Laptop', 'Core i7, 16GB RAM', 1200, 20, 1),
('Television', '4K Ultra HD, 55-inch', 800, 15, 1),
('Office Chair', 'Ergonomic Design', 150, 20, 2),
('Desk', 'Wooden, 120x60 cm', 250, 10, 2),
('Sofa', '3-Seater, Grey Fabric', 400, 5, 2),
('Power Drill', '500W Corded Drill', 75, 100, 3),
('Welding Machine', 'Portable, 220V', 500, 8, 3),
('Refrigerator', '300L, Energy Star', 500, 10, 5),
('Microwave', '900W, Digital Controls', 120, 25, 5),
('T-Shirt', 'Cotton, Size L', 20, 200, 4),
('Jacket', 'Waterproof, Size M', 50, 100, 4),
('Canned Beans', '400g Can', 2, 500, 5),
('Packaged Chips', '200g Bag', 3, 300, 5),
('Fresh Apples', 'Red Delicious', 3, 300, 6),
('Milk', '1L Carton', 1, 200, 6),
('Printer Ink', 'For HP Printers', 40, 30, 7),
('Notebooks', 'Pack of 5', 15, 150, 7),
('Car Battery', '12V, Maintenance-Free', 120, 15, 8),
('Tires', 'All-Season, Set of 4', 400, 10, 8),
('Soccer Ball', 'Standard Size 5', 25, 60, 9),
('Yoga Mat', 'Non-Slip, 6mm Thick', 30, 40, 9);
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
