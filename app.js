const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const config = require('./config');

const Pool = require('pg').Pool
const pool = new Pool(config.db)

// Middleware since express 4.16
app.use(express.json());


pool.query('SELECT NOW() as now')
  .then(res => console.log("Connection checked on database " + config.db.host + "/" + config.db.database ))
  .catch(e => console.error("Connection Failed on database $condif.db.database " + e.stack))

const db = {
  query: (text, params) => pool.query(text, params)
}

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/status", async (req, res) => {
const essai = await db.query('select * from "status"');
res.json(essai.rows);
});

app.get("/db/:id", async (req, res) => {
const {id} = req.params
const essai = await db.query('select * from "product"');
/* const essai = await db.query('select * from "product" where id = $1', [id])
 */

res.json(essai.rows);
});

app.post('/newProduct', (req,res) => {
  console.log(req.body);
  res.send(req.body);
})



app.post('/addStatus', (req,res) => {
  console.log(req.body);
  const query = {
    text : "INSERT INTO public.product (product_id, performance_id, name, price, img, stock, collection_id, packaging_id, property_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    values : Object.values([req.body.product_id, req.body.performance_id, req.body.name, req.body.price, req.body.img, req.body.stock, req.body.collection_id, req.body.packaging.id, req.body.property_id])
  }
  db.query(query)
  .then(resp => 
    res.send(resp.row))
  .catch(e => console.error(e.stack))

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});