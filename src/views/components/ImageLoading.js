import {forwardRef, useLayoutEffect, useState} from "react"
import ImageLoaderWorker from "../../workers/imageLoaderWorker"
import firstView from "../../helpers/firstView"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, draggable}, ref) =>
{
    const [isLoaded, setIsLoaded] = useState("")

    useLayoutEffect(() =>
    {
        let onMessage
        if (loading === "lazy") firstView({ref, callback: () => onMessage = loadImage()})
        else onMessage = loadImage()

        return () => onMessage && ImageLoaderWorker.removeEventListener("message", onMessage)
        // eslint-disable-next-line
    }, [])

    function loadImage()
    {
        function onMessage(event)
        {
            const {imageURL, blob} = event.data
            if (src === imageURL)
            {
                const objectURL = URL.createObjectURL(blob)
                setIsLoaded(objectURL)
                if (ref?.current) ref.current.onload = () => URL.revokeObjectURL(objectURL)
            }
        }

        if (src)
        {
            if (src.includes("http") && window.Worker)
            {
                ImageLoaderWorker.postMessage(src)
                ImageLoaderWorker.addEventListener("message", onMessage)
                return onMessage
            }
            else
            {
                const img = new Image()
                img.src = src
                if (!img.complete) img.onload = () => setIsLoaded(src)
                else if (img.complete && !isLoaded) setIsLoaded(src)
            }
        }
    }

    if (!isLoaded) return <div className={`${className} image-loading-not-loaded`} style={style} ref={ref}/>
    else return <img draggable={draggable} className={`${className} image-loading-loaded`} style={style} ref={ref} src={isLoaded} alt={alt} loading={loading} onClick={onClick}/>
})

export default ImageLoading