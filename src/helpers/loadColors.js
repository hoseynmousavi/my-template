function loadColors()
{
    Object.keys(process.env).forEach(item =>
    {
        document.documentElement.style.setProperty(
            item.replace(/REACT_APP_/g, "--").replace(/_/g, "-").toLocaleLowerCase(),
            process.env[item],
        )
    })
}

export default loadColors