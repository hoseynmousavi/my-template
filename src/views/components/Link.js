import {memo} from "react"

function Link({children, to, className, onClick, replace, style})
{
    const go = e =>
    {
        e.preventDefault()
        if (to) window.history[replace ? "replaceState" : "pushState"]("", "", to)
        onClick && onClick(e)
    }

    return <a tabIndex="-1" href={to} style={style} onClick={go} className={className}>{children}</a>
}

export default memo(Link)