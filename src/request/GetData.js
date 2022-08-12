import {useEffect} from "react"
import toastConstant from "../constant/toastConstant"

function GetData({request, isLoading, cancelToken, doAfterGet, dependencies = []})
{
    useEffect(() =>
    {
        function sendRequest()
        {
            cancelToken?.current?.cancel?.(toastConstant.requestCancel)
            request()?.then?.(() => doAfterGet && setTimeout(doAfterGet, 10))
        }

        if (isLoading) sendRequest()
        else doAfterGet?.()

        window.addEventListener("online", sendRequest)

        return () =>
        {
            // eslint-disable-next-line
            cancelToken?.current?.cancel?.(toastConstant.requestCancel)
            window.removeEventListener("online", sendRequest)
        }
        // eslint-disable-next-line
    }, dependencies)
}

export default GetData