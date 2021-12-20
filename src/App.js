import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"

function App({location})
{
    return (
        <>
            YES
            <ThemeColorBar/>
            <ToastContainer location={location}/>
        </>
    )
}

export default App