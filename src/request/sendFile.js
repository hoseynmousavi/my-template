import axios from "axios"
import urlMaker from "./urlMaker"
import errorHandler from "./errorHandler"

function sendFile({dontToast, url, data, progress})
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
        .catch(err => errorHandler({dontToast, err, callback: () => sendFile(arguments[0])}))
}

export default sendFile