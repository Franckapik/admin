import { useState, useEffect } from 'react'

const useFetch = (url) => {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState()

	useEffect(() => {
		const fetchInfo = async () => {
			setLoading(true)
			try {
				const response = await fetch(url)
				const result = await response.json()
				setResponse(result)
			} catch (error) {
				setError(error)
			}
			setLoading(false)
		}

		url && fetchInfo()
	}, [url, setResponse])

	return { error, loading, response }
}

export default useFetch
