import { useEffect } from 'react'
import { Col, FormGroup, Row } from 'reactstrap'

const TransactionInputs = ({ errors, register, setValue, nextId, unregister, nextInvoiceId }) => {
	useEffect(() => {
		setValue('discount.discount_id', nextId)
		setValue('invoice.discount_id', nextId)

		return () => {
			unregister('discount')
			unregister('invoice.discount_id')
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
						<input
							className="form-control"
							type="text"
							{...register('transaction.user_id')}
							placeholder={nextId}
							disabled
						/>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="t_invoiceid">
							{' '}
							Invoice Id{' '}
						</label>
						<input
							className="form-control"
							type="text"
							{...register('transaction.invoice_id')}
							placeholder={nextId}
							disabled
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={4}>
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
				<Col md={4}>
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
				<Col md={4}>
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
						<input className="form-control" type="text" {...register('transaction.desc')} />
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}

export default TransactionInputs
