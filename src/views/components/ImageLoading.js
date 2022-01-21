import {forwardRef, useEffect, useRef, useState} from "react"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, draggable}, ref) =>
{
    const img = useRef(new Image())
    img.current.src = src
    const [isLoaded, setIsLoaded] = useState(img.current.complete)

    useEffect(() =>
    {
        if (src && !img.current.complete) img.current.onload = () => setIsLoaded(true)
        // eslint-disable-next-line
    }, [])

    if (!isLoaded) return <div className={`${className} image-loading-not-loaded`} style={style} ref={ref}/>
    else return <img draggable={draggable} className={`${className} image-loading-loaded`} style={style} ref={ref} src={src} alt={alt} loading={loading} onClick={onClick}/>
})

export default ImageLoading