import useGeo from 'hooks/useGeo'
import useToggle from 'hooks/useToggle'
import ModalBox from 'layouts/ModalBox'
import { useEffect, useState } from 'react'
import { Button, Col, FormGroup, InputGroup, InputGroupAddon, ListGroup, ListGroupItem, Row } from 'reactstrap'
import FindRelaisMap from './FindRelaisMap'

export const DeliveryInputs = ({ register, watch, setValue, nextId, unregister }) => {
	useEffect(() => {
		setValue('delivery.delivery_id', nextId)
		setValue('invoice.delivery_id', nextId)

		return () => {
			unregister('delivery')
			unregister('invoice.delivery_id')
		}
	}, [setValue, unregister, nextId])

	const [modalModif, setModif] = useToggle()

	const [relaisSelected, setRelaisSelected] = useState(0)
	const [addressSelected, setAddressSelected] = useState(0)

	const addressTyped = watch('delivery.recipient_address')

	const { response: addressList } = useGeo(addressTyped)

	useEffect(() => {
		relaisSelected && setValue('delivery.service_point', relaisSelected.id)
	}, [relaisSelected, setValue])

	return (
		<>
			<Row form>
				<Col md={6}></Col>
				<Col md={6}></Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="d_id">Identifiant livraison</label>
						<input className="form-control" type="text" placeholder={nextId} disabled></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="d-recipient">Nom complet</label>
						<input className="form-control" type="text" {...register('delivery.recipient', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>

			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="d_address">Adresse</label>
						<input
							className="form-control"
							type="text"
							{...register('delivery.recipient_address', { required: true })}
						></input>
						<ListGroup>
							{addressList &&
								addressList.map((a, i) => (
									<ListGroupItem
										key={a + i}
										color="info"
										onClick={() => {
											setValue('delivery.recipient_address', a.properties.label)
											setAddressSelected({ geo: a.geometry.coordinates })
										}}
										style={{ cursor: 'pointer' }}
									>
										{a.properties.label}
									</ListGroupItem>
								))}
						</ListGroup>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="d_postal">Code Postal</label>
						<input className="form-control" type="number" {...register('delivery.postal', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="d-city">Ville</label>
						<input className="form-control" type="text" {...register('delivery.city', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="d_country">Pays</label>
						<input className="form-control" type="text" {...register('delivery.country', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="d_type">Mode de livraison</label>
						<select className="form-control" type="date" {...register('delivery.type', { required: true })}>
							<option value="maison">Maison</option>
							<option value="pointrelais">Point relais</option>
							<option value="entreprise">Entreprise</option>
						</select>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={2}>
					{' '}
					<FormGroup>
						<label htmlFor="d_fdp">Frais de ports</label>
						<input className="form-control" type="number" {...register('delivery.fdp')}></input>
					</FormGroup>
				</Col>
				<Col md={4}>
					{' '}
					<FormGroup>
						<label htmlFor="d_service_point">
							Point relais (Id) <span style={{ fontSize: '12px', marginLeft: '10px' }}> 0 si n'existe pas</span>{' '}
						</label>
						<InputGroup>
							<input className="form-control" type="number" {...register('delivery.service_point')}></input>
							<InputGroupAddon addonType="append">
								<Button onClick={setModif}>Rechercher</Button>
							</InputGroupAddon>
						</InputGroup>
					</FormGroup>
				</Col>
				<Col md={3}>
					<FormGroup>
						<label htmlFor="d_carrier">Transporteur</label>
						<input className="form-control" type="text" {...register('delivery.carrier')}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="d_colis_nb">Nombre de colis</label>
						<input className="form-control" type="number" {...register('delivery.colis_nb')}></input>
					</FormGroup>
				</Col>
			</Row>

			<ModalBox title="Selectionner un relais" isOpen={modalModif} toggle={setModif} button1="Selectionner">
				<FindRelaisMap
					addressSelected={addressSelected}
					setRelaisSelected={setRelaisSelected}
					relaisSelected={relaisSelected}
				></FindRelaisMap>
			</ModalBox>
		</>
	)
}
