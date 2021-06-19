import hexToRgba from "./hexToRgba"

function createMaterialColor({variable, alpha})
{
    return hexToRgba(getComputedStyle(document.documentElement).getPropertyValue(variable), alpha)
}

export default createMaterialColor