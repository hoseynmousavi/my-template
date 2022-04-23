const configToast = () =>
{
    if (!window.addToast)
    {
        window.addToast = function ({message, type, onClick, isUndo})
        {
            const event = new CustomEvent("addToast", {detail: {message, type, onClick, isUndo}})
            window.dispatchEvent(event)
        }
    }
}

const addToast = ({message, type, onClick, isUndo}) =>
{
    window.addToast({message, type, onClick, isUndo})
}

const toastManager = {
    configToast,
    addToast,
}

export default toastManager