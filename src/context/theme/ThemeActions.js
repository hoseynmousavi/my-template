import toggleTheme from "../../helpers/toggleTheme"
import {TOGGLE_THEME} from "./ThemeTypes"
import themeManager from "../../helpers/themeManager"

const changeTheme = ({theme, dispatch}) =>
{
    toggleTheme(theme)
    dispatch({
        type: TOGGLE_THEME,
        payload: {theme},
    })
    themeManager.resetBarColor()
}

const ThemeActions = {
    changeTheme,
}

export default ThemeActions