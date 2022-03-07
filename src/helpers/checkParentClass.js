function checkParentClass(element, classname)
{
    if (element.className && element.className.toString().split(" ").indexOf(classname) >= 0) return true
    else return element.parentNode && checkParentClass(element.parentNode, classname)
}

export default checkParentClass