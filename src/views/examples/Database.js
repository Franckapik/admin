// core components
import Header from 'components/Headers/Header.js'
import useFetch from 'hooks/useFetch'
import React from 'react'
// reactstrap components
import { Container } from 'reactstrap'
import { List } from '../../layouts/List'

const Database = () => {
	const { response: customerList } = useFetch('/customer')
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')
	const { response: propertyList } = useFetch('/property')
	const { response: performanceList } = useFetch('/performance')
	const { response: packagingList } = useFetch('/packaging')
	const { response: invoiceList } = useFetch('/invoice')
	const { response: materialList } = useFetch('/material')

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				{productList && productList.length && productList.length > 0 ? (
					<List data={productList} name="produits" />
				) : (
					'Aucun produit'
				)}
				{customerList && customerList.length && customerList.length > 0 ? (
					<List data={customerList} name="clients" />
				) : (
					'Aucun client'
				)}
				{collectionList && collectionList.length && collectionList.length > 0 ? (
					<List data={collectionList} name="collections" />
				) : (
					'Aucune collection'
				)}
				{propertyList && propertyList.length && propertyList.length > 0 ? (
					<List data={propertyList} name="propriétés" />
				) : (
					'Aucune propriété'
				)}
				{performanceList && performanceList.length && performanceList.length > 0 ? (
					<List data={performanceList} name="performances" />
				) : (
					'Aucune performance'
				)}
				{packagingList && packagingList.length && packagingList.length > 0 ? (
					<List data={packagingList} name="packaging" />
				) : (
					'Aucun packaging'
				)}
				{invoiceList && invoiceList.length && invoiceList.length > 0 ? (
					<List data={invoiceList} name="factures" />
				) : (
					'Aucune facture'
				)}
				{materialList && materialList.length && materialList.length > 0 ? (
					<List data={materialList} name="materiaux" />
				) : (
					'Aucune facture'
				)}
			</Container>
		</>
	)
}

export default Database
