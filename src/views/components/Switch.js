import {useEffect, useRef, useState} from "react"
import SwitchItem from "./SwitchItem"
import SwitchGesture from "../../helpers/SwitchGesture"

function Switch({children, isOuterSwitch})
{
    const [state, setState] = useState([])
    const stateRef = useRef([])
    const contRef = document.getElementById("outer-root")
    const {onTouchStart, onTouchMove, onTouchEnd} = SwitchGesture({stateRef})

    useEffect(() =>
    {
        function getUrls()
        {
            if (children?.reduce)
            {
                return children.reduce((sum, item) =>
                {
                    if (item?.props?.path) return [...sum, item.props.path === "*" ? ".*" : item.props.exact ? `^${item.props.path}$` : `^${item.props.path.replace(/:\w+/g, ".*")}`]
                    else return [...sum, false]
                }, [])
            }
            else if (children?.props?.path)
            {
                return [children.props.path === "*" ? ".*" : children.props.exact ? `^${children.props.path}$` : children.props.path.replace(/:\w+/g, ".*")]
            }
            else return [false]
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
                    if (window.innerWidth <= 480)
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
        if (contRef.animate)
        {
            contRef.animate([{opacity: 1}, {opacity: 0}, {opacity: 0}], {duration: 350, easing: "ease-in"})
            setTimeout(() =>
            {
                const delta = getDelta({showChildIndexTemp})
                setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId(), delta})
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
                }, 0)
                contRef.animate([{opacity: 0}, {opacity: 1}], {duration: 175, easing: "ease-out"})
            }, 195)
        }
        else
        {
            const delta = getDelta({showChildIndexTemp})
            setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateId(), delta})
        }
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
                    let stepPre = 4
                    let translateNext = 100
                    let stepNext = 7

                    function anime()
                    {
                        translatePre = translatePre - stepPre > -100 ? translatePre - stepPre : -100
                        translateNext = translateNext - stepNext > 0 ? translateNext - stepNext : 0
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
                }, 0)
            }
            else
            {
                let translate = 0
                let step = 1

                function hide()
                {
                    translate = translate + step <= 30 ? translate + step : 30
                    step = translate + step + 1 <= 30 ? step + 1 : step
                    contRef.style.transform = `translate3d(${translate}%, 0, 0)`
                    contRef.style.opacity = `${0.9 - (translate / 30)}`
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
                    contRef.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                    contRef.style.opacity = `${1 + (secondTranslate / 30)}`
                    if (secondTranslate < 0) window.requestAnimationFrame(showNext)
                    else contRef.style.removeProperty("transform")
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

                const next = nextPage.style.transform ? +(nextPage.style.transform.replace("translate3d(", "").replace("px, 0px, 0px)", "")) / window.innerWidth * 100 : null
                const pre = prePage.style.transform ? +(prePage.style.transform.replace("translate3d(", "").replace("px, 0px, 0px)", "")) / window.innerWidth * 100 : null
                nextPage.style.transform = next ? `translate3d(${next}%, 0, 0)` : `translate3d(-60%, 0, 0)`
                nextPage.style.opacity = `1`
                nextPage.style.contentVisibility = `visible`

                let translatePre = pre || 0
                let stepPre = 7
                let translateNext = next || -60
                let stepNext = 4

                function anime()
                {
                    translatePre = translatePre + stepPre < 100 ? translatePre + stepPre : 100
                    translateNext = translateNext + stepNext < 0 ? translateNext + stepNext : 0
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
                setTimeout(doTheJob, 0)
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
            stateRef.current = [{showChildIndex, location, id}, ...stateRef.current]
            setState(prevState => [{showChildIndex, location, id}, ...prevState])
        }
    }

    function generateId()
    {
        return (Math.random() + 1).toString(36).substring(7)
    }

    return state.map((item, index) =>
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
                               isOuterSwitch={isOuterSwitch}
                               id={id}
                               onTouchStart={onTouchStart}
                               onTouchMove={onTouchMove}
                               onTouchEnd={onTouchEnd}
            />
        }
        else return null
    })
}

export default Switch