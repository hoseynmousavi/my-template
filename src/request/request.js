import axios from "axios"
import requestErrorHandler from "./requestErrorHandler"
import urlMaker from "./urlMaker"

function get({url, param = "", dontToast, dontCache, useRefreshToken})
{
    const token = useRefreshToken ? localStorage.getItem("refreshToken") : localStorage.getItem("token")
    return axios.get(
        urlMaker({url, param}),
        {headers: token && {[useRefreshToken ? "x-refresh-token" : "Authorization"]: token}},
    )
        .then(res =>
        {
            if (!dontCache) localStorage.setItem(url + "/" + param, JSON.stringify(res.data))
            return res.data
        })
        .catch(err =>
        {
            if (err.message === "Network Error" && !dontCache)
            {
                const cacheData = localStorage.getItem(url + "/" + param)
                if (cacheData) return JSON.parse(cacheData)
                else return requestErrorHandler({dontToast, err, callback: () => get(arguments[0])})
            }
            else return requestErrorHandler({dontToast, err, callback: () => get(arguments[0])})
        })
}

function post({url, data, param, progress, cancel, dontToast})
{
    const token = localStorage.getItem("token")
    let source
    if (cancel)
    {
        const CancelToken = axios.CancelToken
        source = CancelToken.source()
        cancel(source)
    }
    return axios.post(
        urlMaker({url, param}),
        data,
        {
            cancelToken: source ? source.token : undefined,
            headers: token && {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res => res.data)
        .catch(err => requestErrorHandler({dontToast, err, callback: () => post(arguments[0])}))
}

function put({url, data, param, progress, dontToast})
{
    const token = localStorage.getItem("token")
    return axios.put(
        urlMaker({url, param}),
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res => res.data)
        .catch(err => requestErrorHandler({dontToast, err, callback: () => put(arguments[0])}))
}

function patch({url, data, param, progress, dontToast})
{
    const token = localStorage.getItem("token")
    return axios.patch(
        urlMaker({url, param}),
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res => res.data)
        .catch(err => requestErrorHandler({dontToast, err, callback: () => patch(arguments[0])}))
}

function del({url, data, param, dontToast})
{
    const token = localStorage.getItem("token")
    return axios.delete(
        urlMaker({url, param}),
        {
            headers: {"Authorization": token},
            data,
        },
    )
        .then(res => res.data)
        .catch(err => requestErrorHandler({dontToast, err, callback: () => del(arguments[0])}))
}

const request = {
    get, post, put, patch, del,
}

export default request