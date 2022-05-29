import hexToRgba from "./hexToRgba"
import getComputedStyleHelper from "./getComputedStyleHelper"

function createMaterialColor({color, variable, alpha = 0.3})
{
    const input = color || getComputedStyleHelper(variable)
    if (input.includes("rgba"))
    {
        const split = input.split(",")
        const a = split[3]
        return input.replace(a, alpha + ")")
    }
    else return hexToRgba(input, alpha)
}

export default createMaterialColor