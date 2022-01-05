import isIos from "./isIos"

function checkViewPort()
{
    return window.innerWidth > +process.env.REACT_APP_DESKTOP_VIEWPORT.replace("px", "") || isIos()
}

export default checkViewPort