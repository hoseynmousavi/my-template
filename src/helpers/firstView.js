function firstView({ref, rootMargin = "0px 0px 0px 0px", threshold = 0.01, callback})
{
    const observer = new IntersectionObserver(
        ([e]) =>
        {
            if (e.intersectionRatio >= threshold)
            {
                callback()
                observer.disconnect()
            }
        },
        {threshold: [threshold], rootMargin},
    )

    observer.observe(ref.current)
}

export default firstView