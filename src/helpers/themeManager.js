import getComputedStyleHelper from "./getComputedStyleHelper"

const configTheme = () =>
{
    if (!window.changeBarColor)
    {
        window.changeBarColor = function ({barColor})
        {
            const event = new CustomEvent("changeBarColor", {detail: {barColor}})
            window.dispatchEvent(event)
        }
    }
}

const changeBarColor = ({barColor}) =>
{
    window.changeBarColor({barColor})
}

const resetBarColor = () =>
{
    window.changeBarColor({barColor: getComputedStyleHelper("--first-background-color")})
}

const themeManager = {
    configTheme,
    changeBarColor,
    resetBarColor,
}

export default themeManager