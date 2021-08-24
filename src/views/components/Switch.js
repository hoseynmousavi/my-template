import React, {useEffect, useRef, useState} from "react"

function Switch({children, className})
{
    const [state, setState] = useState({showChildIndex: null, location: null})
    const {showChildIndex, location} = state
    const currentLocation = useRef(null)
    const currentIndex = useRef(null)
    const contRef = useRef(null)
    const innerContRef = useRef(null)

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
            else if (type === "pushstate")
            {
                scrolls.push(window.scrollY)
            }
            return scroll
        }

        function getUrls()
        {
            if (children?.reduce)
            {
                return children.reduce((sum, item) =>
                {
                    if (item?.props?.path) return [...sum, item.props.path === "*" ? ".*" : item.props.exact ? `^${item.props.path}$` : item.props.path.replace(/:\w+/g, ".*")]
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
                    if (window.innerWidth <= 480)
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
        if (contRef.current.animate)
        {
            contRef.current.animate([{opacity: 1}, {opacity: 0}, {opacity: 0}], {duration: 300, easing: "ease"})
            setTimeout(() =>
            {
                if (contRef.current)
                {
                    setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                    contRef?.current?.animate([{opacity: 0}, {opacity: 1}], {duration: 150, easing: "ease"})
                    setTimeout(() => window.scroll({top: scroll}), 0)
                }
            }, 170)
        }
        else
        {
            setState({showChildIndex: showChildIndexTemp, location: locationTemp})
            window.scroll({top: scroll})
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
                if (contRef.current)
                {
                    translate = translate + step <= 30 ? translate + step : 30
                    step = translate + step + 1 <= 30 ? step + 1 : step
                    contRef.current.style.transform = `translate3d(${translate}%, 0, 0)`
                    contRef.current.style.opacity = `${0.9 - (translate / 30)}`
                    if (translate < 30) window.requestAnimationFrame(hide)
                    else
                    {
                        setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                        setTimeout(() => window.requestAnimationFrame(showNext), 150)
                    }
                }
            }

            let secondTranslate = -30

            function showNext()
            {
                if (contRef.current)
                {
                    secondTranslate = secondTranslate + step <= 0 ? secondTranslate + step : 0
                    step = step - 1 >= 1 ? step - 1 : 1
                    contRef.current.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                    contRef.current.style.opacity = `${1 + (secondTranslate / 30)}`
                    if (secondTranslate < 0) window.requestAnimationFrame(showNext)
                    else removeProperties(scroll)
                }
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
                if (contRef.current)
                {
                    translate = translate - step >= -30 ? translate - step : -30
                    step = translate - step + 1 >= -30 ? step + 1 : step
                    contRef.current.style.transform = `translate3d(${translate}%, 0, 0)`
                    contRef.current.style.opacity = `${0.9 + (translate / 30)}`
                    if (translate > -30) window.requestAnimationFrame(hide)
                    else
                    {
                        setState({showChildIndex: showChildIndexTemp, location: locationTemp})
                        setTimeout(() =>
                        {
                            innerContRef.current.scroll({top: scroll})
                            window.requestAnimationFrame(showNext)
                        }, 150)
                    }
                }
            }

            let secondTranslate = 30

            function showNext()
            {
                if (contRef.current)
                {
                    secondTranslate = secondTranslate - step >= 0 ? secondTranslate - step : 0
                    step = step - 1 >= 1 ? step - 1 : 1
                    contRef.current.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                    contRef.current.style.opacity = `${1 - (secondTranslate / 30)}`
                    if (secondTranslate > 0) window.requestAnimationFrame(showNext)
                    else removeProperties(scroll)
                }
            }

            window.requestAnimationFrame(hide)
        }
    }

    function addProperties()
    {
        if (contRef.current)
        {
            const top = window.scrollY
            contRef.current.style.willChange = "transform, opacity"
            innerContRef.current.style.maxHeight = window.innerHeight + "px"
            innerContRef.current.style.overflow = "auto"
            innerContRef.current.scroll({top})
        }
    }

    function removeProperties(scroll)
    {
        if (contRef.current)
        {
            contRef.current.style.removeProperty("will-change")
            contRef.current.style.removeProperty("opacity")
            contRef.current.style.removeProperty("transform")
            innerContRef.current.style.removeProperty("max-height")
            innerContRef.current.style.removeProperty("overflow")
            window.scroll({top: scroll})
        }
    }

    const childrenWithProps = React.Children.map(children, child =>
    {
        if (React.isValidElement(child)) return React.cloneElement(child, {location})
        else if (!child) return ""
        else return child
    })

    return (
        <div key="switch" className={className} ref={contRef}>
            <div ref={innerContRef} className="hide-scroll">
                {(showChildIndex || showChildIndex === 0) && childrenWithProps[showChildIndex] ? childrenWithProps[showChildIndex] : null}
            </div>
        </div>
    )
}

export default Switch