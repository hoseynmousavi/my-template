import isIos from "./isIos"
import isSafari from "./isSafari"

function blockIosSwipe()
{
    if (isIos() && isSafari())
    {
        document.getElementById("index-temp").ontouchstart = e =>
        {
            if (!(e.pageX === undefined || (e.pageX && e.pageX > 20 && e.pageX < window.innerWidth - 10))) e.preventDefault()
        }
    }
}

export default blockIosSwipe