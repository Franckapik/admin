import { useEffect } from 'react'
import { FormGroup } from 'reactstrap'

export const DeliveryInputs = ({ register, errors, setValue, nextId, unregister }) => {
	useEffect(() => {
		setValue('delivery.delivery_id', nextId)
		setValue('invoice.delivery_id', nextId)

		return () => {
			unregister('delivery')
			unregister('invoice.delivery_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<FormGroup>
				<label htmlFor="d_id">Identifiant livraison</label>
				<input className="form-control" type="text" placeholder={nextId} disabled></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d-recipient">Nom (Particulier/Organisme)</label>
				<input className="form-control" type="text" {...register('delivery.recipient', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d-city">Ville</label>
				<input className="form-control" type="number" {...register('delivery.city', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d_postal">Code Postal</label>
				<input className="form-control" type="date" {...register('delivery.postal', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d-country">Pays</label>
				<input className="form-control" type="text" {...register('delivery.country', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d-type">Type</label>
				<select className="form-control" type="date" {...register('delivery.type', { required: true })}>
					<option value="pointrelais">Point relais</option>
					<option value="maison">Maison</option>
					<option value="entreprise">Entreprise</option>
				</select>
			</FormGroup>
		</>
	)
}
