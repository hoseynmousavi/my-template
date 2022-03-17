import React, {useEffect, useState} from "react"
import blockIosSwipe from "../../helpers/blockIosSwipe"

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
            window.addEventListener("pushstate", setIndex, {passive: true})
            window.addEventListener("replacestate", setIndex, {passive: true})

            const pushState = window.history.pushState
            window.history.pushState = function (state)
            {
                if (window.location.pathname !== arguments[2] || arguments[0] === "for-history")
                {
                    pushState.apply(this, arguments)
                    const event = new Event("pushstate")
                    window.dispatchEvent(event)
                }
            }

            const replaceState = window.history.replaceState
            window.history.replaceState = function (state)
            {
                if (window.location.pathname !== arguments[2] || arguments[0] === "for-history")
                {
                    replaceState.apply(this, arguments)
                    const event = new Event("replacestate")
                    window.dispatchEvent(event)
                }
            }

            blockIosSwipe()
        }, [])

        const setIndex = () => setLocation(window.location.pathname)

        if (location) return <WrappedComponent location={location}/>
        else return null
    }
}

export default withRouter