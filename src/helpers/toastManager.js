const configToast = () =>
{
    if (!window.addToast)
    {
        window.addToast = function ({message, type})
        {
            const event = new CustomEvent("addToast", {detail: {message, type}})
            window.dispatchEvent(event)
        }
    }
}

const addToast = ({message, type}) =>
{
    window.addToast({message, type})
}

const toastManager = {
    configToast,
    addToast,
}

export default toastManager