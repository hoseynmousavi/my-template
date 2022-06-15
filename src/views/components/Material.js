import {useRef, memo} from "react"

function Material({children, isDiv, backgroundColor, id, className, style, onClick, onDisableClick, disable})
{
    const container = useRef(null)
    const buttonPressTimer = useRef(null)
    let pageX, pageY, ripple

    function appendRipple({x, y}, isSlow)
    {
        if (container?.current && x && y && !disable)
        {
            let target = container.current
            let rect = target.getBoundingClientRect()
            let tempRipple = document.createElement("span")
            tempRipple.className = isSlow ? "ripple-slow" : "ripple"
            if (backgroundColor) tempRipple.style.backgroundColor = backgroundColor
            tempRipple.style.height = tempRipple.style.width = 1.3 * Math.max(rect.width, rect.height) + "px"
            target.appendChild(tempRipple)
            tempRipple.style.top = y - rect.top - tempRipple.offsetHeight / 2 + "px"
            tempRipple.style.left = x - rect.left - tempRipple.offsetWidth / 2 + "px"
            if (isSlow) ripple = tempRipple
            pageX = null
            pageY = null

            if (!isSlow) setTimeout(() =>
            {
                try
                {
                    target && tempRipple && target.removeChild(tempRipple)
                }
                catch (e)
                {
                }
            }, 600)
        }
    }

    function removeRipple(isLeave)
    {
        if (ripple)
        {
            ripple.style.opacity = "0"
            if (isLeave) ripple.style.transform = "scale(0)"
            setTimeout(() =>
            {
                if (container?.current && ripple)
                {
                    container.current.removeChild(ripple)
                    ripple = null
                }
            }, 500)
        }
    }

    function onContext()
    {
        window.innerWidth <= 480 && onTouchMove()
    }

    function handleButtonRelease(e)
    {
        if (window.innerWidth > 480)
        {
            clearTimeout(buttonPressTimer.current)
            if (!ripple) appendRipple({x: e.clientX, y: e.clientY}, false)
            else removeRipple(false)
        }
    }

    function onMouseDown(e)
    {
        if (window.innerWidth > 480) buttonPressTimer.current = setTimeout(() => appendRipple({x: e.clientX, y: e.clientY}, true), 300)
    }

    function handleLeave()
    {
        if (window.innerWidth > 480)
        {
            clearTimeout(buttonPressTimer.current)
            removeRipple(true)
        }
    }

    function onTouchStart(e)
    {
        if (window.innerWidth <= 480)
        {
            pageX = e.touches[0].clientX
            pageY = e.touches[0].clientY
            buttonPressTimer.current = setTimeout(() => appendRipple({x: pageX, y: pageY}, true), 300)
        }
    }

    function onTouchMove()
    {
        if (window.innerWidth <= 480)
        {
            clearTimeout(buttonPressTimer.current)
            removeRipple(true)
            pageX = null
            pageY = null
        }
    }

    function onTouchEnd()
    {
        if (window.innerWidth <= 480)
        {
            clearTimeout(buttonPressTimer.current)
            if (!ripple) appendRipple({x: pageX, y: pageY}, false)
            else removeRipple(false)
        }
    }

    function onClickClick(e)
    {
        if (disable)
        {
            if (onDisableClick) onDisableClick()
        }
        else
        {
            if (onClick) onClick(e)
        }
    }

    const Tag = isDiv ? "div" : "button"
    return (
        <Tag id={id}
             ref={container}
             onContextMenu={onContext}
             style={style}
             className={`material ${className}`}
             onMouseDown={onMouseDown}
             onMouseUp={handleButtonRelease}
             onMouseLeave={handleLeave}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             onClick={onClickClick}>
            {children}
        </Tag>
    )
}

export default memo(Material)