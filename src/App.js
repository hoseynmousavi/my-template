import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"
import {useEffect} from "react"
import blockIosSwipe from "./helpers/blockIosSwipe"

function App({location})
{
    useEffect(blockIosSwipe, [])

    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            YES
            <ToastContainer location={location}/>
        </div>
    )
}

export default App