function parseQueryString()
{
    let paramsObj = {}
    if (window.location.search)
    {
        const params = new URLSearchParams(window.location.search)
        for (let p of params)
        {
            paramsObj[p[0]] = p[1]
        }
    }
    return paramsObj
}

export default parseQueryString