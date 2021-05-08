import React, {PureComponent} from "react"

class Switch extends PureComponent
{
    componentDidMount()
    {
        this.changeRoute()

        window.addEventListener("popstate", this.setPopIndex, {passive: true})
        window.addEventListener("pushState", this.setPushIndex, {passive: true})
        window.addEventListener("replaceState", this.setReplaceIndex, {passive: true})
    }

    componentWillUnmount()
    {
        window.removeEventListener("popstate", this.setPopIndex)
        window.removeEventListener("pushState", this.setPushIndex)
        window.removeEventListener("replaceState", this.setReplaceIndex)
    }

    setPopIndex = () => this.changeRoute("pop")

    setPushIndex = () => this.changeRoute("push")

    setReplaceIndex = () => this.changeRoute("replace")

    changeRoute = type =>
    {
        const scrolls = this.state?.scrolls || []
        let scroll = 0
        if (type === "pop")
        {
            if (scrolls.length > 0)
            {
                scroll = scrolls[scrolls.length - 1]
                scrolls.pop()
            }
        }
        else if (type === "push") scrolls.push(window.scrollY)

        const {children, disableMobileAnimate} = this.props
        const location = window.location.pathname

        const urls = children.reduce((sum, item) =>
        {
            if (item?.props?.path) return [...sum, 
                item.props.path === "*"
                ? ".*" 
                : item.props.exact 
                  ? item.props.ignoreSlash
                    ? `^${item.props.path}\\/?$`
                    : `^${item.props.path}$`
                  : item.props.path.replace(/:\w+/g, ".*")]
            else return [...sum, false]
        }, [])

        const showChildIndex = urls && urls.indexOf(urls.filter(url => url && new RegExp(url).test(location))[0])

        if (showChildIndex !== -1)
        {
            if (this.state?.showChildIndex !== undefined && showChildIndex !== this.state.showChildIndex)
            {
                if (this.cont)
                {
                    if (document.body.clientWidth <= 480 && !disableMobileAnimate)
                    {
                        if (type === "pop") this.mobileBack(showChildIndex, location, scrolls, scroll)
                        else this.mobileForward(showChildIndex, location, scrolls)
                    }
                    else
                    {
                        if (this.cont.animate)
                        {
                            this.cont.style.willChange = "opacity"
                            this.cont.animate([{opacity: 1}, {opacity: 0}, {opacity: 0}], {duration: 300, easing: "ease"})
                            setTimeout(() =>
                            {
                                this.setState({showChildIndex, location, scrolls}, () =>
                                {
                                    this.cont.animate([{opacity: 0}, {opacity: 1}], {duration: 150, easing: "ease"})
                                    setTimeout(() =>
                                    {
                                        document.body.style.overflowY = "auto"
                                        window.scroll({top: scroll})
                                    }, 1)
                                    setTimeout(() => this.cont.style.removeProperty("will-change"), 170)
                                })
                            }, 170)
                        }
                        else
                        {
                            this.setState({showChildIndex, location, scrolls}, () =>
                                setTimeout(() =>
                                {
                                    document.body.style.overflowY = "auto"
                                    window.scroll({top: scroll})
                                }, 1),
                            )
                        }
                    }
                }
                else this.setState({showChildIndex, location, scrolls})
            }
            else if (location !== this.state?.location) this.setState({showChildIndex, location, scrolls})
        }
    }

    mobileForward(showChildIndex, location, scrolls)
    {
        if (typeof requestAnimationFrame === "undefined")
        {
            if (this.cont.animate)
            {
                this.cont.style.willChange = "transform, opacity"
                this.cont.animate([{opacity: 1, transform: "translate3d(0, 0, 0)"}, {opacity: 0, transform: "translate3d(30%, 0, 0)"}, {opacity: 0, transform: "translate3d(30%, 0, 0)"}], {duration: 500, easing: "ease"})
                setTimeout(() =>
                {
                    this.setState({showChildIndex, location, scrolls}, () =>
                    {
                        this.cont.animate([{transform: "translate3d(-30%, 0, 0)", opacity: 0}, {transform: "translate3d(0, 0, 0)", opacity: 1}], {duration: 250, easing: "ease"})
                        setTimeout(() =>
                        {
                            document.body.style.overflowY = "auto"
                            window.scroll({top: 0})
                        }, 1)
                        setTimeout(() => this.cont.style.removeProperty("will-change"), 270)
                    })
                }, 270)
            }
            else
            {
                this.setState({showChildIndex, location, scrolls}, () =>
                    setTimeout(() =>
                    {
                        document.body.style.overflowY = "auto"
                        window.scroll({top: 0})
                    }, 1),
                )
            }
        }
        else
        {
            const elem = this
            let translate = 0
            let secondTranslate = -30
            let step = 1
            elem.cont.style.willChange = "transform, opacity"

            function hide()
            {
                if (elem.cont)
                {
                    translate = translate + step <= 30 ? translate + step : 30
                    step = translate + step + 1 <= 30 ? step + 1 : step
                    elem.cont.style.transform = `translate3d(${translate}%, 0, 0)`
                    elem.cont.style.opacity = `${0.9 - (translate / 30)}`
                    if (translate < 30) window.requestAnimationFrame(hide)
                    else
                    {
                        elem.setState({...elem.state, showChildIndex, location}, () =>
                        {
                            setTimeout(() =>
                            {
                                document.body.style.overflowY = "auto"
                                window.scroll({top: 0})
                            }, 1)
                            setTimeout(() => window.requestAnimationFrame(showNext), 150)
                        })
                    }
                }
                else elem.setState({...elem.state, showChildIndex, location})
            }

            function showNext()
            {
                secondTranslate = secondTranslate + step <= 0 ? secondTranslate + step : 0
                step = step - 1 >= 1 ? step - 1 : 1
                elem.cont.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                elem.cont.style.opacity = `${1 + (secondTranslate / 30)}`
                if (secondTranslate < 0) window.requestAnimationFrame(showNext)
                else
                {
                    if (elem && elem.cont)
                    {
                        elem.cont.style.removeProperty("will-change")
                        elem.cont.style.removeProperty("opacity")
                        elem.cont.style.removeProperty("transform")
                    }
                }
            }

            window.requestAnimationFrame(hide)
        }
    }

