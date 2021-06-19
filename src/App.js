import {useEffect} from "react"
import loadColors from "./helpers/loadColors"

function App()
{
    // env variables will be replace in html file, in build process, so we need em in development
    useEffect(() => process.env.NODE_ENV === "development" && loadColors(), [])

    return (
        "MY TEMPLATE"
    )
}

export default App