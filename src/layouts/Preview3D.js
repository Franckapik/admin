import { OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup } from 'reactstrap'

const LightenDarkenColor = (col, amt) => {
	var usePound = false

	if (col[0] == '#') {
		col = col.slice(1)
		usePound = true
	}

	var num = parseInt(col, 16)

	var r = (num >> 16) + amt

	if (r > 255) r = 255
	else if (r < 0) r = 0

	var b = ((num >> 8) & 0x00ff) + amt

	if (b > 255) b = 255
	else if (b < 0) b = 0

	var g = (num & 0x0000ff) + amt

	if (g > 255) g = 255
	else if (g < 0) g = 0

	return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

const Part = (props) => {
	// This reference will give us direct access to the THREE.Mesh object
	const ref = useRef()
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={props.args} /> {/*x z y */}
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}
const Cell = (props) => {
	// This reference will give us direct access to the THREE.Mesh object
	const ref = useRef()
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={props.args} /> {/*x z y */}
			<meshStandardMaterial color={props.color} />
		</mesh>
	)
}

const Preview3D = ({ p_selected }) => {
	const [width, setWidth] = useState(50)
	const [length, setLength] = useState(50)
	const [depth, setDepth] = useState(10)
	const [prime, setPrime] = useState(7)

	const e = 0.3 //epaisseur
	const p = prime //type (type du diffuseur) Prime number (p)
	const w = width //largeur
	const l = length //largeur

	const d = depth //profondeur
	const c = (w - (p + 1) * e) / p //largeur cellule
	const n = Math.floor(w / c) * Math.floor(l / c) // nb de cellules

	const N2 = Math.ceil(l / (c + e)) //type (nombre de rangées)

	const a = Array(n)
		.fill('')
		.map((a, i) => {
			const n = i % p
			const m = Math.floor(i / p)
			const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p
			return an
		})
	const amax = Math.max(...a)
	const start = [-w / 2, -l / 2, d / 2]
	return (
		<div style={{ width: '90vw', height: '90vh' }}>
			{console.log(p_selected)}
			<Canvas>
				<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<mesh>
					<sphereBufferGeometry></sphereBufferGeometry>
				</mesh>
				{Array(p + 1) //largeur
					.fill('')
					.map((a, i) => (
						<Part args={[e, l, d]} position={[start[0] + (c + e) * i, 0, start[2]]} rotation={[0, 0, 0]} />
					))}
				{Array(N2) //longueur
					.fill('')
					.map((a, i) => (
						<Part args={[w, e, d]} position={[0, start[1] + e + (c + e) * i, start[2]]} rotation={[0, 0, 0]} />
					))}
				{Array(n) //cellules
					.fill('')
					.map((a, i) => {
						const n = i % p
						const m = Math.floor(i / p)
						const x = start[0] + c / 2 + n * (c + e)
						const z = start[1] + c / 2 + e + m * (c + e)
						const y = (((Math.pow(n, 2) + Math.pow(m, 2)) % p) * d) / amax
						console.log((y * 1000) / d)
						return (
							<>
								<Cell
									args={[c, c, e]}
									position={[x, z, y === d ? y - e : y + e]}
									rotation={[0, 0, 0]}
									color={LightenDarkenColor('#012000', (y * 200) / d)}
								/>
								<Text
									color="black" // default
									anchorX="center" // default
									anchorY="middle" // default
									scale="10"
									position={[x, z, y + 1]}
								>
									{/* {y.toFixed(2)}
									 */}{' '}
									{Math.round((y / d) * amax)}
								</Text>
							</>
						)
					})}
			</Canvas>
			<Form>
				<FormGroup>
					<Button onClick={() => setPrime(7)}>7</Button>
					<Button onClick={() => setPrime(11)}>11</Button>
					<Button onClick={() => setPrime(13)}>13</Button>
					<Button onClick={() => setPrime(17)}>17</Button>
					<input type="range" min="1" max="200" className="form-control" onChange={(e) => setWidth(e.target.value)}></input>
					{width} {c.toFixed(2)}
					<input type="range" min="1" max="200" className="form-control" onChange={(e) => setLength(e.target.value)}></input>
					{length}
					<input type="range" min="1" max="50" className="form-control" onChange={(e) => setDepth(e.target.value)}></input>
					{depth}
				</FormGroup>
			</Form>
		</div>
	)
}

export default Preview3D
