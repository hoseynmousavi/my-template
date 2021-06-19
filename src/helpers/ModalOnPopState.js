function ModalOnPopState({key, callback})
{
    function onPopState()
    {
        callback()
        document.body.style.overflowY = "auto"
        window.removeEventListener("popstate", onPopState)
        if (key) document.removeEventListener("keydown", onKeyDown)
    }

    function onKeyDown(e)
    {
        if (e.key === key) window.history.back()
    }

    window.history.pushState("for-history", "", window.location.href)
    document.body.style.overflowY = "hidden"
    window.addEventListener("popstate", onPopState, {passive: true})
    if (key) document.addEventListener("keydown", onKeyDown, {passive: true})
}

export default ModalOnPopState