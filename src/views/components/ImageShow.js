import {memo, useRef, useState} from "react"
import popOnPopState from "../../helpers/popOnPopState"
import goBack from "../../helpers/goBack"
import onResize from "../../helpers/onResize"
import ImageLoading from "./ImageLoading"
import changeViewport from "../../helpers/changeViewport"
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
        popOnPopState({key: "Escape", callback: closeImage})
        changeViewport({zoomable: true})
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
        setTimeout(() =>
        {
            if (imgRef.current.naturalWidth / imgRef.current.naturalHeight > window.innerWidth / window.innerHeight)
            {
                setShowPicture({
                    top: (window.innerHeight - (window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight) / 2,
                    left: 0,
                    width: window.innerWidth,
                    height: (window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight,
                    borderRadius: "0",
                    boxShadow: "none",
                })
            }
            else
            {
                setShowPicture({
                    top: 0,
                    left: (window.innerWidth - (window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth) / 2,
                    width: (window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth,
                    height: window.innerHeight,
                    borderRadius: "0",
                    boxShadow: "none",
                })
            }
        }, 0)
    }

    function closeImage()
    {
        removeResize.current?.()
        changeViewport({zoomable: false})
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
                                 ...(showPicture.borderRadius ? {borderRadius: showPicture.borderRadius} : {}),
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