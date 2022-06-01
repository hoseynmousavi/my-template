import React, {useEffect, useRef, useState} from "react"
import SwitchItem from "./SwitchItem"
import SwitchGesture from "../../hooks/SwitchGesture"
import parseTranslateX from "../../helpers/parseTranslateX"

function Switch({children, isAuth, isTab, tabClassName})
{
    const [state, setState] = useState([])
    const stateRef = useRef([])
    const contRef = useRef(isTab ? null : document.getElementById("root"))
    const {onTouchStart, onTouchMove, onTouchEnd} = SwitchGesture({stateRef})

    useEffect(() =>
    {
        function getUrls()
        {
            return children.reduce((sum, item) => item?.props?.path ? [...sum, item.props.path === "*" ? ".*" : item.props.exact ? `^${item.props.path}(\\/?)$` : `^${item.props.path.replace(/:\w+/g, ".*")}`] : [...sum, false], [])
        }

        function changeRoute(e)
        {
            const {type} = e
            const urls = getUrls()
            const locationTemp = window.location.pathname
            const showChildIndexTemp = urls.indexOf(urls.filter(url => url && new RegExp(url).test(locationTemp))[0])
            const {showChildIndex, location} = stateRef.current[stateRef.current.length - 1] || {}
            if (e?.target?.history?.state !== "for-history" && location !== locationTemp)
            {
                if (type === "initial")
                {
                    setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: "initial"})
                }
                else if (showChildIndex === showChildIndexTemp)
                {
                    setStateFunc({type: "replacestate", showChildIndex: showChildIndexTemp, location: locationTemp})
                }
                else
                {
                    if (window.innerWidth <= 480 && !isTab)
                    {
                        if (type === "popstate") mobileBack(showChildIndexTemp, locationTemp, type)
                        else mobileForward(showChildIndexTemp, locationTemp, type)
                    }
                    else desktopRoute(showChildIndexTemp, locationTemp, type)
                }
            }
        }

        changeRoute({type: "initial"})

        window.addEventListener("popstate", changeRoute, {passive: true})
        window.addEventListener("pushstate", changeRoute, {passive: true})
        window.addEventListener("replacestate", changeRoute, {passive: true})

        return () =>
        {
            window.removeEventListener("popstate", changeRoute)
            window.removeEventListener("pushstate", changeRoute)
            window.removeEventListener("replacestate", changeRoute)
        }
        // eslint-disable-next-line
    }, [])

    function desktopRoute(showChildIndexTemp, locationTemp, type)
    {
        const delta = getDelta({showChildIndexTemp})

        if (contRef.current.animate)
        {
            contRef.current.style.opacity = "0"
            const fadeOut = contRef.current.animate([{opacity: 1}, {opacity: 0}], {duration: 200, easing: "ease-in"})
            fadeOut.finished.then(() =>
            {
                setStateFunc({
                    type: type === "popstate" && stateRef.current.length < 2 ? null : type,
                    showChildIndex: showChildIndexTemp,
                    location: locationTemp,
                    id: generateId(),
                    delta,
                })
                setTimeout(() =>
                {
                    const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
                    if (nextPage)
                    {
                        nextPage.style.opacity = `1`
                        nextPage.style.contentVisibility = `visible`
                    }
                    if (type === "pushstate")
                    {
                        const prePage = document.getElementById(stateRef.current[stateRef.current.length - 2].id)
                        if (prePage)
                        {
                            prePage.style.opacity = `0`
                            prePage.style.contentVisibility = `hidden`
                        }
                    }
                }, 10)
                contRef.current.animate([{opacity: 0}, {opacity: 1}], {duration: 200, easing: "ease-out"})
                contRef.current.style.removeProperty("opacity")
            })
        }
        else setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId(), delta})
    }

    function mobileForward(showChildIndexTemp, locationTemp, type)
    {
        if (typeof requestAnimationFrame === "undefined") desktopRoute(showChildIndexTemp, locationTemp, type)
        else
        {
            if (type === "pushstate")
            {
                setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId()})
                setTimeout(() =>
                {
                    const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
                    const prePage = document.getElementById(stateRef.current[stateRef.current.length - 2].id)

                    nextPage.style.transform = `translate3d(100%, 0, 0)`
                    nextPage.style.opacity = `1`
                    nextPage.style.contentVisibility = `visible`

                    let translatePre = 0
                    let translateNext = 100
                    let step
                    let lst = Date.now()

                    function anime()
                    {
                        const dif = Date.now() - lst
                        lst = Date.now()
                        step = 100 * dif / (1000 / 4)

                        translatePre = translatePre - (step / 2) > -100 ? translatePre - (step / 2) : -100
                        translateNext = translateNext - step > 0 ? translateNext - step : 0
                        nextPage.style.transform = `translate3d(${translateNext}%, 0, 0)`
                        prePage.style.transform = `translate3d(${translatePre}%, 0, 0)`
                        if (translateNext > 0) window.requestAnimationFrame(anime)
                        else
                        {
                            nextPage.style.removeProperty("transform")
                            prePage.style.removeProperty("transform")
                            prePage.style.opacity = `0`
                            prePage.style.contentVisibility = `hidden`
                        }
                    }

                    window.requestAnimationFrame(anime)
                }, 10)
            }
            else
            {
                let translate = 0
                let step = 1

                function hide()
                {
                    translate = translate + step <= 30 ? translate + step : 30
                    step = translate + step + 1 <= 30 ? step + 1 : step
                    contRef.current.style.transform = `translate3d(${translate}%, 0, 0)`
                    contRef.current.style.opacity = `${0.9 - (translate / 30)}`
                    if (translate < 30) window.requestAnimationFrame(hide)
                    else
                    {
                        setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId()})
                        setTimeout(() =>
                        {
                            const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
                            if (nextPage)
                            {
                                nextPage.style.opacity = `1`
                                nextPage.style.contentVisibility = `visible`
                            }
                            window.requestAnimationFrame(showNext)
                        }, 150)
                    }
                }

                let secondTranslate = -30

                function showNext()
                {
                    secondTranslate = secondTranslate + step <= 0 ? secondTranslate + step : 0
                    step = step - 1 >= 1 ? step - 1 : 1
                    contRef.current.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                    contRef.current.style.opacity = `${1 + (secondTranslate / 30)}`
                    if (secondTranslate < 0) window.requestAnimationFrame(showNext)
                    else
                    {
                        contRef.current.style.removeProperty("transform")
                        contRef.current.style.removeProperty("opacity")
                    }
                }

                window.requestAnimationFrame(hide)
            }
        }
    }

    function mobileBack(showChildIndexTemp, locationTemp, type)
    {
        if (typeof requestAnimationFrame === "undefined") desktopRoute(showChildIndexTemp, locationTemp, type)
        else
        {
            function doTheJob()
            {
                const delta = getDelta({showChildIndexTemp})

                const nextPage = document.getElementById(stateRef.current[stateRef.current.length - (1 + delta)].id)
                const prePage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)

                const next = parseTranslateX({transform: nextPage.style.transform, fallback: -60})
                const pre = parseTranslateX({transform: prePage.style.transform, fallback: 0})

                nextPage.style.transform = `translate3d(${next}%, 0, 0)`
                nextPage.style.opacity = `1`
                nextPage.style.contentVisibility = `visible`

                let translatePre = pre
                let translateNext = next
                let step
                let lst = Date.now()

                function anime()
                {
                    const dif = Date.now() - lst
                    lst = Date.now()
                    step = 100 * dif / (1000 / 4)

                    translatePre = translatePre + step < 100 ? translatePre + step : 100
                    translateNext = translateNext + (step / 2) < 0 ? translateNext + (step / 2) : 0
                    nextPage.style.transform = `translate3d(${translateNext}%, 0, 0)`
                    prePage.style.transform = `translate3d(${translatePre}%, 0, 0)`
                    if (translateNext < 0) window.requestAnimationFrame(anime)
                    else
                    {
                        nextPage.style.removeProperty("transform")
                        setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, delta})
                    }
                }

                window.requestAnimationFrame(anime)
            }

            if (stateRef.current.length >= 2) doTheJob()
            else
            {
                setStateFunc({showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId()})
                setTimeout(doTheJob, 10)
            }
        }
    }

    function getDelta({showChildIndexTemp})
    {
        let delta = 1
        for (let i = stateRef.current.length - 1; i--; i >= 0)
        {
            if (stateRef.current[i].showChildIndex === showChildIndexTemp)
            {
                delta = (stateRef.current.length - 1) - i
                break
            }
        }
        return delta
    }

    function setStateFunc({type, showChildIndex, location, id, delta})
    {
        if (type === "initial")
        {
            const res = [{showChildIndex, location, id}]
            setState(res)
            stateRef.current = res
        }
        else if (type === "replacestate")
        {
            const lastItemRef = stateRef.current[stateRef.current.length - 1]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - 1), {...lastItemRef, showChildIndex, location, ...(id ? {id} : {})}]
            setState(prevState =>
            {
                const lastItem = prevState[prevState.length - 1]
                return [...prevState.slice(0, prevState.length - 1), {...lastItem, showChildIndex, location, ...(id ? {id} : {})}]
            })
        }
        else if (type === "pushstate")
        {
            stateRef.current = [...stateRef.current, {showChildIndex, location, id}]
            setState(prevState => [...prevState, {showChildIndex, location, id}])
        }
        else if (type === "popstate")
        {
            const lastItemRef = stateRef.current[stateRef.current.length - (delta + 1)]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - (delta + 1)), {...lastItemRef, showChildIndex, location}]
            setState(prevState =>
            {
                const lastItem = prevState[prevState.length - (delta + 1)]
                return [...prevState.slice(0, prevState.length - (delta + 1)), {...lastItem, showChildIndex, location}]
            })
        }
        else
        {
            stateRef.current = [{showChildIndex, location, id}, ...(window.innerWidth <= 480 ? stateRef.current : [])]
            setState(prevState => [{showChildIndex, location, id}, ...(window.innerWidth <= 480 ? prevState : [])])
        }
    }

    function generateId()
    {
        return (Math.random() + 1).toString(36).substring(7)
    }

    const output = state.map((item, index) =>
    {
        const {showChildIndex, location, id} = item
        if (children[showChildIndex])
        {
            return <SwitchItem key={id}
                               showChildIndex={showChildIndex}
                               location={location}
                               children={children}
                               index={index}
                               stateLength={state.length}
                               isAuth={isAuth}
                               id={id}
                               onTouchStart={onTouchStart}
                               onTouchMove={onTouchMove}
                               onTouchEnd={onTouchEnd}
            />
        }
        else return null
    })

    if (isTab) return <div className={tabClassName} ref={contRef}>{output}</div>
    else return output
}

export default Switch