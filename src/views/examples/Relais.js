// core components
import FindRelaisInputs from 'components/Forms/FindRelaisInputs'
import FindRelaisMap from 'components/Forms/FindRelaisMap'
import Header from 'components/Headers/Header'
import useFetch from 'hooks/useFetch'
import useGeo from 'hooks/useGeo'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// reactstrap components
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	ListGroup,
	ListGroupItem,
	Row,
	Table,
} from 'reactstrap'

const Relais = () => {
	const { response: carriersList } = useFetch('/ship/carriers')

	const [relaisSelected, setRelaisSelected] = useState(0)
	const [addressSelected, setAddressSelected] = useState(0)

	const handleRegistration = (data) => {
		setAddressSelected(data.relais)
	}

	const handleError = (errors) => console.log('error', errors)

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({})

	const addressTyped = watch('relais.input')

	const { response: addressList } = useGeo(addressTyped)

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
										{addressList &&
											addressList.map((a, i) => (
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
				<FindRelaisMap
					addressSelected={addressSelected}
					setRelaisSelected={setRelaisSelected}
					relaisSelected={relaisSelected}
				></FindRelaisMap>
				<Row className="mt-5">
					<div className="col">
						<Card className="shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="mb-0">Relais selectionné</h3>
							</CardHeader>
							<CardBody>
								{relaisSelected ? (
									<Row>
										<Col>
											<ListGroup>
												<ListGroupItem>
													{relaisSelected.name} [{relaisSelected.id} ]
												</ListGroupItem>
												<ListGroupItem>
													{relaisSelected.house_number} {relaisSelected.street} {relaisSelected.postal_code}{' '}
													{relaisSelected.city}
												</ListGroupItem>
												<ListGroupItem>{relaisSelected.carrier}</ListGroupItem>
												<ListGroupItem>{relaisSelected.code}</ListGroupItem>
												<ListGroupItem>
													{relaisSelected.open_tomorrow ? 'Ouvert demain' : 'Fermé demain'}
												</ListGroupItem>
												<ListGroupItem>
													{relaisSelected.open_upcoming_week
														? 'Ouvert la semaine prochaine'
														: 'Fermé la semaine prochaine'}
												</ListGroupItem>
											</ListGroup>
										</Col>
										<Col>
											{' '}
											{relaisSelected &&
												['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((a, i) => (
													<ListGroupItem>
														<strong>{a} </strong> {relaisSelected.formatted_opening_times[i].map((a) => a + ' ')}
													</ListGroupItem>
												))}
										</Col>
									</Row>
								) : (
									'Aucun relais selectionné'
								)}
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	)
}

export default Relais
