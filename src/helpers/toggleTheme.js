function toggleTheme(theme)
{
    const items = []
    if (theme === "dark")
    {
        items.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_DARK", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item],
            )
        })
    }
    else
    {
        items.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_DARK", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item.replace("_DARK", "")],
            )
        })
    }
}

export default toggleTheme