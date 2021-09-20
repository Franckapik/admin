// core components
import ProductForm from 'components/Forms/ProductForm'
import ProductHeader from 'components/Headers/ProductHeader.js'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import useToggle from 'hooks/useToggle'
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table } from 'reactstrap'

import ModalBox from 'layouts/ModalBox'
import Header from 'components/Headers/Header'
const Ship = () => {
	const { response: carriersList } = useFetch('/ship/carriers')

	return (
		<>
			<Header />

			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des transporteurs disponibles</h3>
							</CardHeader>
							{carriersList && carriersList.length && carriersList.length > 0 ? carriersList : 'Aucun produit existant'}
						</Card>
					</div>
				</Row>
			</Container>
		</>
	)
}

export default Ship
