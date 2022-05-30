import {useLayoutEffect, useRef, useState} from "react"
import PlusSvg from "../../media/svg/PlusSvg"
import Material from "./Material"
import CheckSvg from "../../media/svg/CheckSvg"
import InfoSvg from "../../media/svg/InfoSvg"
import CloseSvg from "../../media/svg/CloseSvg"
import {FAIL_TOAST, INFO_TOAST, SUCCESS_TOAST} from "../../constant/toastTypes"
import UndoSvg from "../../media/svg/UndoSvg"
import MyTimer from "./MyTimer"
import GetTheme from "../../hooks/GetTheme"
import toastConstant from "../../constant/toastConstant"

function Toast({item: {id, message, type, onClick, isUndo}, clearMe, location})
{
    const timerInSecond = toastConstant.timerInSecond
    const timerInMili = timerInSecond * 1000
    const {isDark} = GetTheme()
    const [timerRemain, setTimerRemain] = useState(timerInMili)
    const toastRef = useRef(null)
    const toastMessageRef = useRef(null)
    const clearTimer = useRef(null)
    const timerInterval = useRef(null)
    const unMountTimer = useRef(null)
    const didMountLocation = useRef(location)

    useLayoutEffect(() =>
    {
        function show()
        {
            if (document.readyState === "complete" || document.readyState === "loaded")
            {
                toastRef.current.style.transition = "height ease 0.1s, margin-bottom ease 0.1s, padding ease 0.1s, opacity ease 0.3s 0.1s"
                toastRef.current.style.height = toastMessageRef.current.scrollHeight + 32 + "px"
                toastRef.current.style.marginBottom = "15px"
                toastRef.current.style.padding = "16px 16px"
                toastRef.current.style.opacity = "1"

                if (isUndo)
                {
                    const start = new Date()
                    timerInterval.current = setInterval(() =>
                    {
                        const timerRemain = Math.max(0, Math.floor(timerInMili + (start - new Date())))
                        if (timerRemain === 0) clearItem()
                        else setTimerRemain(timerRemain)
                    }, 10)
                }
                else unMountTimer.current = setTimeout(clearItem, timerInMili)
            }
            else setTimeout(show, 10)
        }

        show()

        return () =>
        {
            clearInterval(timerInterval.current)
            clearTimeout(unMountTimer.current)
        }
        // eslint-disable-next-line
    }, [])

    useLayoutEffect(() =>
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
            clearInterval(timerInterval.current)
            clearTimeout(unMountTimer.current)
            clearTimer.current = setTimeout(() => clearMe(id), 250)
        }
    }

    function onClickFunc()
    {
        onClick()
        clearItem()
    }

    return (
        <div className={`toast-item ${isDark ? "dark" : ""} ${type}`} ref={toastRef} style={{height: "0", opacity: "0", marginBottom: "0", padding: "0 16px"}} onClick={onClick ? onClickFunc : clearItem}>
            <div className="toast-item-message" ref={toastMessageRef}>
                {
                    isUndo ?
                        <MyTimer percent={timerRemain / timerInMili * 100}
                                 text={Math.ceil(timerRemain / timerInMili * timerInSecond)}
                                 color={isDark ? "var(--first-text-color)" : type === SUCCESS_TOAST ? "var(--toast-success-text)" : type === FAIL_TOAST ? "var(--toast-fail-text)" : "var(--toast-info-text)"}
                                 className="toast-item-svg"
                        />
                        :
                        type === SUCCESS_TOAST ?
                            <CheckSvg className={`toast-item-svg success ${isDark ? "dark" : ""}`}/>
                            :
                            type === INFO_TOAST ?
                                <InfoSvg className={`toast-item-svg info ${isDark ? "dark" : ""}`}/>
                                :
                                <CloseSvg className={`toast-item-svg fail ${isDark ? "dark" : ""}`}/>
                }
                {message}
            </div>
            {
                isUndo ?
                    <Material className="toast-item-undo-btn">
                        <UndoSvg className="toast-item-close undo"/>
                        <div className="toast-item-undo-text">بازگرداندن</div>
                    </Material>
                    :
                    <Material className="toast-item-close-material" onClick={onClick ? clearItem : undefined}>
                        <PlusSvg className="toast-item-close"/>
                    </Material>
            }
        </div>
    )
}

export default Toast