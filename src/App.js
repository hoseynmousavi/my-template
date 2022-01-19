import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"

function App({location})
{
    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            YES
            <ToastContainer location={location}/>
        </div>
    )
}

export default App