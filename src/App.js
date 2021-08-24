import {useEffect} from "react"
import loadColors from "./helpers/loadColors"
import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"

function App({location})
{
    // env variables will be replace in html file, in build process, so we need em in development
    useEffect(() => process.env.NODE_ENV === "development" && loadColors(), [])

    return (
        <>
            <ThemeColorBar/>
            <ToastContainer location={location}/>
        </>
    )
}

export default App