function changeViewport({zoomable})
{
    const viewport = document.querySelector("meta[name=viewport]")
    if (zoomable) viewport.setAttribute("content", "width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes")
    else viewport.setAttribute("content", "width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no")
}

export default changeViewport