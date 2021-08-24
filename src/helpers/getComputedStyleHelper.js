function getComputedStyleHelper(variable)
{
    return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

export default getComputedStyleHelper