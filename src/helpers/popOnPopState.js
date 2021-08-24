import themeManager from "./themeManager"

function popOnPopState({key, callback, dontChangeOverflow, statusBarColor})
{
    function onPopState()
    {
        callback()
        window.removeEventListener("popstate", onPopState)
        if (!dontChangeOverflow) document.body.style.overflowY = "auto"
        if (statusBarColor) themeManager.resetBarColor()
        if (key) document.removeEventListener("keydown", onKeyDown)
    }

    function onKeyDown(e)
    {
        if (e.key === key) window.history.back()
    }

    window.history.pushState("for-history", "", window.location.href)
    window.addEventListener("popstate", onPopState, {passive: true})
    if (!dontChangeOverflow) document.body.style.overflowY = "hidden"
    if (statusBarColor) themeManager.changeBarColor({barColor: statusBarColor})
    if (key) document.addEventListener("keydown", onKeyDown, {passive: true})
}

export default popOnPopState