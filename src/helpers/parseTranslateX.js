function parseTranslateX({transform, fallback})
{
    return transform ? Math.round(+(transform.replace("translate3d(", "").replace("px, 0px, 0px)", "")) / window.innerWidth * 100) : fallback
}

export default parseTranslateX