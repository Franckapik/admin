const config = require('../config');
const knex = require('knex')(config.db);
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const sessionStore = new KnexSessionStore({ //saving express session into db
  knex,
  sidfieldname: 'session_id',
  tablename: 'session', // optional. Defaults to 'sessions'
});

knex
.raw('SELECT NOW() as now')
.then(res => console.log("Connexion checked on database",config.db.connection.host,"/",config.db.connection.database," [", res.rows[0].now,"] "))
.catch(err => console.log(err))

module.exports.sessionStore = sessionStore;