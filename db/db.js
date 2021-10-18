const config = require('../config')
const knex = require('knex')(config.db)
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const logger = require('../log/logger')

const sessionStore = new KnexSessionStore({
	//saving express session into db
	knex,
	sidfieldname: 'session_id',
	tablename: 'session', // optional. Defaults to 'sessions'
})

const upsert = (table, id, body) => {
	return knex(table)
		.insert(body)
		.onConflict(id)
		.merge() //upsert if .merge and no action if .ignore
		.returning(id)
		.then((id_data) => {
			logger.info('[Knex] Table ' + table + ' Données enregistrées (id): %s', id_data[0])
			return id_data
		})
		.catch((error) => {
			logger.error('[Erreur Enregistrement ' + table + '] Sauvegarde db %s', error.message)
			return error
		})
}

const insert = (table, id, body) => {
	return knex(table)
		.insert(body)
		.onConflict(id)
		.ignore()
		.returning(id)
		.then((id_data) => {
			if (id_data.length) {
				//ignore or not
				logger.info('[Knex] Table ' + table + ' Données enregistrées (id): %s', id_data[0])
				return id_data
			} else {
				logger.warn('[Knex] Table ' + table + ' Données existantes. Insertion ignorée')
			}
		})
		.catch((error) => {
			logger.error('[Erreur Enregistrement ' + table + '] Sauvegarde db %s', error.message)
			return error
		})
}

const insertForce = (table, body) => {
	return knex(table)
		.insert(body)
		.then((id_data) => {
			if (id_data.length) {
				//ignore or not
				logger.info('[Knex] Table ' + table + ' Données enregistrées (id): %s', id_data[0])
				return id_data
			} else {
				logger.warn('[Knex] Table ' + table + ' Données existantes. Insertion ignorée')
			}
		})
		.catch((error) => {
			logger.error('[Erreur Enregistrement ' + table + '] Sauvegarde db %s', error.message)
			return error
		})
}

const query = (table) => {
	return knex(table)
		.then((data) => {
			data.length
				? logger.debug('[Knex] Données Table ' + table + ' chargées (length): %o', data.length)
				: logger.warn('[Knex] Données ' + table + ' manquantes (length): %o', data.length)
			return data
		})
		.catch((error) => logger.error('[Knex] Erreur de chargement de ' + table + ' %s', error.message))
}

knex
	.raw('SELECT NOW() as now')
	.then((res) =>
		logger.info(
			'Connexion checked on database %s %s %s %s %s %s',
			config.db.connection.host,
			'/',
			config.db.connection.database,
			'[',
			res.rows[0].now,
			']'
		)
	)
	.catch((err) => logger.error(err))

module.exports.sessionStore = sessionStore
module.exports.upsert = upsert
module.exports.insert = insert
module.exports.insertForce = insertForce
module.exports.query = query
