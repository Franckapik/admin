const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const clientID = '136823446557-1uqetqqjabi0tbmqs1i9ci1rsil1i9np.apps.googleusercontent.com'
const clientSecret = 'IlZwBg0TEhGnGHkyvUGOaBsn'
const callbackURL = 'http://localhost:3001/login/google/return'

passport.use(
	new GoogleStrategy(
		{
			clientID: clientID,
			clientSecret: clientSecret,
			callbackURL: callbackURL,
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			return done(null, profile)
		}
	)
)

passport.serializeUser(function (user, done) {
	done(null, user)
})

passport.deserializeUser(function (user, done) {
	done(null, user)
})
