const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

const config = require('./config')

const knex = require('knex')(config.db)

const { google } = require('googleapis')

const logger = require('./log/logger')

const moment = require('moment')
const session = require('express-session')
const { sessionStore, upsert, query, insert } = require('./db/db')
const cors = require('cors')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

app.options(
	'*',
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

let Parser = require('rss-parser')
let parser = new Parser()

var cookies = require('cookie-parser')

app.use(cookies())

var helmet = require('helmet')
app.use(helmet())

// Middleware
app.use(express.json()) //since express 4.16

app.use(
	session({
		secret: config.secret,
		store: sessionStore,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
			httpOnly: false,
		},
		resave: true,
		saveUninitialized: true,
	})
)

//analytics

const googleAccounts = google.analytics('v3')
const googleAnalytics = google.analyticsreporting('v4')
let viewSelected

const clientID = '136823446557-1uqetqqjabi0tbmqs1i9ci1rsil1i9np.apps.googleusercontent.com'
const clientSecret = 'IlZwBg0TEhGnGHkyvUGOaBsn'
const callbackURL = 'http://localhost:3001/login/google/return'

const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, callbackURL)
const url = oauth2Client.generateAuthUrl({
	access_type: 'online',
	scope: 'https://www.googleapis.com/auth/analytics.readonly',
})

app.get('/auth/google', (req, res) => {
	res.redirect(url)
})

app.get('/login/google/return', (req, res) => {
	oauth2Client.getToken(req.query.code, (err, tokens) => {
		viewSelected = ''
		if (!err) {
			oauth2Client.setCredentials({
				access_token: tokens.access_token,
			})
			res.redirect('/setcookie')
		} else {
			console.log('Error: ' + err)
		}
	})
})

app.get('/setcookie', (req, res) => {
	res.cookie('google-auth', new Date())
	res.redirect('/success')
})

app.get('/success', (req, res) => {
	if (req.cookies['google-auth']) {
		res.redirect('/getData')
	} else {
		res.redirect('/')
	}
})

app.get('/clear', (req, res) => {
	viewSelected = ''
	res.redirect('/success')
})

app.get('/getData', function (req, res) {
	viewSelected = '169310577'

	if (!viewSelected) {
		console.log('pas de view')
		googleAccounts.management.profiles.list(
			{
				accountId: '~all',
				webPropertyId: '~all',
				auth: oauth2Client,
			},
			(err, data) => {
				if (err) {
					console.error('Error: ' + err)
					res.send('An error occurred')
				} else if (data) {
					let views = []
					data.items.forEach((view) => {
						views.push({
							name: view.webPropertyId + ' - ' + view.name + ' (' + view.websiteUrl + ')',
							id: view.id,
						})
					})
					res.send({ type: 'views', results: views })
					console.log(views)
				}
			}
		)
	} else {
		console.log('view')
		let now = moment().format('YYYY-MM-DD')
		let aMonthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD')
		let repReq = [
			{
				viewId: viewSelected,
				dateRanges: [
					{
						startDate: aMonthAgo,
						endDate: now,
					},
				],
				metrics: [
					{
						expression: 'ga:pageLoadTime',
					},
				],
				dimensions: [
					{
						name: 'ga:source',
					},
				],
			},
		]

		googleAnalytics.reports.batchGet(
			{
				headers: {
					'Content-Type': 'application/json',
				},
				auth: oauth2Client,
				resource: {
					reportRequests: repReq,
				},
			},
			(err, data) => {
				if (err) {
					console.error('Error: ' + err)
					res.send('An error occurred')
				} else if (data) {
					let views = []
					let max = 0
					data.data.reports[0].data.rows.forEach((view) => {
						views.push(view.metrics[0].values[0])
						if (parseInt(view.metrics[0].values[0]) > parseInt(max)) max = view.metrics[0].values[0]
					})
					res.send([views, max])
				}
			}
		)
	}
})

app.get('/logoff', (req, res) => {
	res.clearCookie('google-auth')
	res.redirect('/')
})

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' })
})

app.get('/session', (req, res) => {
	res.send(req.session)
})

// insert into db

app.post('/addProduct', (req, res) => {
	const col = req.body.collection ? insert('collection', 'collection_id', req.body.collection) : Promise.resolve()
	const perf = req.body.performance ? insert('collection', 'collection_id', req.body.collection) : Promise.resolve()
	const pack = req.body.packaging ? insert('packaging', 'packaging_id', req.body.packaging) : Promise.resolve()
	const prop = req.body.property ? insert('property', 'property_id', req.body.property) : Promise.resolve()

	Promise.all([col, perf, pack, prop])
		.then((values) => {
			insert('product', 'product_id', req.body.product)
				.then((id) => res.json({ 'New product': values }))
				.catch((error) => res.sendStatus(500))
		})
		.catch((err) => {
			console.log(err)
		})
})

