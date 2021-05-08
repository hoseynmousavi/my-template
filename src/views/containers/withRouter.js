import React, {useEffect, useState} from "react"

function withRouter(WrappedComponent)
{
    return function ()
    {
        const [location, setLocation] = useState(null)

        useEffect(() =>
        {
            setIndex()

            if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"

            window.addEventListener("popstate", setIndex, {passive: true})
            window.addEventListener("pushState", setIndex, {passive: true})
            window.addEventListener("replaceState", setIndex, {passive: true})

            const pushState = window.history.pushState
            window.history.pushState = function (state)
            {
                if (window.location.pathname !== arguments[2] || arguments[0] === "for-history")
                {
                    pushState.apply(this, arguments)
                    const event = new Event("pushState")
                    window.dispatchEvent(event)
                }
            }

            const replaceState = window.history.replaceState
            window.history.replaceState = function (state)
            {
                if (window.location.pathname !== arguments[2] || arguments[0] === "for-history")
                {
                    replaceState.apply(this, arguments)
                    const event = new Event("replaceState")
                    window.dispatchEvent(event)
                }
            }
        }, [])

        const setIndex = () => setLocation(window.location.pathname)

        if (location) return <WrappedComponent location={location}/>
        else return null
    }
}

export default withRouter
