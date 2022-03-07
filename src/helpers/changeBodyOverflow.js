function changeBodyOverflow(makeHide)
{
    if (makeHide)
    {
        document.getElementById("main-render").style.overflowY = "hidden"
        document.body.style.overflowY = "hidden"
    }
    else
    {
        document.getElementById("main-render").style.removeProperty("overflow-y")
        document.body.style.removeProperty("overflow-y")
    }
}

export default changeBodyOverflow