const pool = require("./pool");

async function findProduct(params) {
  let query = `
    SELECT 
      inventory_table.id, 
      inventory_table.name as name, 
      inventory_table.description as description, 
      inventory_table.price as price, 
      inventory_table.quantity as quantity, 
      category_table.category as category 
    FROM 
      inventory_table 
    LEFT JOIN 
      category_table 
    ON 
      inventory_table.category_id = category_table.id
    WHERE 1=1`;
  const values = [];
  let index = 1;
  let conditionJoin = params.filter === "exact-match" ? " AND " : " OR ";

  let conditions = [];

  if (params.name && params.name.trim() !== "") {
    conditions.push(`name ILIKE $${index}`);
    values.push(`%${params.name}%`);
    index++;
  }
  if (params.description && params.description.trim() !== "") {
    conditions.push(`description ILIKE $${index}`);
    values.push(`%${params.description}%`);
    index++;
  }
  if (params.price && params.price.trim() !== "") {
    conditions.push(`price = $${index}`);
    values.push(params.price);
    index++;
  }
  if (params.quantity && params.quantity.trim() !== "") {
    conditions.push(`quantity = $${index}`);
    values.push(params.quantity);
    index++;
  }
  if (params.category_id && params.category_id.trim() !== "") {
    conditions.push(`category_id = $${index}`);
    values.push(params.category_id);
    index++;
  }

  if (conditions.length > 0) {
    query += ` AND (${conditions.join(conditionJoin)})`;
  }
  query += " ORDER BY inventory_table.id";
  const { rows } = await pool.query(query, values);
  return rows;
}

async function getAllCategoryQuery() {
  const { rows } = await pool.query("SELECT * FROM category_table ORDER BY id");
  return rows;
}

async function getAllProductQuery() {
  const { rows } = await pool.query(
    "select inventory_table.id, name, description, price, quantity, category_table.category from inventory_table left join category_table on inventory_table.category_id = category_table.id ORDER BY inventory_table.id"
  );
  return rows;
}

async function getProduct(id) {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_table WHERE id = ($1)`,
    [id]
  );
  return rows;
}

async function getCategory(id) {
  const { rows } = await pool.query(
    `
    SELECT * FROM category_table WHERE id = ($1)
    `,
    [id]
  );
  return rows;
}

async function checkCategoryInInventory(params) {
  const { rows } = await pool.query(
    `
    SELECT name FROM inventory_table WHERE category_id = ($1)
    `,
    [params]
  );
  return rows;
}

// INSERT

async function insertProduct(params) {
  await pool.query(
    `
    INSERT INTO inventory_table (
    name,
    description,
    price,
    quantity,
    category_id
    )
    VALUES (
        $1, $2, $3, $4, $5
    );
    `,
    [
      params.name,
      params.description,
      params.price,
      params.quantity,
      params.category_id,
    ]
  );
}

async function insertCategory(params) {
  await pool.query(
    `
      INSERT INTO category_table (
      category
      )
      VALUES (
          $1
      );
      `,
    [params.category]
  );
}

// DELETE

async function deleteProduct(params) {
  await pool.query(
    `
            DELETE FROM inventory_table WHERE id = ($1)
        
        `,
    [params]
  );
}

async function deleteCategory(params) {
  await pool.query(
    `
    DELETE FROM category_table WHERE id = ($1)
    `,
    [params]
  );
}

// UPDATE

async function updateProduct(params) {
  await pool.query(
    `
    UPDATE inventory_table
    SET name = ($1), description = ($2),
    price = ($3), quantity = ($4), category_id = ($5) 
    WHERE id = ($6);
    `,
    [
      params.name,
      params.description,
      params.price,
      params.quantity,
      params.category_id,
      params.id,
    ]
  );
}

async function updateCategory(params) {
  await pool.query(
    `
      UPDATE category_table
      SET category = ($1) WHERE id = ($2)
    `,
    [params.category, params.id]
  );
}

module.exports = {
  getAllProductQuery,
  getAllCategoryQuery,
  insertProduct,
  insertCategory,
  deleteProduct,
  getProduct,
  updateProduct,
  checkCategoryInInventory,
  deleteCategory,
  getCategory,
  updateCategory,
  findProduct,
};
