const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const config = require('./config');

const Pool = require('pg').Pool
const pool = new Pool(config.db)

pool.query('SELECT NOW() as now')
  .then(res => console.log("Connection checked on database " + config.db.host + "/" + config.db.database ))
  .catch(e => console.error("Connection Failed on database $condif.db.database " + e.stack))

const db = {
  query: (text, params) => pool.query(text, params)
}

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/db/:id", async (req, res) => {
const {id} = req.params
const essai = await db.query('select * from "product"');
/* const essai = await db.query('select * from "product" where id = $1', [id])
 */console.log(essai.rows);
res.json(essai.rows);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});