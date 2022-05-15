import {useContext, useMemo} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import Route from "./Route"
import Redirect from "./Redirect"
import urlConstant from "../../constant/urlConstant"

function PrivateRoute({ifNotLogin, dontChange, path, render, ...props})
{
    const {state: user} = useContext(AuthContext)

    return useMemo(() =>
    {
        if (ifNotLogin)
        {
            if (!user) return <Route path={path} render={render} {...props}/>
            else return <Redirect to={urlConstant.home}/>
        }
        else
        {
            if (user) return <Route path={path} render={render} {...props}/>
            else
            {
                const {pathname} = window.location
                return <Redirect to={`${urlConstant.login}${pathname !== "/" ? `?returnTo=${pathname}` : ""}`}/>
            }
        }
        // eslint-disable-next-line
    }, dontChange ? [] : [user])
}

export default PrivateRoute