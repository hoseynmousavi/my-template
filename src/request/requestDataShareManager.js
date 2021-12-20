const config = () =>
{
    if (!window.dataShare)
    {
        window.dataShare = function ({message})
        {
            const event = new CustomEvent("dataShare", {detail: {message}})
            window.dispatchEvent(event)
        }
    }
}

const dataShare = ({message}) =>
{
    config()
    window.dataShare({message})
}

const requestDataShareManager = {
    dataShare,
}

export default requestDataShareManager