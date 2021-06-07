const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const config = require('./config');

const knex = require('knex')(config.db);

const logger = require('./log/logger');
const session = require('express-session');
const db = require('./db/db')

var helmet = require('helmet');
app.use(helmet());

// Middleware 
app.use(express.json()); //since express 4.16

app.use(session({ 
  secret: config.secret,
  store: db.sessionStore,
  cookie : {
    maxAge : 24 * 60 * 60 * 1000, // 24 hours
    httpOnly : false
  },
  resave : true,
  saveUninitialized : true,
}));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/session", (req, res) => {
  res.send(req.session)
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

app.post("/addCustomer", (req, res) => {
  knex('customer')
  .insert(req.body)
  .onConflict('user_id')
  .merge() //upsert if .merge and no action if .ignore
  .returning('user_id')
  .then(id => {
    logger.info('[Knex] Table ' + 'customer' + ' Données enregistrées (id): %s', id[0]);
    return id
  }).catch(error => logger.error('[Erreur Enregistrement ' + 'customer' + '] Sauvegarde db %s', error))
})

app.post("/addProduct", (req, res) => {
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
  .select([
    'product.*','collection.name as nom', 'packaging.*', 'performance.*', 'property.*'
  ])
  .from('product')
  .join( 'collection', 'product.collection_id', 'collection.collection_id' )
  .join( 'performance', 'product.performance_id', 'performance.performance_id' )
  .join( 'packaging', 'product.packaging_id', 'packaging.packaging_id' )
  .join( 'property', 'product.property_id', 'property.property_id' )
  .then(data => {console.log(data)
  res.send(data)})
})

app.get("/customer", (req,res) => {
  knex
  .select('*')
  .from('customer')
  .then(data => res.send(data))
})

app.get("/collection", (req,res) => {
  knex
  .select('*')
  .from('collection')
  .then(data => res.send(data))
})
app.get("/performance", (req,res) => {
  knex
  .select('*')
  .from('performance')
  .then(data => res.send(data))
})
app.get("/packaging", (req,res) => {
  knex
  .select('*')
  .from('packaging')
  .then(data => res.send(data))
})
app.get("/property", (req,res) => {
  knex
  .select('*')
  .from('property')
  .then(data => res.send(data))
})
app.get("/business", (req,res) => {
  knex
  .select('*')
  .from('business')
  .then(data => res.send(data))
})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});