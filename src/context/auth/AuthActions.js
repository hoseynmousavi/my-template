import {SET_USER} from "./AuthTypes"
import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import cookieHelper from "../../seyed-modules/helpers/cookieHelper"

const base = process.env.REACT_APP_REST_URL

function sendOtp({mobile, cancel})
{
    return request.post({base, url: apiUrlsConstant.sendOtp, data: {mobile}, cancel})
}

function loginOrSignup({mobile, code, dispatch})
{
    return request.post({base, url: apiUrlsConstant.sendOtp, data: {mobile, code}})
        .then(res =>
        {
            const {insertInstant, lastUpdateInstant} = res.user
            setUser({user: res, dispatch})
            return ({isSignUp: insertInstant === lastUpdateInstant})
        })
}

function getUser({dispatch})
{
    return request.get({base, url: apiUrlsConstant.getProfile, dontCache: true, dontToast: true})
        .then(user =>
        {
            setUser({user, dispatch})
        })
}

function getTokenWithRefreshToken()
{
    return request.get({base, url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
        .then(res =>
        {
            const {refreshToken, token} = res
            cookieHelper.setItem("token", token)
            cookieHelper.setItem("refreshToken", refreshToken)
            return true
        })
        .catch(() =>
        {
            return false
        })
}

function checkEmail({email, cancel})
{
    return request.get({base, url: apiUrlsConstant.checkEmail, param: `?email=${email}`, cancel})
}

function setUser({user, dispatch})
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

function logout()
{
    return request.post({base, url: apiUrlsConstant.logout, useRefreshToken: true})
}

const AuthActions = {
    sendOtp,
    loginOrSignup,
    getUser,
    checkEmail,
    setUser,
    getTokenWithRefreshToken,
    logout,
}

export default AuthActions