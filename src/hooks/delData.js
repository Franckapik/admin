const delData = (url) => {
	console.log(url)
	return fetch(url, {
		credentials: 'include',
		method: 'delete',
	})
		.then((response) => {
			console.log(response)
			return response
		})
		.catch((error) => {
			return error
		})
}

export default delData
