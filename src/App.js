import {useEffect} from "react"
import loadColors from "./helpers/loadColors"

function App()
{
    useEffect(() => process.env.NODE_ENV !== "production" && loadColors(), [])

    return (
        "MY TEMPLATE"
    )
}

export default App
