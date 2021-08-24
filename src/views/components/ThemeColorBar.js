import {useEffect, useState} from "react"
import themeManager from "../../helpers/themeManager"
import getComputedStyleHelper from "../../helpers/getComputedStyleHelper"

function ThemeColorBar()
{
    const [barColor, setBarColor] = useState(getComputedStyleHelper("--first-background-color"))

    useEffect(() =>
    {
        themeManager.configTheme()

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
            <meta name="apple-mobile-web-app-status-bar-style" content={barColor}/>
        </>
    )
}

export default ThemeColorBar