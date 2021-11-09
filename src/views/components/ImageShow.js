import {Helmet} from "react-helmet"
import {useRef, useState, memo} from "react"
import popOnPopState from "../../helpers/popOnPopState"
import goBack from "../../helpers/goBack"
import onResize from "../../helpers/onResize"
import ImageLoading from "./ImageLoading"

function ImageShow({className, src, alt = "", loading = "lazy", draggable = "false", style, zoomable, onClick})
{
    const [showPicture, setShowPicture] = useState(false)
    const imgRef = useRef(null)
    const removeResize = useRef(null)

    function openImage(e)
    {
        e.stopPropagation()
        popOnPopState({key: "Escape", callback: closeImage})
        setShowPicture(true)
        const copyImage = imgRef.current.cloneNode(true)
        removeResize.current = onResize({callback: () => setImgPosition(copyImage)})
        const rect = imgRef.current.getBoundingClientRect()
        copyImage.id = "picture"
        copyImage.style.animation = "none"
        copyImage.style.margin = "0"
        copyImage.style.maxHeight = "initial"
        copyImage.style.maxWidth = "initial"
        copyImage.style.position = "fixed"
        copyImage.style.zIndex = "var(--modal-z-index)"
        copyImage.style.top = rect.top + "px"
        copyImage.style.height = rect.height + "px"
        copyImage.style.width = rect.width + "px"
        copyImage.style.left = rect.left + "px"
        copyImage.style.right = "auto"
        copyImage.style.transition = "all ease 0.2s"
        const backGround = document.createElement("div")
        backGround.style.cursor = "pointer"
        backGround.id = "backGround"
        backGround.className = "back-cont"
        let backed = false
        copyImage.onclick = () =>
        {
            if (!backed && window.innerWidth > 480)
            {
                backed = true
                goBack()
            }
        }
        backGround.onclick = () =>
        {
            if (!backed)
            {
                backed = true
                goBack()
            }
        }
        document.body.append(backGround)
        document.body.append(copyImage)
        imgRef.current.style.opacity = "0"
        setImgPosition(copyImage)
    }

    function setImgPosition(copyImage)
    {
        setTimeout(() =>
        {
            copyImage.style.borderRadius = "0"
            copyImage.style.boxShadow = "none"
            if (imgRef.current.naturalWidth / imgRef.current.naturalHeight > window.innerWidth / window.innerHeight)
            {
                copyImage.style.top = (window.innerHeight - (window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight) / 2 + "px"
                copyImage.style.left = "0px"
                copyImage.style.width = window.innerWidth + "px"
                copyImage.style.height = (window.innerWidth / imgRef.current.naturalWidth) * imgRef.current.naturalHeight + "px"
            }
            else
            {
                copyImage.style.top = "0px"
                copyImage.style.left = (window.innerWidth - (window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth) / 2 + "px"
                copyImage.style.height = window.innerHeight + "px"
                copyImage.style.width = (window.innerHeight / imgRef.current.naturalHeight) * imgRef.current.naturalWidth + "px"
            }
        }, 0)
    }

    function closeImage()
    {
        removeResize.current && removeResize.current()
        setShowPicture(false)
        const rect = imgRef.current.getBoundingClientRect()
        const copyImage = document.getElementById("picture")
        const backGround = document.getElementById("backGround")
        backGround.className = "back-cont hide"
        copyImage.style.top = rect.top + "px"
        copyImage.style.height = rect.height + "px"
        copyImage.style.width = rect.width + "px"
        copyImage.style.left = rect.left + "px"
        copyImage.style.borderRadius = getComputedStyle(imgRef.current).getPropertyValue("border-radius")
        copyImage.style.boxShadow = getComputedStyle(imgRef.current).getPropertyValue("box-shadow")
        copyImage.style.right = "auto"
        setTimeout(() =>
        {
            imgRef.current.style.opacity = "1"
            copyImage.remove()
            backGround.remove()
        }, 200)
    }

    return (
        <>
            <ImageLoading key={src} className={className} style={style} loading={loading} ref={imgRef} src={src} alt={alt} draggable={draggable} onClick={zoomable ? openImage : onClick ? onClick : undefined}/>
            {
                showPicture &&
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"/>
                </Helmet>
            }
        </>
    )
}

export default memo(ImageShow)

// written by #Hoseyn