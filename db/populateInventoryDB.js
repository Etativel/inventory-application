require("dotenv").config({ path: "../.env" });
const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS inventory_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    price INTEGER NOT NULL DEFAULT 0,
    quantity INTEGER NOT NULL DEFAULT 0,
    category VARCHAR);
    
INSERT INTO inventory_table (name, description, price, quantity, category) VALUES
('Smartphone', '128GB, Dual-SIM', 699, 50, 'Electronics'),
('Laptop', 'Core i7, 16GB RAM', 1200, 20, 'Electronics'),
('Television', '4K Ultra HD, 55-inch', 800, 15, 'Electronics'),
('Office Chair', 'Ergonomic Design', 150, 20, 'Furniture'),
('Desk', 'Wooden, 120x60 cm', 250, 10, 'Furniture'),
('Sofa', '3-Seater, Grey Fabric', 400, 5, 'Furniture'),
('Power Drill', '500W Corded Drill', 75, 100, 'Tools & Machinery'),
('Welding Machine', 'Portable, 220V', 500, 8, 'Tools & Machinery'),
('Refrigerator', '300L, Energy Star', 500, 10, 'Home Appliances'),
('Microwave', '900W, Digital Controls', 120, 25, 'Home Appliances'),
('T-Shirt', 'Cotton, Size L', 20, 200, 'Clothing & Apparel'),
('Jacket', 'Waterproof, Size M', 50, 100, 'Clothing & Apparel'),
('Canned Beans', '400g Can', 2, 500, 'Groceries'),
('Packaged Chips', '200g Bag', 3, 300, 'Groceries'),
('Fresh Apples', 'Red Delicious', 3, 300, 'Perishables'),
('Milk', '1L Carton', 1, 200, 'Perishables'),
('Printer Ink', 'For HP Printers', 40, 30, 'Office Supplies'),
('Notebooks', 'Pack of 5', 15, 150, 'Office Supplies'),
('Car Battery', '12V, Maintenance-Free', 120, 15, 'Automotive'),
('Tires', 'All-Season, Set of 4', 400, 10, 'Automotive'),
('Soccer Ball', 'Standard Size 5', 25, 60, 'Sports & Outdoors'),
('Yoga Mat', 'Non-Slip, 6mm Thick', 30, 40, 'Sports & Outdoors');
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
