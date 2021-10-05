import React, { useEffect, useState } from 'react'
import useToggle from 'hooks/useToggle'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, CustomInput, ListGroup, ListGroupItem, Row, Table } from 'reactstrap'
import Preview3D from 'layouts/Preview3D'
import logo from '../assets/img/brand/logo_cercle.svg'

export const Product3D = ({ p_selected }) => {
	const [width, setWidth] = useState(50)
	const [length, setLength] = useState(50)
	const [depth, setDepth] = useState(10)
	const [prime, setPrime] = useState(7)
	const [ratio, setRatio] = useToggle()
	const [invert, setInvert] = useToggle()
	const [vert, setVert] = useState(0)
	const [hor, setHor] = useState(0)
	const [amax, setAmax] = useState(4)
	const [cwidth, setCwidth] = useState(31)
	const [thickness, setThickness] = useState(0.3)

	const fmin = Math.round((((344 / 2 / depth / 10) * amax) / prime) * 1000)
	const fmax = Math.round(344 / 2 / (cwidth / 100))

	useEffect(() => {
		setWidth(p_selected.width)
		setLength(p_selected.length)
		setDepth(p_selected.depth)
		setPrime(p_selected.prime_nb)
	}, [p_selected])

	return (
		<Row>
			<Col md={8}>
				<div
					style={{
						position: 'absolute',
						zIndex: '0',
						width: '100%',
						height: '100%',
						backgroundImage: `url(${logo})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: '50%',
						backgroundPosition: 'center',
						filter: 'opacity(5%)',
					}}
				></div>
				<Card className="m-2 p-2">
					<h3 style={{ textAlign: 'center' }}>
						D2N{prime}P{Math.round(depth)}L{Math.round(width)}
						{width !== length ? 'W' + Math.round(length) : null}P
					</h3>{' '}
				</Card>
				<Row style={{ height: '33em' }}>
					<div
						style={{
							position: 'absolute',
							width: '200px',
							top: '25%',
							zIndex: '1000',
							fontSize: '0.8em',
						}}
						onClick={() => console.log('hey')}
					>
						<ListGroup className="ml-2">
							<ListGroupItem className="border-0 bg-transparent">
								<i className="fas fa-ruler-combined mr-2"></i> {width} x {length} x {depth} cm
							</ListGroupItem>
							<ListGroupItem className="border-0 bg-transparent">
								<i className="fas fa-grip-lines-vertical mr-2"></i> {thickness} cm
							</ListGroupItem>
							<ListGroupItem className="border-0 bg-transparent">
								<i className="fas fa-square-full mr-2"></i> {cwidth.toFixed(2)} cm
							</ListGroupItem>
							<ListGroupItem className="border-0 bg-transparent" style={{ cursor: 'pointer' }}>
								<i className="fas fa-file-export mr-2 "></i> 2D report
							</ListGroupItem>
						</ListGroup>
					</div>
					<div
						style={{
							position: 'absolute',
							width: '100px',
							left: '75%',
							top: '80%',
							zIndex: '1000',
							cursor: 'pointer',
							fontSize: '0.8em',
						}}
						onClick={() => console.log('hey')}
					>
						<Table style={{ textAlign: 'center' }} className="table-borderless table-sm">
							<tbody>
								<tr>
									<td></td>
									<td onClick={() => setVert(vert - 1)}>
										<i className="fas fa-arrow-up p-0"></i>
									</td>
									<td></td>
								</tr>
								<tr>
									<td onClick={() => setHor(hor + 1)}>
										<i className="fas fa-arrow-left"></i>
									</td>
									<td>
										{vert} / {hor}
									</td>

									<td onClick={() => setHor(hor - 1)}>
										<i className="fas fa-arrow-right"></i>
									</td>
								</tr>
								<tr>
									<td></td>
									<td onClick={() => setVert(vert + 1)}>
										<i className="fas fa-arrow-down"></i>
									</td>
									<td></td>
								</tr>
							</tbody>
						</Table>
					</div>
					<Preview3D
						style={{ position: 'absolute' }}
						p_selected={p_selected}
						width={width}
						length={length}
						prime={prime}
						depth={depth}
						ratio={ratio}
						hor={hor}
						vert={vert}
						invert={invert}
						amax={amax}
						setAmax={setAmax}
						cwidth={cwidth}
						setCwidth={setCwidth}
						thickness={thickness}
						setThickness={setThickness}
					></Preview3D>
				</Row>
			</Col>

			<Col md={4}>
				<Card style={{ width: '100%', display: 'inline-block' }} className="m-2">
					<label className="mr-4">Type </label>

					<Button onClick={() => setPrime(7)}>7</Button>
					<Button onClick={() => setPrime(11)}>11</Button>
					<Button onClick={() => setPrime(13)}>13</Button>
					<Button onClick={() => setPrime(17)}>17</Button>
				</Card>
				<Card style={{ width: '100%' }} className="m-2">
					<label>Largeur</label>
					<input
						type="range"
						min="1"
						max="200"
						className="form-control"
						defaultValue={width}
						onChange={(e) => setWidth(e.target.value)}
					></input>
					<label>Longueur</label>
					<input
						type="range"
						min="1"
						max="200"
						className="form-control"
						defaultValue={length}
						onChange={(e) => setLength(e.target.value)}
					></input>
					<label>Profondeur</label>
					<input
						type="range"
						min="1"
						max="50"
						className="form-control"
						defaultValue={depth}
						onChange={(e) => setDepth(e.target.value)}
					></input>
					<CustomInput type="switch" id="ratio" name="rationame" label="Ratio/Hauteur" onClick={setRatio} />
					<CustomInput type="switch" id="inv" name="invname" label="Inverser" onClick={setInvert} />
				</Card>
				<Row>
					<Col md={12}>
						<Card style={{ width: '100%' }} className="m-2">
							<CardHeader>
								<CardTitle>Diffusion</CardTitle>
							</CardHeader>
							<CardBody tag="h3">
								{fmin} Hz -{fmax} Hz
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}
