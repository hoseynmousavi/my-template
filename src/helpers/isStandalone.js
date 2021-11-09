function isStandalone()
{
    return ("standalone" in window.navigator) && window.navigator.standalone
}

export default isStandalone