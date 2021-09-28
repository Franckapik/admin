import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Col, FormGroup, Row } from 'reactstrap'

export const StatusInputs = ({ nextId }) => {
	const { register, setValue, unregister } = useFormContext()

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
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="s_id">Identifiant Statut</label>
						<input className="form-control" type="text" placeholder={nextId}></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="s_msg">Message de statut</label>
						<input className="form-control" type="text" {...register('status.status_msg', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}
