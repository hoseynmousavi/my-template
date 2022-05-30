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

        function generateId()
        {
            return (Math.random() + 1).toString(36).substring(7)
        }

        function onToast(event)
        {
            const {message, type = INFO_TOAST, onClick, isUndo} = event.detail
            setActiveToasts(activeToasts =>
                activeToasts.every(item => item.message !== message || isUndo) ?
                    [{id: generateId(), message, type, onClick, isUndo}, ...activeToasts]
                    :
                    activeToasts,
            )
        }

        window.addEventListener("addToast", onToast, {passive: true})
        return () => window.removeEventListener("addToast", onToast)
    }, [])

    function clearItem(id)
    {
        setActiveToasts(activeToasts => activeToasts.filter(item => item.id !== id))
    }

    return (
        <div className="toast-container">
            <Suspense fallback={null}>
                {
                    activeToasts.map(item =>
                        <Toast key={item.id} item={item} clearMe={clearItem} location={location}/>,
                    )
                }
            </Suspense>
        </div>
    )
}

export default ToastContainer