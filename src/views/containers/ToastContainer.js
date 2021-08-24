import {useEffect, useState, Suspense, lazy} from "react"
import toastManager from "../../helpers/toastManager"
import {INFO_TOAST} from "../../constant/toastTypes"

const Toast = lazy(() => import("../components/Toast"))

function ToastContainer({location})
{
    const [activeToasts, setActiveToasts] = useState([])

    useEffect(() =>
    {
        toastManager.configToast()

        function onToast(event)
        {
            const {message, type = INFO_TOAST} = event.detail
            setActiveToasts(activeToasts =>
                activeToasts.every(item => item.message !== message) ?
                    [{message, type}, ...activeToasts]
                    :
                    activeToasts,
            )
        }

        window.addEventListener("addToast", onToast, {passive: true})
        return () => window.removeEventListener("addToast", onToast)
    }, [])

    function clearItem(message)
    {
        setActiveToasts(activeToasts => activeToasts.filter(item => item.message !== message))
    }

    return (
        <div className="toast-container">
            <Suspense fallback={null}>
                {
                    activeToasts.map(item =>
                        <Toast key={item.message} item={item} clearMe={clearItem} location={location}/>,
                    )
                }
            </Suspense>
        </div>
    )
}

export default ToastContainer