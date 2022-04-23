import {createContext, useEffect, useReducer} from "react"
import {TOGGLE_THEME} from "./ThemeTypes"
import ThemeActions from "./ThemeActions"
import loadColors from "../../helpers/loadColors"
import themeManager from "../../helpers/themeManager"
import setCssVariables from "../../helpers/setCssVariables"

export const ThemeContext = createContext(null)

const initialState = {
    theme: "light",
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case TOGGLE_THEME:
        {
            const {theme, save} = action.payload
            if (save) localStorage.setItem("theme", theme === "dark" ? "dark" : "light")
            return {
                ...state,
                theme,
            }
        }
        default:
        {
            throw new Error()
        }
    }
}

function ThemeProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        if (process.env.NODE_ENV === "development") loadColors()
        setCssVariables()
        themeManager.configTheme()
        const theme = localStorage.getItem("theme")
        if (theme === "dark" || (!theme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches))
        {
            ThemeActions.changeTheme({theme: "dark", save: false, dispatch})
        }
    }, [])

    return (
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider