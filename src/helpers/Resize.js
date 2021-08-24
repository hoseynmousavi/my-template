import {useState, useEffect} from "react"

function Resize()
{
    const [clientWidth, setClientWidth] = useState(window.innerWidth)
    const [clientHeight, setClientHeight] = useState(window.innerHeight)

    useEffect(() =>
    {
        function onResize()
        {
            setClientWidth(window.innerWidth)
            setClientHeight(window.innerHeight)
        }

        window.addEventListener("resize", onResize, {passive: true})
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return ({clientWidth, clientHeight})
}

export default Resize