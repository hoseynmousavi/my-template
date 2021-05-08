import React from "react"
import * as PropTypes from "prop-types"

function Link(props)
{
    const {children, to, className, onClick, replace} = props

    const go = e =>
    {
        e.preventDefault()
        window.history[replace ? "replaceState" : "pushState"]("", "", to)
        onClick && onClick(e)
    }

    return <a href={to} onClick={go} className={className}>{children}</a>
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
}

export default Link
