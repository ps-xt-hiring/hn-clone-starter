const apiHelper = (method, url, body, header) => {
    // Create our request constructor with all the parameters we need
    var request = new Request(url, {
        method: method, 
        body: body, 
        headers: header
    });

    return fetch(request)
    .then((response) => {
      return response.json();
    });
}

export default apiHelper;