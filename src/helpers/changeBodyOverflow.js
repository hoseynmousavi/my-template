import checkViewPort from "./checkViewPort"

let isHide = false

function changeBodyOverflow(makeHide)
{
    if (makeHide)
    {
        if (!isHide)
        {
            isHide = true
            if (checkViewPort()) document.getElementById("root").style.overflowY = "hidden"
            else document.body.style.overflowY = "hidden"
        }
    }
    else
    {
        if (isHide)
        {
            isHide = false
            if (checkViewPort()) document.getElementById("root").style.removeProperty("overflow-y")
            else document.body.style.removeProperty("overflow-y")
        }
    }
}

export default changeBodyOverflow