app.post('/modifyProduct', (req, res) => {
	const col = req.body.collection ? insert('collection', 'collection_id', req.body.collection) : Promise.resolve()
	const perf = req.body.performance ? insert('collection', 'collection_id', req.body.collection) : Promise.resolve()
	const pack = req.body.packaging ? insert('packaging', 'packaging_id', req.body.packaging) : Promise.resolve()
	const prop = req.body.property ? insert('property', 'property_id', req.body.property) : Promise.resolve()

	Promise.all([col, perf, pack, prop])
		.then((values) => {
			upsert('product', 'product_id', req.body.product)
				.then((id) => res.json({ 'Product modified': values }))
				.catch((error) => res.sendStatus(500))
		})
		.catch((err) => {
			console.log(err)
		})
})

app.delete('/delProduct/:id', (req, res) => {
	knex('product')
		.where('product_id', req.params.id)
		.del()
		.then((deletedRows) => {
			res.sendStatus(200)
			logger.warn('Le produit %s %s', req.params.id, 'a été supprimé.')
		})
		.catch((err) => res.json({ error: err }))
})
app.delete('/delCustomer/:id', (req, res) => {
	knex('customer')
		.where('user_id', req.params.id)
		.del()
		.then((deletedRows) => {
			res.sendStatus(200)
			logger.warn('Le client %s %s', req.params.id, 'a été supprimé.')
		})
		.catch((err) => res.json({ error: err }))
})

app.post('/addCustomer', (req, res) => {
	upsert('customer', 'user_id', req.body).then(() => {
		res.sendStatus(200)
	})
})

//simple get

app.get('/customer', (req, res) => {
	query('customer').then((data) => res.send(data))
})
app.get('/collection', (req, res) => {
	query('collection').then((data) => res.send(data))
})
app.get('/product', (req, res) => {
	query('product').then((data) => res.send(data))
})
app.get('/performance', (req, res) => {
	query('performance').then((data) => res.send(data))
})
app.get('/packaging', (req, res) => {
	query('packaging').then((data) => res.send(data))
})
app.get('/property', (req, res) => {
	query('property').then((data) => res.send(data))
})
app.get('/business', (req, res) => {
	query('business').then((data) => res.send(data))
})
app.get('/transporter', (req, res) => {
	query('transporter').then((data) => res.send(data))
})
app.get('/status', (req, res) => {
	query('status').then((data) => res.send(data))
})
app.get('/invoice', (req, res) => {
	query('invoice').then((data) => res.send(data))
})
app.get('/delivery', (req, res) => {
	query('delivery').then((data) => res.send(data))
})
app.get('/news', (req, res) => {
	;(async () => {
		let feed = await parser.parseURL('https://fr.audiofanzine.com/news/a.rss.xml')
		res.send(feed)
	})()
})
app.get('/transaction', (req, res) => {
	query('transaction').then((data) => res.send(data))
})
app.get('/item', (req, res) => {
	query('item').then((data) => res.send(data))
})
app.get('/discount', (req, res) => {
	query('discount').then((data) => res.send(data))
})
app.get('/status', (req, res) => {
	query('status').then((data) => res.send(data))
})

//get with join
app.get('/complete_product', (req, res) => {
	knex
		.select(['product.*', 'collection.*', 'packaging.*', 'performance.*', 'property.*'])
		.from('product')
		.join('collection', 'product.collection_id', 'collection.collection_id')
		.join('performance', 'product.performance_id', 'performance.performance_id')
		.join('packaging', 'product.packaging_id', 'packaging.packaging_id')
		.join('property', 'product.property_id', 'property.property_id')
		.then((data) => {
			res.send(data)
		})
})

/* 
.join('discount', 'invoice.discount_id', 'discount.discount_id')

 */

app.get('/complete_invoice', (req, res) => {
	knex('invoice')
		.join('customer', 'invoice.user_id', 'customer.user_id')
		.join('status', 'invoice.status_id', 'status.status_id')
		.join('transporter', 'invoice.transporter_id', 'transporter.transporter_id')
		.join('discount', 'invoice.discount_id', 'discount.discount_id')
		.then((data) => {
			console.log(data)
			res.send(data)
		})
})

app.get('/ship/:id', (req, res) => {
	fetch(config.shipping.url + req.params.id, {
		headers: {
			Authorization:
				'Basic ' + Buffer.from(`${config.shipping.public}:${config.shipping.secret}`, 'binary').toString('base64'),
		},
	})
		.then((response) => response.text())
		.then((data) => {
			console.log(data)
			res.send(data)
		})
})

app.listen(PORT, () => {
	logger.info(`Server listening on ${PORT}`)
})
