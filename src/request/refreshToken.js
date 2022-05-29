import AuthActions from "../context/auth/AuthActions"
import toastConstant from "../constant/toastConstant"
import {FAIL_TOAST} from "../constant/toastTypes"
import refreshTokenManager from "./refreshTokenManager"
import toastManager from "../helpers/toastManager"
import logoutManager from "../helpers/logoutManager"

let isRefreshing = false

function refreshToken()
{
    return new Promise((resolve, reject) =>
    {
        if (!isRefreshing)
        {
            isRefreshing = true
            AuthActions.getTokenWithRefreshToken()
                .then(status =>
                {
                    if (status)
                    {
                        isRefreshing = false
                        refreshTokenManager.refreshToken({message: "OK"})
                        resolve()
                    }
                    else
                    {
                        isRefreshing = false
                        toastManager.addToast({message: toastConstant.tokenExpired, type: FAIL_TOAST})
                        logoutManager.logout({sendLogoutReq: false})
                        refreshTokenManager.refreshToken({message: "NOK"})
                        reject()
                    }
                })
        }
        else
        {
            function onRefreshEvent(event)
            {
                const {message} = event.detail
                if (message === "OK") resolve()
                else
                {
                    toastManager.addToast({message: toastConstant.tokenExpired, type: FAIL_TOAST})
                    logoutManager.logout({sendLogoutReq: false})
                    reject()
                }
                window.removeEventListener("refreshToken", onRefreshEvent)
            }

            window.addEventListener("refreshToken", onRefreshEvent, {passive: true})
        }
    })
}

export default refreshToken