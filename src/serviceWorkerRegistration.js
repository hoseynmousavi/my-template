const registerSW = () =>
{
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator)
    {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
        if (publicUrl.origin !== window.location.origin) return
        window.addEventListener("load", () =>
        {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
            navigator.serviceWorker.register(swUrl)
                .then(registration =>
                {
                    registration.update().then(() => console.log("going for update")).catch(() => console.log("can't going for update"))
                    registration.onupdatefound = () =>
                    {
                        const waitingServiceWorker = registration.waiting
                        if (waitingServiceWorker)
                        {
                            waitingServiceWorker.postMessage({type: "SKIP_WAITING"})

                            waitingServiceWorker.onstatechange = () =>
                            {
                                if (waitingServiceWorker.state === "installed") console.log("on waiting, new content is available.")
                                else console.log("on waiting:", waitingServiceWorker.state)
                            }
                        }
                        else console.log("waitingServiceWorker is null")

                        const installingWorker = registration.installing
                        if (installingWorker)
                        {
                            installingWorker.onstatechange = () =>
                            {
                                if (installingWorker.state === "installed")
                                {
                                    if (navigator.serviceWorker.controller) console.log("on installing, new content is available.")
                                    else console.log("content is cached for offline use.")
                                }
                                else console.log("on installing: ", installingWorker.state)
                            }
                        }
                        else console.log("installingWorker is null.")
                    }
                })
                .catch(error => console.error("Error during service worker registration:", error))

            navigator.serviceWorker.addEventListener("controllerchange", () =>
                console.log("on controllerchange, new content is available."),
            )
        }, {passive: true})
    }
}

export default registerSW