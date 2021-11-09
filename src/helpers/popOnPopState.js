import themeManager from "./themeManager"
import changeBodyOverflow from "./changeBodyOverflow"

function popOnPopState({key, callback, dontPush, dontChangeOverflow, statusBarColor})
{
    function onPopState()
    {
        callback()
        window.removeEventListener("popstate", onPopState)
        if (!dontChangeOverflow) changeBodyOverflow(false)
        if (statusBarColor) themeManager.resetBarColor()
        if (key) document.removeEventListener("keydown", onKeyDown)
    }

    function onKeyDown(e)
    {
        if (e.key === key) window.history.back()
    }

    if (!dontPush) window.history.pushState("for-history", "", window.location.href)
    window.addEventListener("popstate", onPopState, {passive: true})
    if (!dontChangeOverflow) changeBodyOverflow(true)
    if (statusBarColor) themeManager.changeBarColor({barColor: statusBarColor})
    if (key) document.addEventListener("keydown", onKeyDown, {passive: true})
}

export default popOnPopState