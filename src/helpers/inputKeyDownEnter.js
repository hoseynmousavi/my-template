function inputKeyDownEnter({disableSubmit, onSubmit, onSubmitDisable, checkValidation})
{
    return function (e)
    {
        if (e.key === "Enter")
        {
            if (!disableSubmit)
            {
                if (onSubmit) onSubmit()
            }
            else
            {
                if (checkValidation) checkValidation()
                if (onSubmitDisable) onSubmitDisable()
            }
        }
    }
}

export default inputKeyDownEnter