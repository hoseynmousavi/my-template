import Resize from "./Resize"
import {useRef} from "react"

function SetFullViewPort()
{
    const {clientHeight} = Resize()
    const timer = useRef(null)

    clearTimeout(timer.current)
    timer.current = setTimeout(() =>
    {
        document.documentElement.style.setProperty(
            "--full-height",
            clientHeight + "px",
        )
    }, 10)
}

export default SetFullViewPort