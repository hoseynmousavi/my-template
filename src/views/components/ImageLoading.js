import {forwardRef, useEffect, useState} from "react"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, draggable}, ref) =>
{
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() =>
    {
        if (src)
        {
            const img = new Image()
            img.src = src
            if (img.complete) setIsLoaded(true)
            else img.onload = () => setIsLoaded(true)
        }
        // eslint-disable-next-line
    }, [])

    if (!isLoaded) return <div className={`${className} image-loading-not-loaded`} style={style} ref={ref}/>
    else return <img draggable={draggable} className={`${className} image-loading-loaded`} style={style} ref={ref} src={src} alt={alt} loading={loading} onClick={onClick}/>
})

export default ImageLoading