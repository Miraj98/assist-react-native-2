const generateHeader = (method, authToken, data=null) => {
    if(method === 'GET') {
        return {
            method,
            headers: {
                'Authorization': 'Token ' + authToken
            }
        }
    } else {
        return {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: data
        }
    }
}

export const RequestHandler = async (
    requestUrl,
    authToken,
    HttpMethod,
    dispatch,
    onSuccessAction,
    onFailureAction,
    normalizer=null,
    data=null,
    meta={}
) => {
    const headers = generateHeader(HttpMethod, authToken, data)
    try {
        let response = await fetch(requestUrl, headers)
        console.log("Status code:", response.status)
        if(response.status === 201) dispatch({ ...onSuccessAction({...meta})})
        else {
            let response_object = await response.json()
            let _response_object = (normalizer === null) ? response_object : normalizer(response_object)
            dispatch({response: _response_object, ...onSuccessAction({...meta})})
        }
    } catch (err) {
        console.warn(err)
        dispatch({response: err, ...onFailureAction({ ...meta })})
    }
}