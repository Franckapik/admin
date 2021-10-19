const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const config = require('./config')
const knex = require('knex')(config.db)
const logger = require('./log/logger')
const session = require('express-session')
require('./routes/auth')
const passport = require('passport')
const { sessionStore, upsert, query, insert, insertForce } = require('./db/db')
const cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const multer = require('multer')
const fs = require('fs')
let Parser = require('rss-parser')
let parser = new Parser()
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

//Expressjs Router

/* const ga = require('./routes/ga')

app.use('/ga', ga) */

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.static('public'))
app.use(cookieParser()) //usefull for session and passportjs
app.use(express.json({ limit: '10mb' })) // since express 4.16
app.use(
	express.urlencoded({
		extended: true,
	})
)
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

app.use(passport.initialize())
app.use(passport.session())

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/')
	},
	limits: {
		fileSize: 1000000, // 1000000 Bytes = 1 MB
	},
	filename: function (req, file, cb) {
		const getFileExt = function (fileName) {
			const fileExt = fileName.split('.')
			if (fileExt.length === 1 || (fileExt[0] === '' && fileExt.length === 2)) {
				return ''
			}
			return fileExt.pop()
		}
		cb(null, file.fieldname + '_' + Date.now() + '.' + getFileExt(file.originalname))
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(csv)$/)) {
			// upload only png and jpg format
			return cb(new Error('Please upload a csv file'))
		}
		cb(undefined, true)
	},
})

const multerUpload = multer({ storage: storage })

//analytics

function isLoggedIn(req, res, next) {
	console.log(req.user)
	req.user ? next() : res.sendStatus(401)
}

app.get('/failed', (req, res) => {
	res.send('Failed')
})
app.get('/sucess', (req, res) => {
	res.send(`Welcome ${req.user.email}`)
})

app.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
)

app.get(
	'/login/google/return',
	passport.authenticate('google', {
		successRedirect: '/sucess',
		failureRedirect: '/failed',
	})
)

app.get('/logout', (req, res) => {
	req.logout()
	req.session.destroy()
	res.send('Goodbye!')
})

//

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

app.post('/addInvoice', (req, res) => {
	console.log(req.body)
	const cust = req.body.customer ? insert('customer', 'user_id', req.body.customer) : Promise.resolve()
	const stat = req.body.status ? insert('status', 'status_id', req.body.status) : Promise.resolve()
	const deli = req.body.delivery ? insert('delivery', 'delivery_id', req.body.delivery) : Promise.resolve()
	const tran = req.body.transaction ? insert('transaction', 'transaction_id', req.body.transaction) : Promise.resolve()
	const disc = req.body.discount ? insert('discount', 'discount_id', req.body.discount) : Promise.resolve()
	const item = req.body.items
		? req.body.items.map((a, i) => {
				return insertForce('item', a)
		  })
		: Promise.resolve()

	Promise.all([cust, stat, deli, tran, disc, item])
		.then((values) => {
			insert('invoice', 'invoice_id', req.body.invoice)
				.then((id) => res.json({ 'New invoice': values }))
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

app.delete('/delMaterial/:id', (req, res) => {
	knex('material')
		.where('value', req.params.id)
		.del()
		.then((deletedRows) => {
			res.sendStatus(200)
			logger.warn('Le materiaux %s %s', req.params.id, 'a été supprimé.')
		})
		.catch((err) => res.json({ error: err }))
})
app.delete('/delInvoice/:id', (req, res) => {
	knex('invoice')
		.where('invoice_id', req.params.id)
		.del()
		.then((deletedRows) => {
			res.sendStatus(200)
			logger.warn('La facture %s %s', req.params.id, 'a été supprimée.')
		})
		.catch((err) => res.json({ error: err }))
})

app.post('/addCustomer', (req, res) => {
	upsert('customer', 'user_id', req.body).then(() => {
		res.sendStatus(200)
	})
})

//uploads csv file with multer middleware
app.post(
	'/addCSV',
	multerUpload.single('catalogue'),
	(req, res, next) => {
		console.log(req.files)
		res.end('File is uploaded .... ' + Date.now())
		// req.body will hold the text fields, if there were any
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message })
	}
)

//add material to database
app.post('/addMatiere', (req, res, next) => {
	console.log(req.body)
	insert('material', 'value', req.body).then(() => {
		res.sendStatus(200)
	})
})

//download file csv

app.get('/uploadedList', (req, res) => {
	let arr = []

	fs.readdir('./public/uploads', (err, files) => {
		if (files) {
			files.forEach((file) => {
				arr.push(file)
				console.log(file)
			})
			res.send(arr)
		} else {
			res.send(err)
		}
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
app.get('/material', (req, res) => {
	query('material').then((data) => res.send(data))
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
		.join('discount', 'invoice.discount_id', 'discount.discount_id')
		.join('delivery', 'invoice.delivery_id', 'delivery.delivery_id')
		.join('transaction', 'invoice.transaction_id', 'transaction.transaction_id')
		.then((data) => {
			res.send(data)
		})
})

app.get('/ship/:id', (req, res) => {
	logger.info('Shipping fetch data %s', req.params.id)

	fetch(config.shipping.url + req.params.id, {
		headers: {
			Authorization:
				'Basic ' + Buffer.from(`${config.shipping.public}:${config.shipping.secret}`, 'binary').toString('base64'),
		},
	})
		.then((response) => response.text())
		.then((data) => {
			res.send(data)
		})
})

app.post('/addParcel', (req, res) => {
	logger.info('Add a parcel %o', req.body.parcel.name)
	fetch('https://panel.sendcloud.sc/api/v2/parcels', {
		method: 'post',
		body: JSON.stringify(req.body),
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Basic ' + Buffer.from(`${config.shipping.public}:${config.shipping.secret}`, 'binary').toString('base64'),
		},
	})
		.then((response) => {
			if (response.ok) {
				logger.info('Parcel added %s', response.statusText)
			} else {
				logger.error('Parcel error%s', response.statusText)
			}
			response.text()
		})
		.then((data) => {
			res.send(data)
		})
})

app.get('/getParcel', (req, res) => {
	logger.info('Fetch all parcels')
	fetch('https://panel.sendcloud.sc/api/v2/parcels', {
		headers: {
			Authorization:
				'Basic ' + Buffer.from(`${config.shipping.public}:${config.shipping.secret}`, 'binary').toString('base64'),
		},
	})
		.then((response) => {
			if (response.ok) {
				logger.info('Parcel fetched %s', response.statusText)
			} else {
				logger.error('Parcel fetch error%s', response.statusText)
			}
			return response.json()
		})
		.then((data) => {
			res.send(data)
		})
})

//http://localhost:3001/ship/service-points?country=FR&latitude=48.2772321689434&longitude=-1.6697866335057476

app.get('/service-points', (req, res) => {
	logger.info('Shipping fetch data %s', req.url.substring(req.url.indexOf('?')))
	const queries = req.url.substring(req.url.indexOf('?'))
	fetch(config.shipping.url + 'service-points' + queries, {
		headers: {
			Authorization:
				'Basic ' + Buffer.from(`${config.shipping.public}:${config.shipping.secret}`, 'binary').toString('base64'),
		},
	})
		.then((response) => response.text())
		.then((data) => {
			res.send(data)
		})
})

app.listen(PORT, () => {
	logger.info(`Server listening on ${PORT}`)
})
