import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from 'reactstrap'

export const TransporterInputs = ({ register, errors, setValue, nextId, unregister }) => {
	useEffect(() => {
		setValue('transporter.transporter_id', nextId)
		setValue('invoice.transporter_id', nextId)

		return () => {
			unregister('transporter')
			unregister('invoice.transporter_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<FormGroup>
				<label for="t_id">Identifiant transporter</label>
				<input className="form-control" type="text" placeholder={nextId} disabled></input>
			</FormGroup>
			<FormGroup>
				<label for="t_coldate">Date de départ livraison</label>
				<input className="form-control" type="date" {...register('transporter.col_date', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="t_fdp">Frais de ports</label>
				<input className="form-control" type="number" {...register('transporter.fdp', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="t_deldate">Date de livraison estimée</label>
				<input className="form-control" type="date" {...register('transporter.del_date', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="t_serv">Service de transport</label>
				<input className="form-control" type="text" {...register('transporter.service', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="t_order">Date d'achat de livraison</label>
				<input className="form-control" type="date" {...register('transporter.order_date', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="t_ref">Nom de livraison</label>
				<input className="form-control" type="text" {...register('transporter.reference', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="t_nbcol">Nombre de colis</label>
				<input className="form-control" type="number" {...register('transporter.colis_nb', { required: true })}></input>
			</FormGroup>
		</>
	)
}
