import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
	// This reference will give us direct access to the THREE.Mesh object
	const ref = useRef()
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current.rotation.x += 0.01))
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
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
			<meshStandardMaterial color={'red'} />
		</mesh>
	)
}

const Preview3D = ({ p_selected }) => {
	const e = 0.3 //epaisseur
	const N = 7 //type (nombre de rangées)
	const w = p_selected.width //largeur
	const d = p_selected.depth //profondeur
	const n = p_selected.cel_nb // nb de cellules
	const c = (w - (N + 1) * e) / N //largeur cellule

	return (
		<div style={{ width: '90vw', height: '90vh' }}>
			{console.log(p_selected)}
			<Canvas>
				<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{Array(N + 1)
					.fill('')
					.map((a, i) => (
						<Part args={[d, w, e]} position={[-w / 2 + (c + e) * i, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
					))}
				{Array(N + 1)
					.fill('')
					.map((a, i) => (
						<Part args={[d, w, e]} position={[0, w / 2 - (c + e) * i, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
					))}
				{Array(n)
					.fill('')
					.map((a, i) => {
						const x = -w / 2 + c / 2 + (i % N) * (c + e)
						const y = 0
						const z = -w / 2 + c / 2 + e + Math.floor(i / N) * (c + e)
						return <Cell args={[c, c, e]} position={[x, z, y]} rotation={[0, 0, 0]} />
					})}
			</Canvas>
		</div>
	)
}

export default Preview3D
