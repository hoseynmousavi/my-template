import Resize from "./Resize"
import {useRef} from "react"

function SetFullViewPort()
{
    const {clientWidth, clientHeight} = Resize()
    const timer = useRef(null)
    const viewport = +process.env.REACT_APP_DESKTOP_VIEWPORT.replace("px", "")

    clearTimeout(timer.current)
    timer.current = setTimeout(() =>
    {
        document.documentElement.style.setProperty(
            "--full-viewport",
            clientWidth > viewport ? viewport + "px" : "100vw",
        )
        document.documentElement.style.setProperty(
            "--full-height",
            clientHeight + "px",
        )
    }, 10)
}

export default SetFullViewPort