import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./views/containers/withRouter"
import ThemeProvider from "./context/theme/ThemeReducer"

const WrappedApp = withRouter(App)

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <WrappedApp/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
)

registerSW()