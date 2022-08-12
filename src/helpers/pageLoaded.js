function pageLoaded()
{
    return (document.readyState === "complete" || document.readyState === "loaded")
}

export default pageLoaded