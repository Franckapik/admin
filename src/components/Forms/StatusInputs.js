import { useEffect } from 'react'
import { Col, FormGroup, Row } from 'reactstrap'

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
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="s_id">Identifiant Statut</label>
						<input className="form-control" type="text" placeholder={nextId} disabled></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="s_msg">Message de statut</label>
						<input className="form-control" type="text" {...register('status.msg', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}
