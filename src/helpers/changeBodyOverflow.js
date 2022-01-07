import isIos from "./isIos"
import isStandalone from "./isStandalone"
import checkViewPort from "./checkViewPort"

function changeBodyOverflow(makeHide)
{
    if (makeHide)
    {
        if (isIos() && isStandalone()) lockScroll()
        else if (checkViewPort()) document.getElementById("root").style.overflowY = "hidden"
        else document.body.style.overflowY = "hidden"
    }
    else
    {
        if (isIos() && isStandalone()) unlockScroll()
        else if (checkViewPort()) document.getElementById("root").style.removeProperty("overflow-y")
        else document.body.style.removeProperty("overflow-y")
    }
}

function unlockScroll()
{
    document.body.style.removeProperty("position")
    document.body.style.removeProperty("top")
    document.body.style.removeProperty("left")
    document.body.style.removeProperty("right")
}

function lockScroll()
{
    document.body.style.position = "fixed"
    document.body.style.top = "0"
    document.body.style.left = "0"
    document.body.style.right = "0"
}

export default changeBodyOverflow