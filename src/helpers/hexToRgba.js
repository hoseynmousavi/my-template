function hexToRgba(hex, a)
{
    try
    {
        hex = hex.replace(/ /g, "").replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${a})`
    }
    catch (_)
    {
        return hex
    }
}

export default hexToRgba