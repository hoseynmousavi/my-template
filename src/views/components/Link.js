import {memo} from "react"

function Link({children, to, href, className, onClick, replace, style, draggable = "false"})
{
    const go = e =>
    {
        if (to)
        {
            e.preventDefault()
            window.history[replace ? "replaceState" : "pushState"]("", "", to)
        }
        onClick?.(e)
    }

    return <a tabIndex="-1" href={to || href} style={style} draggable={draggable} onClick={go} className={className}>{children}</a>
}

export default memo(Link)