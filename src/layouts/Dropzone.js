import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, Container } from 'reactstrap'

function Dropzone(props) {
	const onDrop = useCallback((acceptedFiles) => {}, [])

	const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: '.csv',
		onDrop,
	})

	const acceptedFileItems = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	))

	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
			<ul>
				{errors.map((e) => (
					<li key={e.code}>{e.message}</li>
				))}
			</ul>
		</li>
	))

	return (
		<Container>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<Card className="bg-teal" style={{ height: '100px', textAlign: 'center' }}>
						Import du fichier csv{' '}
					</Card>
				) : (
					<Card className="bg-lighter" style={{ height: '100px', textAlign: 'center' }}>
						Déposer le fichier CSV ici{' '}
					</Card>
				)}
			</div>
			<Card className="p-3">
				{acceptedFileItems.length ? (
					<div>
						<h4>Fichiers acceptés</h4>
						<ul>{acceptedFileItems}</ul>
					</div>
				) : null}
				{fileRejectionItems.length ? (
					<div>
						<h4>Fichiers rejetés</h4>
						<ul>{fileRejectionItems}</ul>
					</div>
				) : null}
			</Card>
		</Container>
	)
}

export default Dropzone
