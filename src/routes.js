import ReactGA from 'react-ga'
import Customers from 'views/examples/Customers.js'
import Database from 'views/examples/Database.js'
import Delivery from 'views/examples/Delivery'
import Icons from 'views/examples/Icons.js'
import Invoice from 'views/examples/Invoice'
import Login from 'views/examples/Login.js'
import Parcel from 'views/examples/Parcel'
import Products from 'views/examples/Products.js'
import Profile from 'views/examples/Profile.js'
import Register from 'views/examples/Register.js'
import Relais from 'views/examples/Relais'
import Tables from 'views/examples/Tables.js'
import Index from 'views/Index.js'

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
		path: '/Invoice',
		name: 'Commandes',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Invoice,
		layout: '/admin',
	},
	{
		path: '/delivery',
		name: 'Livraisons',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Delivery,
		layout: '/admin',
	},
	{
		path: '/Parcel',
		name: 'Expeditions',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Parcel,
		layout: '/admin',
	},
	{
		path: '/Relais',
		name: 'Relais',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Relais,
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
