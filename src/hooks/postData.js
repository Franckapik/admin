const postData = (url, body) => {
    console.log("Sending ", body);
    return fetch(url, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify(body),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
        return error
    });  

  }

  export default postData ;