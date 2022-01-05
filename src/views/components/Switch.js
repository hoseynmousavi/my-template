import React, {useEffect, useRef, useState} from "react"
import checkViewPort from "../../helpers/checkViewPort"
import Resize from "../../helpers/Resize"

function Switch({children})
{
    const [state, setState] = useState({showChildIndex: null, location: null})
    const {showChildIndex, location} = state
    const currentLocation = useRef(null)
    const currentIndex = useRef(null)
    const contRef = document.getElementById("outer-root")
    const innerContRef = document.getElementById("root")
    const {clientHeight, clientWidth} = Resize()
    const root = clientHeight && checkViewPort() ? document.getElementById("root") : window

    useEffect(() =>
    {
        const scrolls = []

        function getScroll(type)
        {
            let scroll = 0
            if (type === "popstate")
            {
                if (scrolls.length > 0)
                {
                    scroll = scrolls[scrolls.length - 1]
                    scrolls.pop()
                }
            }
            else if (type === "pushstate") scrolls.push(root.scrollY || root.scrollTop)
            return scroll
        }

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
            if (e?.target?.history?.state !== "for-history" && currentLocation.current !== locationTemp)
            {
                currentLocation.current = locationTemp
                if (type === "initial" || currentIndex.current === showChildIndexTemp)
                {
                    currentIndex.current = showChildIndexTemp
                    setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                }
                else
                {
                    currentIndex.current = showChildIndexTemp
                    const scroll = getScroll(type)
                    if (clientWidth <= 480)
                    {
                        if (type === "popstate") mobileBack(showChildIndexTemp, locationTemp, scroll)
                        else mobileForward(showChildIndexTemp, locationTemp, scroll)
                    }
                    else desktopRoute(showChildIndexTemp, locationTemp, scroll)
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

    function desktopRoute(showChildIndexTemp, locationTemp, scroll)
    {
        if (contRef.animate)
        {
            contRef.animate([{opacity: 1}, {opacity: 0}, {opacity: 0}], {duration: 350, easing: "ease-in"})
            setTimeout(() =>
            {
                setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                contRef.animate([{opacity: 0}, {opacity: 1}], {duration: 175, easing: "ease-out"})
                setTimeout(() => root.scrollTo({top: scroll}), 0)
            }, 195)
        }
        else
        {
            setState({showChildIndex: showChildIndexTemp, location: locationTemp})
            root.scrollTo({top: scroll})
        }
    }

    function mobileForward(showChildIndexTemp, locationTemp, scroll)
    {
        if (typeof requestAnimationFrame === "undefined") desktopRoute(showChildIndexTemp, locationTemp, scroll)
        else
        {
            let translate = 0
            let step = 1
            addProperties()

            function hide()
            {
                translate = translate + step <= 30 ? translate + step : 30
                step = translate + step + 1 <= 30 ? step + 1 : step
                contRef.style.transform = `translate3d(${translate}%, 0, 0)`
                contRef.style.opacity = `${0.9 - (translate / 30)}`
                if (translate < 30) window.requestAnimationFrame(hide)
                else
                {
                    setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                    setTimeout(() => window.requestAnimationFrame(showNext), 150)
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
                else removeProperties(scroll)
            }

            window.requestAnimationFrame(hide)
        }
    }

    function mobileBack(showChildIndexTemp, locationTemp, scroll)
    {
        if (typeof requestAnimationFrame === "undefined") desktopRoute(showChildIndexTemp, locationTemp, scroll)
        else
        {
            let translate = 0
            let step = 1
            addProperties()

            function hide()
            {
                translate = translate - step >= -30 ? translate - step : -30
                step = translate - step + 1 >= -30 ? step + 1 : step
                contRef.style.transform = `translate3d(${translate}%, 0, 0)`
                contRef.style.opacity = `${0.9 + (translate / 30)}`
                if (translate > -30) window.requestAnimationFrame(hide)
                else
                {
                    setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                    setTimeout(() =>
                    {
                        innerContRef.scrollTo({top: scroll})
                        window.requestAnimationFrame(showNext)
                    }, 150)
                }
            }

            let secondTranslate = 30

            function showNext()
            {
                secondTranslate = secondTranslate - step >= 0 ? secondTranslate - step : 0
                step = step - 1 >= 1 ? step - 1 : 1
                contRef.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                contRef.style.opacity = `${1 - (secondTranslate / 30)}`
                if (secondTranslate > 0) window.requestAnimationFrame(showNext)
                else removeProperties(scroll)
            }

            window.requestAnimationFrame(hide)
        }
    }

    function addProperties()
    {
        contRef.style.willChange = "transform, opacity"
        innerContRef.className = "hide-scroll"
        if (!checkViewPort())
        {
            const top = root.scrollY || root.scrollTop
            innerContRef.style.maxHeight = clientHeight + "px"
            innerContRef.style.overflowY = "auto"
            innerContRef.style.overflowX = "hidden"
            innerContRef.scrollTo({top})
        }
    }

    function removeProperties(scroll)
    {
        contRef.style.removeProperty("will-change")
        contRef.style.removeProperty("opacity")
        contRef.style.removeProperty("transform")
        innerContRef.className = ""
        if (!checkViewPort())
        {
            innerContRef.style.removeProperty("max-height")
            innerContRef.style.removeProperty("overflow-y")
            innerContRef.style.removeProperty("overflow-x")
            root.scrollTo({top: scroll})
        }
    }

    const childrenWithProps = React.Children.map(children, child =>
    {
        if (React.isValidElement(child)) return React.cloneElement(child, {location})
        else if (!child) return ""
        else return child
    })

    return (showChildIndex || showChildIndex === 0) && childrenWithProps[showChildIndex] ? childrenWithProps[showChildIndex] : null
}

export default Switch