import Resize from "./Resize"
import {useRef} from "react"
import isIos from "./isIos"
import isStandalone from "./isStandalone"
import isSafari from "./isSafari"

function SetFullViewPort()
{
    const {clientHeight} = Resize()
    const timer = useRef(null)

    clearTimeout(timer.current)
    timer.current = setTimeout(() =>
    {
        document.documentElement.style.setProperty(
            "--full-height",
            isIos() && isSafari() && !isStandalone() ?
                "100vh"
                :
                clientHeight + "px",
        )
    }, 10)
}

export default SetFullViewPort