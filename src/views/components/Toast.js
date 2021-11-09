import {useContext, useEffect, useRef} from "react"
import PlusSvg from "../../media/svg/PlusSvg"
import Material from "./Material"
import CheckSvg from "../../media/svg/CheckSvg"
import InfoSvg from "../../media/svg/InfoSvg"
import CloseSvg from "../../media/svg/CloseSvg"
import {INFO_TOAST, SUCCESS_TOAST} from "../../constant/toastTypes"
import {ThemeContext} from "../../context/theme/ThemeReducer"

function Toast({item: {message, type, onClick}, clearMe, location})
{
    const {state: {theme}} = useContext(ThemeContext)
    const toastRef = useRef(null)
    const clearTimer = useRef(null)
    const unMountTimer = useRef(null)
    const didMountLocation = useRef(location)

    useEffect(() =>
    {
        toastRef.current.style.transition = "height ease 0.1s, margin-bottom ease 0.1s, padding ease 0.1s, opacity ease 0.3s 0.1s"
        toastRef.current.style.height = toastRef.current.scrollHeight + 32 + "px"
        toastRef.current.style.marginBottom = "15px"
        toastRef.current.style.padding = "16px 16px"
        toastRef.current.style.opacity = "1"
        unMountTimer.current = setTimeout(() => clearItem(), 4000)
        return () => clearTimeout(unMountTimer.current)
        // eslint-disable-next-line
    }, [])

    useEffect(() =>
    {
        if (didMountLocation.current !== location) clearItem()
        // eslint-disable-next-line
    }, [location])

    function clearItem()
    {
        if (!clearTimer.current)
        {
            toastRef.current.style.transition = "height ease 0.1s 0.3s, margin-bottom ease 0.1s 0.3s, padding ease 0.1s 0.3s, opacity ease 0.3s"
            toastRef.current.style.height = "0"
            toastRef.current.style.marginBottom = "0"
            toastRef.current.style.padding = "0 16px"
            toastRef.current.style.opacity = "0"
            clearTimeout(unMountTimer.current)
            clearTimer.current = setTimeout(() => clearMe(message), 250)
        }
    }

    return (
        <div className={`toast-item ${theme === "dark" ? "dark" : ""} ${type}`} ref={toastRef} style={{height: "0", opacity: "0", marginBottom: "0", padding: "0 16px"}} onClick={onClick ? onClick : clearItem}>
            <div className="toast-item-message">
                {
                    type === SUCCESS_TOAST ?
                        <CheckSvg className={`toast-item-svg success ${theme === "dark" ? "dark" : ""}`}/>
                        :
                        type === INFO_TOAST ?
                            <InfoSvg className={`toast-item-svg info ${theme === "dark" ? "dark" : ""}`}/>
                            :
                            <CloseSvg className={`toast-item-svg fail ${theme === "dark" ? "dark" : ""}`}/>
                }
                {message}
            </div>
            <Material className="toast-item-close-material" onClick={onClick ? clearItem : undefined}>
                <PlusSvg className="toast-item-close"/>
            </Material>
        </div>
    )
}

export default Toast