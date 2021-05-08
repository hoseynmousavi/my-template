import React, {PureComponent} from "react"
import PropTypes from "prop-types"

class Material extends PureComponent
{
    onContext = () => document.body.clientWidth <= 480 && this.onTouchMove()

    handleButtonRelease = e =>
    {
        if (document.body.clientWidth > 480)
        {
            clearTimeout(this.buttonPressTimer)
            if (!this.ripple)
            {
                if (this.container)
                {
                    let target = this.container
                    let rect = target.getBoundingClientRect()
                    let ripple = document.createElement("span")
                    ripple.className = "ripple"
                    if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + "px"
                    target.appendChild(ripple)
                    let top = e.clientY - rect.top - ripple.offsetHeight / 2
                    let left = e.clientX - rect.left - ripple.offsetWidth / 2
                    ripple.style.top = top + "px"
                    ripple.style.left = left + "px"
                    setTimeout(() =>
                    {
                        try
                        {
                            target.removeChild(ripple)
                        }
                        catch (e)
                        {
                            console.log("material failed")
                        }
                    }, 600)
                }
            }
            else
            {
                this.ripple.style.opacity = "0"
                setTimeout(() =>
                {
                    if (this.ripple && this.container)
                    {
                        try
                        {
                            this.container.removeChild(this.ripple)
                            this.ripple = null
                        }
                        catch (e)
                        {
                            console.log("material failed")
                        }
                    }
                }, 500)
            }
        }
    }

    onMouseDown = e =>
    {
        if (document.body.clientWidth > 480)
        {
            this.buttonPressTimer = setTimeout(() =>
            {
                if (this.container)
                {
                    let target = this.container
                    let rect = target.getBoundingClientRect()
                    let ripple = document.createElement("span")
                    ripple.className = "rippleSlow"
                    if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
                    ripple.style.height = ripple.style.width = 1.3 * Math.max(rect.width, rect.height) + "px"
                    target.appendChild(ripple)
                    this.ripple = ripple
                    let top = e.clientY - rect.top - ripple.offsetHeight / 2
                    let left = e.clientX - rect.left - ripple.offsetWidth / 2
                    ripple.style.top = top + "px"
                    ripple.style.left = left + "px"
                }
            }, 300)
        }
    }

    handleLeave = () =>
    {
        if (document.body.clientWidth > 480)
        {
            clearTimeout(this.buttonPressTimer)
            if (this.ripple)
            {
                this.ripple.style.opacity = "0"
                this.ripple.style.transform = "scale(0)"
                setTimeout(() =>
                {
                    if (this.ripple && this.container)
                    {
                        try
                        {
                            this.container.removeChild(this.ripple)
                            this.ripple = null
                        }
                        catch (e)
                        {
                            console.log("material failed")
                        }
                    }
                }, 500)
            }
        }
    }

    onTouchStart = e =>
    {
        if (document.body.clientWidth <= 480)
        {
            this.pageX = e.touches[0].clientX
            this.pageY = e.touches[0].clientY
            this.buttonPressTimer = setTimeout(() =>
            {
                if (this.container)
                {
                    let target = this.container
                    let rect = target.getBoundingClientRect()
                    let ripple = document.createElement("span")
                    ripple.className = "rippleSlow"
                    if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
                    ripple.style.height = ripple.style.width = 1.3 * Math.max(rect.width, rect.height) + "px"
                    target.appendChild(ripple)
                    this.ripple = ripple
                    let top = this.pageY - rect.top - ripple.offsetHeight / 2
                    let left = this.pageX - rect.left - ripple.offsetWidth / 2
                    ripple.style.top = top + "px"
                    ripple.style.left = left + "px"
                }
            }, 300)
        }
    }

    onTouchMove = () =>
    {
        if (document.body.clientWidth <= 480)
        {
            clearTimeout(this.buttonPressTimer)
            if (this.ripple)
            {
                this.ripple.style.opacity = "0"
                this.ripple.style.transform = "scale(0)"
                setTimeout(() =>
                {
                    if (this.ripple && this.container)
                    {
                        try
                        {
                            this.container.removeChild(this.ripple)
                            this.ripple = null
                        }
                        catch (e)
                        {
                            console.log("material failed")
                        }
                    }
                }, 500)
            }
            this.pageX = null
            this.pageY = null
        }
    }

    onTouchEnd = () =>
    {
        if (document.body.clientWidth <= 480)
        {
            clearTimeout(this.buttonPressTimer)
            if (!this.ripple)
            {
                if (this.container && this.pageX !== null)
                {
                    let target = this.container
                    let rect = target.getBoundingClientRect()
                    let ripple = document.createElement("span")
                    ripple.className = "ripple"
                    if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + "px"
                    target.appendChild(ripple)
                    let top = this.pageY - rect.top - ripple.offsetHeight / 2
                    let left = this.pageX - rect.left - ripple.offsetWidth / 2
                    ripple.style.top = top + "px"
                    ripple.style.left = left + "px"
                    setTimeout(() =>
                    {
                        try
                        {
                            target.removeChild(ripple)
                        }
                        catch (e)
                        {
                            console.log("material failed")
                        }
                    }, 600)
                }
            }
            else
            {
                this.ripple.style.opacity = "0"
                setTimeout(() =>
                {
                    if (this.ripple && this.container)
                    {
                        try
                        {
                            this.container.removeChild(this.ripple)
                            this.ripple = null
                        }
                        catch (e)
                        {
                            console.log("material failed")
                        }
                    }
                }, 500)
            }
        }
    }

    render()
    {
        const {id, className, style, children, onClick} = this.props
        return <div id={id}
                    ref={e => this.container = e}
                    onContextMenu={this.onContext}
                    style={style ? style : {}}
                    className={className ? "material " + className : "material"}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.handleButtonRelease}
                    onMouseLeave={this.handleLeave}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    onClick={onClick}>
            {children}
        </div>
    }
}

Material.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    backgroundColor: PropTypes.string,
    style: PropTypes.object,
}

export default Material

// written by #Hoseyn
