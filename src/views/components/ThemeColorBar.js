import {useEffect, useState} from "react"
import themeConstant from "../../constant/themeConstant"
import getComputedStyleHelper from "../../helpers/getComputedStyleHelper"
import GetTheme from "../../hooks/GetTheme"

function ThemeColorBar()
{
    const {isDark} = GetTheme()
    const [barColor, setBarColor] = useState(getComputedStyleHelper(themeConstant.defaultColor))

    useEffect(() =>
    {
        function onChangeBarColor(event)
        {
            const {barColor} = event.detail
            setBarColor(barColor)
        }

        window.addEventListener("changeBarColor", onChangeBarColor, {passive: true})
        return () => window.removeEventListener("changeBarColor", onChangeBarColor)
    }, [])

    return (
        <>
            <meta name="theme-color" content={barColor}/>
            <meta name="apple-mobile-web-app-status-bar-style" content={isDark ? "black" : "default"}/>
        </>
    )
}

export default ThemeColorBar