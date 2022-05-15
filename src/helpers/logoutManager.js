import AuthActions from "../context/auth/AuthActions"
import urlConstant from "../constant/urlConstant"

const configLogout = () =>
{
    if (!window.logout)
    {
        window.logout = function ()
        {
            const event = new CustomEvent("logout")
            window.dispatchEvent(event)
        }
    }
}

const logout = ({sendLogoutReq = true}) =>
{
    if (sendLogoutReq) AuthActions.logout()
    else window.history.replaceState("for-history", "", urlConstant.home)
    setTimeout(window.logout, 0)
}

const setLogOut = ({callBack}) =>
{
    configLogout()

    function onLogout()
    {
        callBack()
    }

    window.addEventListener("logout", onLogout, {passive: true})
}

const logoutManager = {
    logout,
    setLogOut,
}

export default logoutManager