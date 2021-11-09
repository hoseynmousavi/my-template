import {useContext, useEffect, useState} from "react"
import getComputedStyleHelper from "../../helpers/getComputedStyleHelper"
import {ThemeContext} from "../../context/theme/ThemeReducer"

function ThemeColorBar()
{
    const {state: {theme}} = useContext(ThemeContext)
    const [barColor, setBarColor] = useState(getComputedStyleHelper("--first-background-color"))

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
            <meta name="apple-mobile-web-app-status-bar-style" content={theme === "dark" ? "black" : "default"}/>
        </>
    )
}

export default ThemeColorBar