import express, { request, response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4242;

app.use(bodyParser.json());
app.use(cors());

const sql = neon(process.env.DATABASE_URL);

app.get("/products", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM products`;
    res.send(response);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, description, price, img_url } = req.body;

    if (!name || !description || !price || !img_url) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await sql`
      INSERT INTO products (name, description, price, img_url)
      VALUES (${name}, ${description}, ${price}, ${img_url})
    `;
    res.status(201).json(`'${name}' has been successfully added.`);
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sqlRes = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *;`;

    if (sqlRes.length > 0) {
      res.json({ success: true, product: sqlRes[0] });
    } else {
      res.status(404).json({ success: false, error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
