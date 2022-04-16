import {useEffect} from "react"

function ScrollY({condition, updateParams = []})
{
    useEffect(() =>
    {
        const root = document.getElementById("main-render")

        function onScroll()
        {
            condition({scrollTop: root.scrollTop, scrollHeight: root.scrollHeight})
        }

        root.addEventListener("scroll", onScroll, {passive: true})
        return () => root.removeEventListener("scroll", onScroll)
        // eslint-disable-next-line
    }, updateParams)
}

export default ScrollY