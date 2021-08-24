import axios from "axios"
import requestErrorHandler from "./requestErrorHandler"
import urlMaker from "./urlMaker"

function sendFile({url, data, progress, dontToast})
{
    const token = localStorage.getItem("token")
    return axios(
        {
            method: "put",
            url: urlMaker({url}),
            headers: {"Authorization": token},
            onUploadProgress: p => progress && progress(Math.floor((p.loaded * 99) / p.total)),
            data,
        },
    )
        .then(res =>
        {
            if (progress) progress(100)
            return res.data
        })
        .catch(err => requestErrorHandler({dontToast, err, callback: () => sendFile(arguments[0])}))
}

export default sendFile