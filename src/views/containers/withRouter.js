import React, {useEffect} from "react"
import blockIosSwipe from "../../helpers/blockIosSwipe"

function withRouter(WrappedComponent)
{
    return function ()
    {
        useEffect(() =>
        {
            if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"

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

        return <WrappedComponent/>
    }
}

export default withRouter