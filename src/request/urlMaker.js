function urlMaker({url, param = ""})
{
    return process.env.REACT_APP_REST_URL + "/" + url + "/" + param
}

export default urlMaker