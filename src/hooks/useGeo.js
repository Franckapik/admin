import { useState, useEffect } from 'react'

const useGeo = (addressTyped) => {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState()

	useEffect(() => {
		const fetchInfo = async () => {
			setLoading(true)
			try {
				const response = await fetch(addressTyped ? 'https://api-adresse.data.gouv.fr/search/?q=' + addressTyped : false)
				const result = await response.json()
				const addressList = result.features.map((a) => a)
				setResponse(addressList)
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		}

		fetchInfo()
	}, [addressTyped, setResponse])

	return { error, loading, response }
}

export default useGeo
