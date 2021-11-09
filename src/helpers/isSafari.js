function isSafari()
{
    const userAgent = window.navigator.userAgent.toLowerCase()
    return userAgent.includes("safari") && !userAgent.includes("chrome") && !userAgent.includes("chromium") && !userAgent.includes("crios")
}

export default isSafari