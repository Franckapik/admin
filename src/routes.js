import Index from 'views/Index.js'
import Profile from 'views/examples/Profile.js'
import Maps from 'views/examples/Maps.js'
import Register from 'views/examples/Register.js'
import Login from 'views/examples/Login.js'
import Tables from 'views/examples/Tables.js'
import Icons from 'views/examples/Icons.js'
import Products from 'views/examples/Products.js'
import Database from 'views/examples/Database.js'
import Customers from 'views/examples/Customers.js'
import ReactGA from 'react-ga'
import Orders from 'views/examples/Orders'

{
	ReactGA.initialize('UA-112792874-1')
}
{
	ReactGA.pageview(window.location.pathname + window.location.search)
}

var routes = [
	{
		path: '/index',
		name: 'Tableau de bord',
		icon: 'ni ni-tv-2 text-primary',
		component: Index,
		layout: '/admin',
	},
	{
		path: '/products',
		name: 'Produits',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Products,
		layout: '/admin',
	},
	{
		path: '/database',
		name: 'Base de Données',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Database,
		layout: '/admin',
	},
	{
		path: '/clients',
		name: 'Clients',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Customers,
		layout: '/admin',
	},
	{
		path: '/orders',
		name: 'Commandes',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Orders,
		layout: '/admin',
	},
	{
		path: '/icons',
		name: 'Icons',
		icon: 'ni ni-planet text-blue',
		component: Icons,
		layout: '/admin',
	},
	{
		path: '/maps',
		name: 'Maps',
		icon: 'ni ni-pin-3 text-orange',
		component: Maps,
		layout: '/admin',
	},
	{
		path: '/user-profile',
		name: 'Profile',
		icon: 'ni ni-single-02 text-yellow',
		component: Profile,
		layout: '/admin',
	},
	{
		path: '/tables',
		name: 'Tables',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Tables,
		layout: '/admin',
	},
	{
		path: '/login',
		name: 'Login',
		icon: 'ni ni-key-25 text-info',
		component: Login,
		layout: '/auth',
	},
	{
		path: '/register',
		name: 'Register',
		icon: 'ni ni-circle-08 text-pink',
		component: Register,
		layout: '/auth',
	},
]
export default routes
