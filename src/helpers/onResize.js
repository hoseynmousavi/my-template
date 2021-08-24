function onResize({callback})
{
    window.addEventListener("resize", callback, {passive: true})
    return () => window.removeEventListener("resize", callback)
}

export default onResize