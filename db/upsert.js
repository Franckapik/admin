const config = require('../config');

const knex = require('knex')(config.db);

knex
.raw('SELECT NOW() as now')
.then(res => console.log("Connexion checked on database",config.db.connection.host,"/",config.db.connection.database," [", res.rows[0].now,"] "))
.catch(err => console.log(err))

//no need about this syntax for upsert function
const upsert = (table, where, sessid, data, returned) => {
    return knex.select('*')
      .groupBy(returned)
      .from(table)
      .where(where)
      .count()
      .then((count) => {
        if (count == 0) {
          return knex(table)
            .insert(data)
            .returning(returned)
            .then(id => {
              logger.info('[Knex] Table ' + table + ' Données enregistrées (id): %s', id[0]);
              return id
            }).catch(error => logger.error('[Erreur Enregistrement ' + table + '] Sauvegarde db %s', error))
        } else {
          return knex(table)
            .where(where)
            .update(data)
            .returning(returned)
            .then(id => {
              logger.info('[Knex] Table ' + table + ': Données mise à jour (id): %s', id[0]);
              return id
            }).catch(error => logger.error('[Knex] Erreur sur la table ' + table + ' %s', error))
        }
      });
  }

const insert = (table)

module.exports.upsert = upsert;