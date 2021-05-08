import React, {PureComponent} from "react"
import {Helmet} from "react-helmet"

class ImageShow extends PureComponent
{
    onPopState = () =>
    {
        if (this.state?.showPicture)
        {
            this.closeImage()
            window.removeEventListener("popstate", this.onPopState)
            document.removeEventListener("keydown", this.onKeyDown)
        }
    }

    onKeyDown = e =>
    {
        if (e.key === "Escape") window.history.back()
    }

    openImage = e =>
    {
        let backed = false
        e.stopPropagation()
        this.setState({showPicture: true}, () =>
        {
            document.body.style.overflowY = "hidden"
            window.history.pushState("for-history", "", window.location.href)
            window.addEventListener("popstate", this.onPopState, {passive: true})
            document.addEventListener("keydown", this.onKeyDown, {passive: true})
            const rect = this.img.getBoundingClientRect()
            const copyImage = this.img.cloneNode(true)
            copyImage.onclick = () =>
            {
                if (!backed && document.body.clientWidth > 480)
                {
                    backed = true
                    window.history.back()
                }
            }
            copyImage.id = "picture"
            copyImage.style.margin = "0"
            copyImage.style.maxHeight = "initial"
            copyImage.style.maxWidth = "initial"
            copyImage.style.position = "fixed"
            copyImage.style.top = rect.top + "px"
            copyImage.style.height = rect.height + "px"
            copyImage.style.width = rect.width + "px"
            copyImage.style.left = rect.left + "px"
            copyImage.style.right = "auto"
            copyImage.style.zIndex = "11"
            const backGround = document.createElement("div")
            backGround.id = "backGround"
            backGround.className = "back-cont"
            backGround.onclick = () =>
            {
                if (!backed)
                {
                    backed = true
                    window.history.back()
                }
            }
            document.body.append(backGround)
            document.body.append(copyImage)
            this.img.style.opacity = "0"
            copyImage.style.transition = "all ease 0.2s"
            setTimeout(() =>
            {
                if (this.img.naturalWidth / this.img.naturalHeight > window.innerWidth / window.innerHeight)
                {
                    copyImage.style.top = (window.innerHeight - (window.innerWidth / this.img.naturalWidth) * this.img.naturalHeight) / 2 + "px"
                    copyImage.style.left = "0px"
                    copyImage.style.width = window.innerWidth + "px"
                    copyImage.style.height = (window.innerWidth / this.img.naturalWidth) * this.img.naturalHeight + "px"
                }
                else
                {
                    copyImage.style.top = "0px"
                    copyImage.style.left = (window.innerWidth - (window.innerHeight / this.img.naturalHeight) * this.img.naturalWidth) / 2 + "px"
                    copyImage.style.height = window.innerHeight + "px"
                    copyImage.style.width = (window.innerHeight / this.img.naturalHeight) * this.img.naturalWidth + "px"
                }
                copyImage.style.borderRadius = "0"
                copyImage.style.boxShadow = "none"

                this.timer = setTimeout(() =>
                {
                    copyImage.style.top = "0px"
                    copyImage.style.left = "0px"
                    copyImage.style.objectFit = "contain"
                    copyImage.style.height = "100%"
                    copyImage.style.width = "100%"
                }, 250)

            }, 25)
        })
    }

    closeImage = () =>
    {
        clearTimeout(this.timer)
        this.setState({showPicture: false}, () =>
        {
            document.body.style.overflowY = "auto"
            const rect = this.img.getBoundingClientRect()
            const copyImage = document.getElementById("picture")
            const backGround = document.getElementById("backGround")
            backGround.className = "back-cont hide"
            copyImage.style.top = rect.top + "px"
            copyImage.style.height = rect.height + "px"
            copyImage.style.width = rect.width + "px"
            copyImage.style.left = rect.left + "px"
            copyImage.style.borderRadius = this.img.style.borderRadius
            copyImage.style.boxShadow = this.img.style.boxShadow
            copyImage.style.right = "auto"
            setTimeout(() =>
            {
                this.img.style.opacity = "1"
                copyImage.remove()
                backGround.remove()
            }, 200)
        })
    }

    render()
    {
        const {showPicture} = this.state || {}
        const {className, src, alt, style} = this.props
        return (
            <React.Fragment>
                <img loading="lazy" style={style} className={className} src={src} alt={alt} ref={e => this.img = e} onClick={this.openImage}/>
                {
                    showPicture &&
                    <Helmet>
                        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>
                    </Helmet>
                }
            </React.Fragment>
        )
    }
}

export default ImageShow

// written by #Hoseyn