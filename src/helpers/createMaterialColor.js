import hexToRgba from "./hexToRgba"

function createMaterialColor({variable, alpha = "0.3"})
{
    return hexToRgba(getComputedStyle(document.documentElement).getPropertyValue(variable), alpha)
}

export default createMaterialColor