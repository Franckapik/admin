// core components
import Header from 'components/Headers/Header'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
// reactstrap components
import { Card, CardBody, CardHeader, Container, Row, Table } from 'reactstrap'
import { Map, Marker } from 'pigeon-maps'

const Ship = () => {
	const { response: carriersList } = useFetch('/ship/carriers')
	const { response: serviceList } = useFetch(
		'/ship/service-points?country=FR&distance=10&latitude=48.2772321689434&longitude=-1.6697866335057476'
	)

	const [service, setService] = useState([])

	useEffect(() => {
		serviceList && serviceList.length && setService(serviceList)
	}, [serviceList])

	const [center, setCenter] = useState([50.879, 4.6997])
	const [zoom, setZoom] = useState(11)

	return (
		<>
			<Header />
			<Container className="mt--7" fluid>
				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des transporteurs disponibles (carriers)</h3>
							</CardHeader>
							{carriersList && carriersList.length && carriersList.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<tbody>
										{Array.from(carriersList).map((a, i) => {
											return (
												<tr>
													<td key={'carrier' + i}>{a}</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								'Aucun transporteur disponible'
							)}
						</Card>
					</div>
				</Row>
				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des transporteurs disponibles (carriers)</h3>
							</CardHeader>
							<CardBody>
								<Map
									height={300}
									center={center}
									zoom={zoom}
									onBoundsChanged={({ center, zoom }) => {
										setCenter(center)
										setZoom(zoom)
									}}
								/>

								<span
									onClick={() => {
										setCenter([48.333333, -1.633333])
										setZoom(13)
									}}
								>
									{' '}
									essai{' '}
								</span>
							</CardBody>
						</Card>
					</div>
				</Row>
				{/* 				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des transporteurs disponibles (carriers)</h3>
							</CardHeader>
							{service && service.length && service.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<tbody>
										{Array.from(service).map((a, i) => {
											return (
												<tr>
													<td>{a.id}</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								'Aucun transporteur disponible'
							)}
						</Card>
					</div>
				</Row> */}
			</Container>
		</>
	)
}

export default Ship
