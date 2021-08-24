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
    window.refreshToken({message})
}

const refreshTokenManager = {
    configRefreshToken,
    refreshToken,
}

export default refreshTokenManager