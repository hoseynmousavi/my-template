import Resize from "./Resize"

function SetFullViewPort()
{
    const {clientWidth, clientHeight} = Resize()
    const viewport = +process.env.REACT_APP_DESKTOP_VIEWPORT.replace("px", "")

    document.documentElement.style.setProperty(
        "--full-viewport",
        clientWidth > viewport ? viewport + "px" : "100vw",
    )
    document.documentElement.style.setProperty(
        "--full-height",
        clientHeight + "px",
    )
}

export default SetFullViewPort