import {forwardRef, useRef} from "react"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, draggable}, ref) =>
{
    const contRef = useRef(null)

    function loaded()
    {
        contRef.current.removeAttribute("class")
        contRef.current.style.display = "contents"
        ref.current.className = `image-loading-main loaded ${className}`
    }

    return (
        <div className={`${className} image-loading`} style={style} ref={contRef}>
            <img draggable={draggable} className="image-loading-main" onLoad={loaded} style={style} ref={ref} src={src} alt={alt} loading={loading} onClick={onClick}/>
        </div>
    )
})

export default ImageLoading