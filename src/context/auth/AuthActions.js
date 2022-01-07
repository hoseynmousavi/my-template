import {SET_USER} from "./AuthTypes"
import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"

const sendOtp = ({mobile, cancel}) =>
{
    return request.post({url: apiUrlsConstant.sendOtp, data: {mobile}, cancel})
}

const loginOrSignup = ({mobile, code, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.sendOtp, data: {mobile, code}})
        .then(res =>
        {
            setUser({user: res, dispatch})
        })
}

const getUser = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getProfile, dontCache: true, dontToast: true})
        .then(user =>
        {
            setUser({user, dispatch})
        })
}

const getTokenWithRefreshToken = () =>
{
    return request.get({url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
        .then(res =>
        {
            const {refreshToken, token} = res
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
            return true
        })
        .catch(() =>
        {
            return false
        })
}

const checkEmail = ({email, cancel}) =>
{
    return request.post({url: apiUrlsConstant.checkEmail, data: {email}, cancel})
}

const setUser = ({user, dispatch}) =>
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

const logout = () =>
{
    return request.post({url: apiUrlsConstant.logout, useRefreshToken: true})
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