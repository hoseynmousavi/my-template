const configRefreshToken = () =>
{
    if (!window.refreshToken)
    {
        window.refreshToken = function ({message})
        {
            const event = new CustomEvent("refreshToken", {detail: {message}})
            window.dispatchEvent(event)
        }
    }
}

const refreshToken = ({message}) =>
{
    configRefreshToken()
    window.refreshToken({message})
}

const refreshTokenManager = {
    refreshToken,
}

export default refreshTokenManager