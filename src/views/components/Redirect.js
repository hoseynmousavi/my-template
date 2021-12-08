import {memo, useEffect} from "react"

function Redirect({to, push})
{
    useEffect(() =>
    {
        if (push) window.history.pushState("", "", to)
        else window.history.replaceState("", "", to)
        // eslint-disable-next-line
    }, [])

    return null
}

export default memo(Redirect)