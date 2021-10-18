// core components
import useFetch from 'hooks/useFetch'
import { Map, Marker } from 'pigeon-maps'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Col, List, Row } from 'reactstrap'
const FindRelaisMap = ({ addressSelected, setRelaisSelected, relaisSelected }) => {
	//map states

	const [center, setCenter] = useState([48.27, -1.669])
	const [house, setHouse] = useState([48.27, -1.669])
	const [zoom, setZoom] = useState(12)
	const [bounds, setBounds] = useState({
		ne: [48.2742846248208, -1.655197352409374],
		sw: [48.26574358366042, -1.6828455629348866],
	})

	const [serviceState, setServiceState] = useState([])

	//find relais according to map
	const { response: serviceList } = useFetch(
		'/service-points?country=FR&ne_latitude=' +
			bounds.ne[0] +
			'&ne_longitude=' +
			bounds.ne[1] +
			'&sw_latitude=' +
			bounds.sw[0] +
			'&sw_longitude=' +
			bounds.sw[1]
	)

	//change map according to address input

	useEffect(() => {
		if (addressSelected) {
			setHouse([addressSelected.geo[1], addressSelected.geo[0]])
			setCenter([addressSelected.geo[1], addressSelected.geo[0]])
		}
	}, [addressSelected])

	useEffect(() => {
		serviceList && serviceList.length && setServiceState(serviceList)
	}, [serviceList, addressSelected])

	return (
		<Row>
			<Col>
				<Card className="bg-default shadow">
					<CardBody>
						<Map
							height={500}
							center={center}
							zoom={zoom}
							onBoundsChanged={({ center, zoom, bounds }) => {
								setCenter(center)
								setZoom(zoom)
								setBounds(bounds)
							}}
						>
							<Marker width={50} anchor={house} color="red" onClick={() => console.log('ici')} />
							{Array.from(serviceState).map((a) => {
								return (
									<Marker
										width={50}
										anchor={[Number(a.latitude), Number(a.longitude)]}
										color={relaisSelected.id === a.id ? 'yellow' : 'blue'}
										onClick={() => setRelaisSelected(a.id)}
									/>
								)
							})}
						</Map>
					</CardBody>
				</Card>
			</Col>
			<Col
				lg="4"
				style={{ position: 'absolute', height: '80vh', overflowY: 'scroll', overflowX: 'hidden', left: '60%' }}
				className="p-0 mt-5 bg-transparent"
			>
				<Card>
					<input className="form-control p-0" type="text" placeholder={addressSelected.input}></input>

					{serviceState && serviceState.length && serviceState.length > 0
						? Array.from(serviceState).map((a) => {
								return (
									<Card
										onClick={() => setRelaisSelected(a)}
										style={{ color: relaisSelected.id === a.id ? 'red' : 'white', borderRadius: '0' }}
										className="bg-default border-white p-1"
									>
										<CardTitle style={{ color: relaisSelected.id === a.id ? 'red' : 'white' }} tag="h5">
											{a.name} [ {a.carrier} ]
										</CardTitle>
										<CardBody tag="h6" className="p-0 ">
											<List type="unstyled" className="mt-0">
												<li className="text-white">
													{a.house_number} {a.street}{' '}
												</li>
												<li className="text-white">
													{a.postal_code} {a.city}{' '}
												</li>
												<li className="text-white mt-2">{a.open_tomorrow ? 'Ouvert demain' : 'Fermé demain'}</li>
												{relaisSelected.id === a.id &&
													['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((a, i) => (
														<li className="text-white">
															<strong>{a} </strong> {relaisSelected.formatted_opening_times[i].map((a) => a + ' ')}
														</li>
													))}
											</List>
										</CardBody>
									</Card>
								)
						  })
						: 'Aucun transporteur disponible'}
				</Card>
			</Col>
		</Row>
	)
}

export default FindRelaisMap
