import { Html, OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

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

const Preview3D = ({
	p_selected,
	width,
	length,
	prime,
	depth,
	ratio,
	hor,
	vert,
	invert,
	amax,
	setAmax,
	cwidth,
	setCwidth,
	thickness,
}) => {
	const e = thickness / 10 //epaisseur
	const p = prime //type (type du diffuseur) Prime number (p)
	const w = width //largeur
	const l = length //largeur

	const d = depth //profondeur
	setCwidth((w - (p + 1) * e) / p)

	const c = cwidth //largeur cellule
	const n = Math.floor(w / c) * Math.floor(l / c) // nb de cellules

	const n2 = Math.ceil(l / (c + e)) //type (nombre de rangées)

	const a = Array(n)
		.fill('')
		.map((a, i) => {
			const n = i % p
			const m = Math.floor(i / p)
			const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p
			return an
		})
	setAmax(Math.max(...a))
	const start = [-w / 2, -l / 2, d / 2]
	return (
		<>
			<Canvas camera={{ position: [0, 0, 80] }}>
				<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />

				<Text color="teal" scale={50} position={[0, -l + l / 4, d / 2]}>
					{width} cm
				</Text>
				<Text color="teal" scale={50} position={[-w + w / 4, 0, d / 2]} rotation={[0, 0, Math.PI / 2]}>
					{length} cm
				</Text>
				<Text color="teal" scale={50} position={[w - w / 4, 0, d / 2]} rotation={[0, Math.PI / 2, 0]}>
					{depth} cm
				</Text>
				{Array(p + 1) //peignes longs
					.fill('')
					.map((a, i) => (
						<Part args={[e, l, d]} position={[start[0] + (c + e) * i, 0, start[2]]} rotation={[0, 0, 0]} />
					))}
				{Array(n2) //peignes courts
					.fill('')
					.map((a, i) => (
						<Part args={[w, e, d]} position={[0, start[1] + e + (c + e) * i, start[2]]} rotation={[0, 0, 0]} />
					))}
				{Array(n) //cellules
					.fill('')
					.map((a, i) => {
						const n = i % p
						const m = Math.floor(i / p)
						const o = (Math.pow(n + hor, 2) + Math.pow(m + vert, 2)) % p
						const x = start[0] + c / 2 + n * (c + e)
						const z = start[1] + c / 2 + e + m * (c + e)
						const y = invert ? d - (o * d) / amax : (o * d) / amax
						return (
							<>
								<Cell
									args={[c, c, e]}
									position={[x, z, y === d ? y - e : y + e]}
									rotation={[0, 0, 0]}
									color={y === 0 ? 'red' : LightenDarkenColor('#012000', (y * 200) / d)}
								/>
								<Text
									color="black" // default
									anchorX="center" // default
									anchorY="middle" // default
									scale="100"
									position={[x, z, y + 1]}
								>
									{/* {y.toFixed(2)}
									 */}{' '}
									{ratio ? Math.round((y / d) * amax) : Math.round(y * 100) / 100}
								</Text>
							</>
						)
					})}
			</Canvas>
		</>
	)
}

export default Preview3D
