export const invoicePdf = {
	documentTitle: 'Facture',
	locale: 'fr-FR',
	currency: 'EUR', //See documentation 'Locales and Currency' for more info
	taxNotation: 'vat', //or gst
	marginTop: 25,
	marginRight: 25,
	marginLeft: 25,
	marginBottom: 25,
	logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png', //or base64
	background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', //or base64 //img or pdf
	sender: {
		company: 'Quadratik.fr',
		address: '1 rue d aubigné',
		zip: '35440',
		city: 'Feins',
		country: 'France',
		//"custom1": "custom value 1",
		//"custom2": "custom value 2",
		//"custom3": "custom value 3"
	},
	client: {
		company: '',
		address: '',
		zip: '',
		city: '',
		country: '',
		//"custom1": "custom value 1",
		//"custom2": "custom value 2",
		//"custom3": "custom value 3"
	},
	invoiceNumber: '',
	invoiceDate: '',
	products: [],
	bottomNotice:
		'TVA non applicable, article 293 B du CGI | Escompte pour réglement anticipé de 0% - Pénalité en cas de retard de paiement: 1.5 fois le taux d intéret légal | IBAN : FR76 1380 7005 8132 3192 3592 810 BIC/SWIFT : CCBPFRPPNAN',
	translate: {
		invoiceNumber: 'Facture n°',
		invoiceDate: 'Date de facturation',
		products: 'Produits',
		quantity: 'Quantité',
		price: 'Prix',
		subtotal: 'Sous-total',
		total: 'Total',
	},
}

/* products: [
	{
		quantity: '2',
		description: 'Woodik-7',
		tax: 0,
		price: 68,
	},
	{
		quantity: '4',
		description: 'Quadrablack',
		tax: 0,
		price: 62,
	},
], */
