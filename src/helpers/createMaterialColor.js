import hexToRgba from "./hexToRgba"
import getComputedStyleHelper from "./getComputedStyleHelper"

function createMaterialColor({variable, alpha = 0.3})
{
    const color = getComputedStyleHelper(variable)
    if (color.includes("rgba"))
    {
        const split = color.split(",")
        const a = split[3]
        return color.replace(a, alpha + ")")
    }
    else return hexToRgba(color, alpha)
}

export default createMaterialColor