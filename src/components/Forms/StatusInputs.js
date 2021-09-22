import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from 'reactstrap'

export const StatusInputs = ({ register, errors, setValue, nextId, unregister }) => {
	useEffect(() => {
		setValue('status.status_id', nextId)
		setValue('invoice.status_id', nextId)

		return () => {
			unregister('status')
			unregister('invoice.status_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<FormGroup>
				<label htmlFor="s_id">Identifiant Statut</label>
				<input className="form-control" type="text" placeholder={nextId} disabled></input>
			</FormGroup>
			3
			<FormGroup>
				<label htmlFor="s_msg">Mesage de statut</label>
				<input className="form-control" type="date" {...register('status.msg', { required: true })}></input>
			</FormGroup>
		</>
	)
}
