import { useEffect } from 'react'
import { Col, FormGroup, Row } from 'reactstrap'

export const ParcelInputs = ({ register, errors, setValue, nextId, unregister }) => {
	return (
		<>
			<Row form>
				<Col md={2}>
					{' '}
					<FormGroup>
						<label htmlFor="p_house_number">Numero de rue</label>
						<input className="form-control" type="number" {...register('parcel.house_number', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="p_address">Adresse</label>
						<input className="form-control" type="text" {...register('parcel.address', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={2}>
					{' '}
					<FormGroup>
						<label htmlFor="p_postal">Code postal</label>
						<input className="form-control" type="number" {...register('parcel.postal_code', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={2}>
					<FormGroup>
						<label htmlFor="p_city">Ville</label>
						<input className="form-control" type="text" {...register('parcel.city', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={4}>
					{' '}
					<FormGroup>
						<label htmlFor="p-country">Pays</label>
						<input className="form-control" type="text" {...register('parcel.country', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={4}>
					{' '}
					<FormGroup>
						<label htmlFor="p_mail">Email</label>
						<input className="form-control" type="email" {...register('parcel.email', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={4}>
					{' '}
					<FormGroup>
						<label htmlFor="p_phone">Téléphone</label>
						<input className="form-control" type="number" {...register('parcel.telephone', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_weight">Poids</label>
						<input className="form-control" type="number" {...register('parcel.weight', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_length">Longueur</label>
						<input className="form-control" type="number" {...register('parcel.length', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_width">Largeur</label>
						<input className="form-control" type="number" {...register('parcel.width', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_height">Hauteur</label>
						<input className="form-control" type="number" {...register('parcel.height', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_order">Numero de commande</label>
						<input className="form-control" type="text" {...register('parcel.order_number')}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_assured">
							Valeur assurée <span style={{ fontSize: '10px' }}>(multiple de 100)</span>{' '}
						</label>
						<input className="form-control" type="number" {...register('parcel.insured_value')}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p_amount">Valeur totale de commande</label>
						<input className="form-control" type="number" {...register('parcel.total_order_value')}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="p-qty">Quantité de colis</label>
						<input className="form-control" type="number" {...register('parcel.quantity', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="p-qty">Point Relais (id)</label>
						<input className="form-control" type="number" {...register('parcel.to_service_point')}></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="p_ship_method">Transporteur</label>
						<select
							className="form-control"
							type="date"
							{...register('parcel.shipping_method_checkout_name', { required: true })}
						>
							<option value="pointrelais">Point relais</option>
							<option value="maison">Maison</option>
							<option value="entreprise">Entreprise</option>
						</select>
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}
