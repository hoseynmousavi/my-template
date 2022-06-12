import {memo, useRef, useState} from "react"
import popOnPopState from "../../helpers/popOnPopState"
import goBack from "../../helpers/goBack"
import onResize from "../../helpers/onResize"
import ImageLoading from "./ImageLoading"
import {createPortal} from "react-dom"
import ImageShowGesture from "../../hooks/ImageShowGesture"
import {dontSwitchGesture} from "../../hooks/SwitchGesture"

function ImageShow({className, src, alt = "", loading = "lazy", draggable = "false", style = {}, zoomable, onClick})
{
    const [showPicture, setShowPicture] = useState(null)
    const imgRef = useRef(null)
    const removeResize = useRef(null)
    const {imageBackRef, imageRef, onTouchEnd, onTouchMove, onTouchStart} = ImageShowGesture()

    function openImage(e)
    {
        e.stopPropagation()
        popOnPopState({callback: closeImage})
        const {top, left, width, height} = imgRef.current.getBoundingClientRect()
        setShowPicture({top, left, width, height})
    }

    function openImageLoaded()
    {
        removeResize.current = onResize({callback: setImgPosition})
        imgRef.current.style.opacity = "0"
        setImgPosition()
    }

    function setImgPosition()
    {
        const ratio = 0.95
        setTimeout(() =>
        {
            if (imgRef.current.naturalWidth / imgRef.current.naturalHeight > window.innerWidth / window.innerHeight)
            {
                const fullWidth = window.innerWidth * ratio
                const fullHeight = ((window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight) * ratio
                setShowPicture({
                    top: (window.innerHeight - fullHeight) / 2,
                    left: ((1 - ratio) / 2) * window.innerWidth,
                    width: fullWidth,
                    height: fullHeight,
                    borderRadius: "50px",
                    boxShadow: "none",
                })
            }
            else
            {
                const fullWidth = ((window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth) * ratio
                const fullHeight = window.innerHeight * ratio
                setShowPicture({
                    top: ((1 - ratio) / 2) * window.innerHeight,
                    left: (window.innerWidth - fullWidth) / 2,
                    width: fullWidth,
                    height: fullHeight,
                    borderRadius: "50px",
                    boxShadow: "none",
                })
            }
        }, 0)
    }

    function closeImage()
    {
        removeResize.current?.()
        const {top, left, width, height} = imgRef.current.getBoundingClientRect()
        setShowPicture({isHiding: true, top, left, width, height, borderRadius: getComputedStyle(imgRef.current).getPropertyValue("border-radius"), boxShadow: getComputedStyle(imgRef.current).getPropertyValue("box-shadow")})
        setTimeout(() =>
        {
            imgRef.current.style.opacity = "1"
            setShowPicture(null)
        }, 370)
    }

    function onClose({isBackground})
    {
        return function ()
        {
            if (isBackground || window.innerWidth > 480) goBack()
        }
    }

    return (
        <>
            <ImageLoading key={src} className={className} style={style} loading={loading} ref={imgRef} src={src} alt={alt} draggable={draggable} onClick={zoomable ? openImage : onClick ? onClick : undefined}/>
            {
                showPicture &&
                createPortal(
                    <>
                        <div ref={imageBackRef} className={`back-cont ${dontSwitchGesture} ${showPicture.isHiding ? "hide" : ""}`} onClick={onClose({isBackground: true})}/>
                        <img className={`${className} image-show-picture`}
                             ref={imageRef}
                             onTouchStart={onTouchStart}
                             onTouchMove={onTouchMove}
                             onTouchEnd={onTouchEnd}
                             style={{
                                 ...style,
                                 transition: "all var(--first-transition)",
                                 top: showPicture.top + "px",
                                 left: showPicture.left + "px",
                                 width: showPicture.width + "px",
                                 height: showPicture.height + "px",
                                 borderRadius: showPicture.borderRadius,
                                 ...(showPicture.boxShadow ? {boxShadow: showPicture.boxShadow} : {}),
                             }}
                             src={src}
                             alt={alt}
                             onLoad={openImageLoaded}
                             draggable="false"
                             loading="easter"
                             onClick={onClose({isBackground: false})}
                        />
                    </>
                    , document.body)
            }
        </>
    )
}

export default memo(ImageShow)