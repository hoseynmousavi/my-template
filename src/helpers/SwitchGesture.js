import {useRef} from "react"
import checkParentClass from "./checkParentClass"
import goBack from "./goBack"
import changeBodyOverflow from "./changeBodyOverflow"

function SwitchGesture({stateRef})
{
    let started = useRef(false)
    let changing = useRef(false)
    let posX = useRef(0)
    let posY = useRef(0)
    let translatePre = useRef(0)
    let translateNext = useRef(null)
    let deltaX = useRef(0)
    let deltaY = useRef(0)

    function onTouchStart(e)
    {
        if (!checkParentClass(e.target, "dont-gesture"))
        {
            posX.current = e.touches?.[0].clientX || e.clientX
            posY.current = e.touches?.[0].clientY || e.clientY
            started.current = true
        }
    }

    function onTouchMove(e)
    {
        deltaX.current = posX.current - e.touches[0].clientX
        deltaY.current = posY.current - e.touches[0].clientY

        const prePage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
        const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 2]?.id)

        if ((changing.current || (started.current && deltaY.current < 5 && deltaY.current > -5)) && nextPage && prePage)
        {
            changeBodyOverflow(true)
            changing.current = true
            posX.current = e.touches?.[0].clientX || e.clientX
            if (translatePre.current - deltaX.current > 0 && translatePre.current - deltaX.current <= window.innerWidth)
            {
                translatePre.current = translatePre.current - deltaX.current

                if (translateNext.current === null) translateNext.current = -0.6 * window.innerWidth
                translateNext.current = translateNext.current - deltaX.current / 7 * 4
                nextPage.style.opacity = `1`
                nextPage.style.contentVisibility = `visible`

                function translate()
                {
                    prePage.style.transform = `translate3d(${translatePre.current}px,0,0)`
                    nextPage.style.transform = `translate3d(${translateNext.current}px,0,0)`
                }

                window.requestAnimationFrame(translate)
            }
        }
        started.current = false
    }

    function onTouchEnd()
    {
        if (changing.current)
        {
            changing.current = false
            if (deltaX.current >= 3) restore()
            else if (deltaX.current <= -3) back()
            else
            {
                if (translatePre.current > window.innerWidth / 2) back()
                else restore()
            }
        }
    }

    function restore()
    {
        const prePage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
        const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 2].id)

        let translatePreTemp = translatePre.current / window.innerWidth * 100
        let stepPre = 7
        let translateNextTemp = translateNext.current / window.innerWidth * 100
        let stepNext = 4

        function anime()
        {
            translatePreTemp = translatePreTemp - stepPre > 0 ? translatePreTemp - stepPre : 0
            translateNextTemp = translateNextTemp - stepNext > -60 ? translateNextTemp - stepNext : -60
            nextPage.style.transform = `translate3d(${translateNextTemp}%, 0, 0)`
            prePage.style.transform = `translate3d(${translatePreTemp}%, 0, 0)`
            if (translatePreTemp > 0) window.requestAnimationFrame(anime)
            else
            {
                changeBodyOverflow(false)
                nextPage.style.removeProperty("transform")
                prePage.style.removeProperty("transform")
                nextPage.style.opacity = `0`
                nextPage.style.contentVisibility = `hidden`
                reset()
            }
        }

        window.requestAnimationFrame(anime)
    }

    function back()
    {
        goBack()
        reset()
    }

    function reset()
    {
        started.current = false
        changing.current = false
        posX.current = 0
        posY.current = 0
        translatePre.current = 0
        translateNext.current = null
        deltaX.current = 0
        deltaY.current = 0
    }

    return {onTouchStart, onTouchMove, onTouchEnd}
}

export default SwitchGesture