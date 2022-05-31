import {forwardRef, useRef} from "react"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, draggable}, ref) =>
{
    const contRef = useRef(null)
    const loadedRef = useRef(false)

    function loaded()
    {
        loadedRef.current = true
        contRef.current.className = className
        ref.current.className = `${className} image-loading-main loaded`
    }

    return (
        <div className={`${className} ${loadedRef.current ? "" : "image-loading"}`} style={style} ref={contRef}>
            <img draggable={draggable} className={`${className} image-loading-main ${loadedRef.current ? "loaded" : ""}`} onLoad={loaded} style={style} ref={ref} src={src} alt={alt} loading={loading} onClick={onClick}/>
        </div>
    )
})

export default ImageLoading