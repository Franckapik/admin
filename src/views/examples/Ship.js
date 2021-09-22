// core components
import Header from 'components/Headers/Header'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
// reactstrap components
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Container,
	FormGroup,
	ListGroup,
	ListGroupItem,
	Row,
	Table,
} from 'reactstrap'
import { Map, Marker } from 'pigeon-maps'
import { useForm } from 'react-hook-form'
import { Button, Form } from 'reactstrap'
import FindRelaisInputs from 'components/Forms/FindRelaisInputs'
// import
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import Autocomplete from 'layouts/Autocomplete'

const Ship = () => {
	const [center, setCenter] = useState([48.27, -1.669])
	const [house, setHouse] = useState([48.27, -1.669])
	const [zoom, setZoom] = useState(12)
	const [relaisSelected, setRelaisSelected] = useState(0)
	const [bounds, setBounds] = useState({
		ne: [48.2742846248208, -1.655197352409374],
		sw: [48.26574358366042, -1.6828455629348866],
	})

	const { response: carriersList } = useFetch('/ship/carriers')

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

	const [service, setService] = useState([])

	const [addressListState, setAddress] = useState([])

	useEffect(() => {
		serviceList && serviceList.length && setService(serviceList)
		console.log(serviceList)
	}, [serviceList])

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({})

	const input = watch('relais.input')

	const { response: addressList } = useFetch(input ? 'https://api-adresse.data.gouv.fr/search/?q=' + input : false)

	useEffect(() => {
		addressList && addressList.features && setAddress(addressList.features.map((a, i) => a))
		console.log(addressListState)
	}, [addressList])

	// setup
	const provider = new OpenStreetMapProvider()

	// search
	/* 	provider.search({ query: input }).then((res) => console.log(res)) */

	const handleRegistration = (data) => {
		setHouse([data.relais.geo[1], data.relais.geo[0]])
		setCenter([data.relais.geo[1], data.relais.geo[0]])
	}

	const handleError = (errors) => console.log('error', errors)

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
												<tr key={'carrier' + i}>
													<td>{a}</td>
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
						<Card className="shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="mb-0">Rechercher un relais</h3>
							</CardHeader>
							<CardBody>
								<Form onSubmit={handleSubmit(handleRegistration, handleError)}>
									<FormGroup>
										<label className="form-control-label" htmlFor="r_address">
											{' '}
											Adresse recherchée{' '}
										</label>
										<input className="form-control" type="text" {...register('relais.input')} />
										{errors.name?.type === 'required' && 'Une adresse est requise'}
										{errors.name?.type === 'maxLength' && "L'adresse est trop longue"}
									</FormGroup>
									<ListGroup>
										{addressListState.map((a, i) => (
											<ListGroupItem
												key={a + i}
												color="info"
												onClick={() => {
													setValue('relais.input', a.properties.label)
													setValue('relais.address', a.properties.name)
													setValue('relais.postal', a.properties.citycode)
													setValue('relais.city', a.properties.city)
													setValue('relais.geo', a.geometry.coordinates)
												}}
												style={{ cursor: 'pointer' }}
											>
												{a.properties.label}
											</ListGroupItem>
										))}
									</ListGroup>
									<FindRelaisInputs errors={errors} register={register}></FindRelaisInputs>

									<Button>Rechercher</Button>
								</Form>
							</CardBody>
						</Card>
					</div>
				</Row>
				<Row className="mt-5">
					<Col>
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Carte des points relais disponibles</h3>
							</CardHeader>
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
									{Array.from(service).map((a, i) => {
										return (
											<Marker
												width={50}
												anchor={[Number(a.latitude), Number(a.longitude)]}
												color={relaisSelected === a.id ? 'yellow' : 'blue'}
												onClick={() => setRelaisSelected(a.id)}
											/>
										)
									})}
								</Map>
							</CardBody>
						</Card>
					</Col>
					<Col lg="5">
						<Card style={{ overflowY: 'scroll', overflowX: 'hidden', height: '600px' }} className="bg-default shadow">
							{service && service.length && service.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<tbody>
										{Array.from(service).map((a, i) => {
											return (
												<tr>
													<td onClick={() => setRelaisSelected(a.id)}>
														<Card
															className="bg-transparent"
															style={{ color: relaisSelected === a.id ? 'red' : 'white' }}
														>
															<CardTitle>{a.name}</CardTitle>
															<CardBody className="p-0">
																<ListGroup className="mt-0">
																	<ListGroupItem className="bg-transparent text-white">
																		{a.house_number} {a.street}{' '}
																	</ListGroupItem>
																	<ListGroupItem className="bg-transparent text-white">
																		{a.postal_code} {a.city}{' '}
																	</ListGroupItem>
																</ListGroup>
															</CardBody>
														</Card>
													</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								'Aucun transporteur disponible'
							)}
						</Card>
					</Col>
				</Row>
				<Row className="mt-5">
					<div className="col">
						<Card className="shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="mb-0">Relais selectionné</h3>
							</CardHeader>
							<CardBody>
								<Form onSubmit={handleSubmit(handleRegistration, handleError)}>
									<FormGroup>
										<label className="form-control-label" htmlFor="r_address">
											{' '}
											Adresse recherchée{' '}
										</label>
										<input className="form-control" type="text" {...register('relais.input')} />
										{errors.name?.type === 'required' && 'Une adresse est requise'}
										{errors.name?.type === 'maxLength' && "L'adresse est trop longue"}
									</FormGroup>
									<ListGroup>
										{addressListState.map((a, i) => (
											<ListGroupItem
												key={a + i}
												color="info"
												onClick={() => {
													setValue('relais.input', a.properties.label)
													setValue('relais.address', a.properties.name)
													setValue('relais.postal', a.properties.citycode)
													setValue('relais.city', a.properties.city)
													setValue('relais.geo', a.geometry.coordinates)
												}}
												style={{ cursor: 'pointer' }}
											>
												{a.properties.label}
											</ListGroupItem>
										))}
									</ListGroup>
									<FindRelaisInputs errors={errors} register={register}></FindRelaisInputs>

									<Button>Rechercher</Button>
								</Form>
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
