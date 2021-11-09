function goBack({fallback = "/", delta = -1} = {})
{
    if (window.history?.length >= 1 - delta) window.history.go(delta)
    else window.history.replaceState("", "", fallback)
}

export default goBack