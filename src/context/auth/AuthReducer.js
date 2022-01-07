import {createContext, useEffect, useReducer} from "react"
import {LOGOUT, SET_USER} from "./AuthTypes"
import AuthActions from "./AuthActions"
import logoutManager from "../../helpers/logoutManager"

export const AuthContext = createContext(null)

const initialState = null

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case SET_USER:
        {
            const {user: userArg} = action.payload
            const user = {...state, ...userArg}
            saveUserToDisk(user)
            return user
        }
        case LOGOUT:
        {
            saveUserToDisk(null)
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function saveUserToDisk(user)
{
    if (user)
    {
        if (user.token)
        {
            localStorage.setItem("token", user.token)
            delete user.token
        }
        if (user.refreshToken)
        {
            localStorage.setItem("refreshToken", user.refreshToken)
            delete user.refreshToken
        }
        localStorage.setItem("user", JSON.stringify(user))
    }
    else
    {
        const theme = localStorage.getItem("theme")
        localStorage.clear()
        if (theme) localStorage.setItem("theme", theme)
    }
}

function AuthProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        const refreshToken = localStorage.getItem("refreshToken")
        if (user && token && refreshToken)
        {
            try
            {
                AuthActions.setUser({user: JSON.parse(user), dispatch})
            }
            catch (e)
            {
                console.log("err parsing user:", e.message)
            }
            AuthActions.getUser({dispatch})
        }

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider