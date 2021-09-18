import { FormGroup } from 'reactstrap'

const TransactionInputs = ({ errors, register, setValue, nextId, unregister, nextInvoiceId }) => (
	<>
		<FormGroup>
			<label className="form-control-label" for="transaction_id">
				{' '}
				Transaction Id{' '}
			</label>
			<input className="form-control" type="text" {...register('transaction.user_id')} />
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_invoiceid">
				{' '}
				Invoice Id{' '}
			</label>
			<input className="form-control" type="text" {...register('transaction.invoice_id')} />
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_amount">
				{' '}
				Montant{' '}
			</label>
			<input className="form-control" type="number" {...register('transaction.amount', { required: true })} />
			{errors.name?.type === 'required' && 'Un montant est requis'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_status">
				{' '}
				Statut{' '}
			</label>
			<input className="form-control" type="text" {...register('transaction.status', { required: true })} />
			{errors.name?.type === 'required' && 'Un statut est requis'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_mode">
				{' '}
				Mode{' '}
			</label>
			<input className="form-control" type="text" {...register('transaction.mode', { required: true })} />
			{errors.name?.type === 'required' && 'Un mode est requis'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_datec">
				{' '}
				Date de transaction{' '}
			</label>
			<input className="form-control" type="date" {...register('transaction.date_created', { required: true })} />
			{errors.name?.type === 'required' && 'Une date est requise'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_datep">
				{' '}
				Date de paiement{' '}
			</label>
			<input className="form-control" type="date" {...register('transaction.date_payment', { required: true })} />
			{errors.name?.type === 'required' && 'Une date est requise'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_last">
				{' '}
				Derniers nombres{' '}
			</label>
			<input className="form-control" type="number" {...register('transaction.last_numbers')} />
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_brand">
				{' '}
				Marque de carte{' '}
			</label>
			<input className="form-control" type="text" {...register('transaction.card_brand')} />
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="t_desc">
				{' '}
				Description{' '}
			</label>
			<input className="form-control" type="text" {...register('transaction.desc')} />
		</FormGroup>
	</>
)

export default TransactionInputs
