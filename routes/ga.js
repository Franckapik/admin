var express = require('express')
var router = express.Router()
const cors = require('cors')
require('./auth')
const moment = require('moment')
const passport = require('passport')

const { google } = require('googleapis')

const googleAccounts = google.analytics('v3')
const googleAnalytics = google.analyticsreporting('v4')
let viewSelected

function isLoggedIn(req, res, next) {
	console.log(req.user)
	req.user ? next() : res.sendStatus(401)
}

router.get('/failed', (req, res) => {
	res.send('Failed')
})
router.get('/sucess', isLoggedIn, (req, res) => {
	console.log(req.user)
	res.send(`Welcome ${req.user.profile.email}`)
})

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile', 'https://www.googleapis.com/auth/analytics.readonly'],
	})
)

router.get(
	'/login/google/return',
	passport.authenticate('google', {
		successRedirect: '/ga/sucess',
		failureRedirect: '/ga/failed',
	})
)

router.get('/logout', (req, res) => {
	req.logout()
	req.session.destroy()
	res.send('Goodbye!')
})

router.get('/getData', function (req, res) {
	const oauth2Client = new google.auth.OAuth2()
	console.log(req.user)
	oauth2Client.setCredentials({
		access_token: req.user.accessToken,
	})

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

module.exports = router

/* 
const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, callbackURL)
const url = oauth2Client.generateAuthUrl({
	access_type: 'online',
	scope: 'https://www.googleapis.com/auth/analytics.readonly',
})

router.use(cors()) // access-control-allow-origin: * in response headers

router.get('/auth/google', (req, res) => {
	res.redirect(url)
})

router.get('/login/google/return', (req, res) => {
	oauth2Client.getToken(req.query.code, (err, tokens) => {
		viewSelected = ''
		if (!err) {
			oauth2Client.setCredentials({
				access_token: tokens.access_token,
			})
			res.redirect('/ga/setcookie')
		} else {
			console.log('Error: ' + err)
		}
	})
})

router.get('/setcookie', (req, res) => {
	res.cookie('google-auth', new Date())
	res.redirect('/ga/success')
})

router.get('/success', (req, res) => {
	if (req.cookies['google-auth']) {
		res.redirect('/ga/getData')
	} else {
		res.redirect('/')
	}
})

router.get('/clear', (req, res) => {
	viewSelected = ''
	res.redirect('/ga/success')
})

router.get('/getData', function (req, res) {
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

router.get('/logoff', (req, res) => {
	res.clearCookie('google-auth')
	res.redirect('/')
})
 */
