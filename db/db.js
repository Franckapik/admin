const config = require('../config');
const knex = require('knex')(config.db);
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const logger = require("../log/logger");

const sessionStore = new KnexSessionStore({ //saving express session into db
  knex,
  sidfieldname: 'session_id',
  tablename: 'session', // optional. Defaults to 'sessions'
});

const upsert = (table, id, body) => {
  return knex(table)
    .insert(body)
    .onConflict(id)
    .merge() //upsert if .merge and no action if .ignore
    .returning(id)
    .then((id_data) => {
      logger.info(
        "[Knex] Table " + table + " Données enregistrées (id): %s",
        id_data[0]
      );
      return id_data;
    })
    .catch((error) =>
      logger.error(
        "[Erreur Enregistrement " + table + "] Sauvegarde db %s",
        error
      )
    );
};

const query = (table) => {
  return knex(table)
    .then((data) => {
      data.length
        ? logger.debug(
            "[Knex] Données Table " + table + " chargées (length): %o",
            data.length
          )
        : logger.warn(
            "[Knex] Données " + table + " manquantes (length): %o",
            data.length
          );
      return data;
    })
    .catch((error) =>
      logger.error("[Knex] Erreur de chargement de " + table + " %s", error)
    );
};

knex
.raw('SELECT NOW() as now')
.then(res => console.log("Connexion checked on database",config.db.connection.host,"/",config.db.connection.database," [", res.rows[0].now,"] "))
.catch(err => console.log(err))

module.exports.sessionStore = sessionStore;
module.exports.upsert = upsert;
module.exports.query = query;