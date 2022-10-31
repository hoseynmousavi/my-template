import {createRoot} from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./seyed-modules/helpers/withRouter"
import ThemeProvider from "./seyed-modules/context/theme/ThemeReducer"
import AuthProvider from "./context/auth/AuthReducer"
import changeColorVariablesConstant from "./constant/changeColorVariablesConstant"
import request from "./seyed-modules/request/request"
import AuthActions from "./context/auth/AuthActions"
import offlineSending from "./constant/offlineSending"
import changeFontVariablesConstant from "./constant/changeFontVariablesConstant"
import LanguageProvider from "./seyed-modules/context/language/LanguageReducer"

const root = createRoot(document.getElementById("root"))

const WrappedApp = withRouter(App)

root.render(
    <LanguageProvider changeVariables={changeFontVariablesConstant}>
        <ThemeProvider changeVariables={changeColorVariablesConstant}>
            <AuthProvider>
                <WrappedApp/>
            </AuthProvider>
        </ThemeProvider>
    </LanguageProvider>,
)

request.init({
    refreshFunc: AuthActions.getTokenWithRefreshToken,
    offlineSendingArr: offlineSending,
    // makeBaseOnEnvFunc
})

registerSW()