    mobileBack(showChildIndex, location, scrolls, scroll)
    {
        if (typeof requestAnimationFrame === "undefined")
        {
            if (this.cont.animate)
            {
                this.cont.style.willChange = "transform, opacity"
                this.cont.animate([{transform: "translate3d(0, 0, 0)", opacity: 1}, {transform: "translate3d(-30%, 0, 0)", opacity: 0}, {transform: "translate3d(-30%, 0, 0)", opacity: 0}], {duration: 500, easing: "ease"})
                setTimeout(() =>
                {
                    this.setState({showChildIndex, location, scrolls}, () =>
                    {
                        this.cont.animate([{opacity: 0, transform: "translate3d(30%, 0, 0)"}, {opacity: 1, transform: "translate3d(0, 0, 0)"}], {duration: 250, easing: "ease"})
                        setTimeout(() =>
                        {
                            document.body.style.overflowY = "auto"
                            window.scroll({top: scroll})
                        }, 1)
                        setTimeout(() => this.cont.style.removeProperty("will-change"), 270)
                    })
                }, 270)
            }
            else
            {
                this.setState({showChildIndex, location, scrolls}, () =>
                    setTimeout(() =>
                    {
                        document.body.style.overflowY = "auto"
                        window.scroll({top: scroll})
                    }, 1),
                )
            }
        }
        else
        {
            const elem = this
            let translate = 0
            let secondTranslate = 30
            let step = 1
            elem.cont.style.willChange = "transform, opacity"

            function hide()
            {
                if (elem.cont)
                {
                    translate = translate - step >= -30 ? translate - step : -30
                    step = translate - step + 1 >= -30 ? step + 1 : step
                    elem.cont.style.transform = `translate3d(${translate}%, 0, 0)`
                    elem.cont.style.opacity = `${0.9 + (translate / 30)}`
                    if (translate > -30) window.requestAnimationFrame(hide)
                    else
                    {
                        elem.setState({...elem.state, showChildIndex, location}, () =>
                        {
                            setTimeout(() =>
                            {
                                document.body.style.overflowY = "auto"
                                window.scroll({top: scroll})
                            }, 1)
                            setTimeout(() => window.requestAnimationFrame(showNext), 150)
                        })
                    }
                }
                else elem.setState({...elem.state, showChildIndex, location})
            }

            function showNext()
            {
                secondTranslate = secondTranslate - step >= 0 ? secondTranslate - step : 0
                step = step - 1 >= 1 ? step - 1 : 1
                elem.cont.style.transform = `translate3d(${secondTranslate}%, 0, 0)`
                elem.cont.style.opacity = `${1 - (secondTranslate / 30)}`
                if (secondTranslate > 0) window.requestAnimationFrame(showNext)
                else
                {
                    if (elem && elem.cont)
                    {
                        elem.cont.style.removeProperty("will-change")
                        elem.cont.style.removeProperty("opacity")
                        elem.cont.style.removeProperty("transform")
                    }
                }
            }

            window.requestAnimationFrame(hide)
        }
    }

    render()
    {
        const {showChildIndex, location} = this.state || {}
        const {children, className} = this.props
        const childrenWithProps = React.Children.map(children, child =>
        {
            if (React.isValidElement(child)) return React.cloneElement(child, {location})
            else if (!child) return ""
            else return child
        })

        return <div key="switch" className={className} ref={e => this.cont = e}>{(showChildIndex || showChildIndex === 0) && childrenWithProps[showChildIndex] ? childrenWithProps[showChildIndex] : null}</div>
    }
}

export default Switch