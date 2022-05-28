import {useRef} from "react"
import goBack from "../helpers/goBack"

function ImageShowGesture()
{
    let gesture = useRef(false)
    let maxDiff = 600
    let posY = useRef(0)
    let translateY = useRef(0)
    let deltaY = useRef(0)
    const imageBackRef = useRef(null)
    const imageRef = useRef(null)

    function onTouchStart(e)
    {
        posY.current = e.touches?.[0].clientY || e.clientY
        gesture.current = true
        imageBackRef.current.style.transition = "opacity ease 0s"
        imageRef.current.style.transition = "all ease 0s"
        if (!e.touches?.[0].clientX)
        {
            document.addEventListener("mousemove", onTouchMove, {passive: true})
            document.addEventListener("mouseup", onTouchEnd, {passive: true})
        }
    }

    function onTouchMove(e)
    {
        if (gesture.current)
        {
            deltaY.current = posY.current - (e.touches?.[0].clientY || e.clientY)
            posY.current = e.touches?.[0].clientY || e.clientY
            translateY.current = translateY.current - deltaY.current <= maxDiff ? translateY.current - deltaY.current >= -maxDiff ? translateY.current - deltaY.current : -maxDiff : maxDiff
            imageRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`
            imageBackRef.current.style.opacity = `${Math.max(1 - Math.abs(translateY.current / maxDiff), 0.4)}`
        }
    }

    function onTouchEnd()
    {
        if (gesture.current)
        {
            if (deltaY.current > 3 || deltaY.current < -3 || Math.abs(translateY.current) > 200)
            {
                imageRef.current.style.top = (+imageRef.current.style.top.replace("px", "")) + translateY.current + "px"
                imageRef.current.style.transform = `translate3d(0, 0, 0)`
                translateY.current = 0

                setTimeout(() =>
                {
                    imageBackRef.current.style.transition = "opacity var(--first-transition)"
                    imageRef.current.style.transition = "all var(--first-transition)"
                    setTimeout(goBack, 10)
                }, 10)
            }
            else
            {
                imageBackRef.current.style.transition = "opacity var(--first-transition)"
                imageRef.current.style.transition = "all var(--first-transition)"
                translateY.current = 0
                imageRef.current.style.transform = `translate3d(0, ${translateY.current}, 0)`
                imageBackRef.current.style.opacity = `1`
            }
            gesture.current = false
            document.removeEventListener("mousemove", onTouchMove)
            document.removeEventListener("mouseup", onTouchEnd)
        }
    }


    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        imageRef,
        imageBackRef,
    }
}

export default ImageShowGesture