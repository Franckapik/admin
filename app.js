const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const config = require('./config');

const knex = require('knex')(config.db);

const logger = require('./log/logger');


// Middleware since express 4.16
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

knex
.raw('SELECT NOW() as now')
.then(res => console.log("Connexion checked on database",config.db.connection.host,"/",config.db.connection.database," [", res.rows[0].now,"] "))
.catch(err => console.log(err))

app.post("/newProduct", (req, res) => {
  knex('product')
  .insert(req.body)
  .onConflict('product_id')
  .merge() //upsert if .merge and no action if .ignore
  .returning('product_id')
  .then(id => {
    logger.info('[Knex] Table ' + 'product' + ' Données enregistrées (id): %s', id[0]);
    return id
  }).catch(error => logger.error('[Erreur Enregistrement ' + 'product' + '] Sauvegarde db %s', error))
})

app.get("/product", (req,res) => {
  knex
  .select('*')
  .from('product')
  .then(data => res.send(data))
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});