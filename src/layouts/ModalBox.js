import { Button, Card, CardBody, CardHeader, Modal } from 'reactstrap'

const ModalBox = ({ title, isOpen, toggle, button1, button2, children }) => {
	return (
		<Modal className="modal-dialog-centered" isOpen={isOpen} toggle={toggle} size="xl">
			<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">
					Détails
				</h5>
				<button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
					<span aria-hidden={true}>×</span>
				</button>
			</div>
			<div className="modal-body">
				<Card className="shadow">
					<CardHeader className="bg-transparent">
						<h3 className="mb-0">{title}</h3>
					</CardHeader>
					<CardBody>{children}</CardBody>
				</Card>
			</div>
			<div className="modal-footer">
				{button1 ? (
					<Button color="secondary" data-dismiss="modal" type="button" onClick={toggle}>
						{button1}
					</Button>
				) : null}
				{button2 ? (
					<Button color="primary" type="button">
						{button2}
					</Button>
				) : null}
			</div>
		</Modal>
	)
}

export default ModalBox
