import toastManager from "../helpers/toastManager"
import errorConstant from "../constant/errorConstant"
import {FAIL_TOAST} from "../constant/toastTypes"
import refreshToken from "./refreshToken"

function requestErrorHandler({useRefreshToken, dontToast, err, callback})
{
    console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
    if (!useRefreshToken && err?.response?.status === 403 && err?.response?.data?.detail === "Forbidden")
    {
        return refreshToken()
            .then(callback)
            .catch(err =>
            {
                throw err
            })
    }
    else
    {
        if (!dontToast && err?.response?.status !== 404) toastManager.addToast({message: errorConstant(err), type: FAIL_TOAST})
        throw err
    }
}

export default requestErrorHandler