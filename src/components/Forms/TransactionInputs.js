import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Col, FormGroup, Row } from 'reactstrap'

const TransactionInputs = ({ nextId }) => {
	const {
		register,
		formState: { errors },
		setValue,
		unregister,
	} = useFormContext()

	useEffect(() => {
		setValue('transaction.transaction_id', nextId)
		setValue('invoice.transaction_id', nextId)

		return () => {
			unregister('transaction')
			unregister('invoice.transaction_id')
		}
	}, [setValue, unregister, nextId])
	return (
		<>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="transaction_id">
							{' '}
							Transaction Id{' '}
						</label>
						<input className="form-control" type="text" {...register('transaction.transaction_id')} placeholder={nextId} />
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_amount">
							{' '}
							Montant{' '}
						</label>
						<input className="form-control" type="number" {...register('transaction.amount', { required: true })} />
						{errors.name?.type === 'required' && 'Un montant est requis'}
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_status">
							{' '}
							Statut{' '}
						</label>
						<input className="form-control" type="text" {...register('transaction.status', { required: true })} />
						{errors.name?.type === 'required' && 'Un statut est requis'}
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_mode">
							{' '}
							Mode{' '}
						</label>
						<input className="form-control" type="text" {...register('transaction.mode', { required: true })} />
						{errors.name?.type === 'required' && 'Un mode est requis'}
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_datec">
							{' '}
							Date de transaction{' '}
						</label>
						<input className="form-control" type="date" {...register('transaction.date_created', { required: true })} />
						{errors.name?.type === 'required' && 'Une date est requise'}
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_datep">
							{' '}
							Date de paiement{' '}
						</label>
						<input className="form-control" type="date" {...register('transaction.date_payment', { required: true })} />
						{errors.name?.type === 'required' && 'Une date est requise'}
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_last">
							{' '}
							Derniers nombres{' '}
						</label>
						<input className="form-control" type="number" {...register('transaction.last_numbers')} />
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_brand">
							{' '}
							Marque de carte{' '}
						</label>
						<input className="form-control" type="text" {...register('transaction.card_brand')} />
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_desc">
							{' '}
							Description{' '}
						</label>
						<input className="form-control" type="text" {...register('transaction.desc', { maxLength: '100' })} />
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}

export default TransactionInputs
