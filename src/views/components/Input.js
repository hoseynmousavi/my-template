import {useEffect, useRef, useState, memo} from "react"
import regexConstant from "../../constant/regexConstant"
import checkNationalCode from "../../helpers/checkNationalCode"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import inputKeyDownEnter from "../../helpers/inputKeyDownEnter"
import AuthActions from "../../context/auth/AuthActions"
import inputConstant from "../../constant/inputConstant"
import MyLoader from "../../seyed-modules/components/MyLoader"
import CheckSvg from "../../seyed-modules/media/svg/CheckSvg"
import CloseSvg from "../../seyed-modules/media/svg/CloseSvg"
import {REQUEST_CANCEL} from "../../seyed-modules/constant/toastTypes"
import onScroll from "../../seyed-modules/helpers/onScroll"

function Input({
                   className, name, autoComplete = "on", focusOnMountDesktop, label, type = "text", validation, placeholder = "", onIconClick, disableOnScroll,
                   defaultValue, onChange, disabled, ltr, ltrPlaceHolder, Icon, required, onSubmit, onSubmitDisable, disableSubmit, labelClassName, iconClassName, noSpace,
               })
{
    const [validationLoading, setValidationLoading] = useState("")
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef(null)
    const validationTimer = useRef(null)
    const validationIconTimer = useRef(null)
    const validationCancel = useRef(null)

    useEffect(() =>
    {
        let scrollListener = null
        if (disableOnScroll) scrollListener = onScroll({callback: () => inputRef.current?.blur?.()})
        if (focusOnMountDesktop && window.innerWidth > 480) setTimeout(() => inputRef?.current?.focus(), 300)
        if (defaultValue)
        {
            if (validation)
            {
                if (validation === "email" || validation === "url")
                {
                    const value = numberCorrection(defaultValue.trim())
                    setValue(value)
                }
                else if (validation === "national_code")
                {
                    const value = numberCorrection(defaultValue.trim())
                    if (!isNaN(value) && value.length <= 10) setValue(value)
                }
                else if (validation === "phone")
                {
                    const value = numberCorrection(defaultValue.trim())
                    if (!isNaN(value) && value.length <= 11) setValue(value)
                }
            }
            else setValue(defaultValue.trim())
        }

        return () =>
        {
            scrollListener?.()
            clearTimeout(validationTimer.current)
            clearTimeout(validationIconTimer.current)
        }
        // eslint-disable-next-line
    }, [])

    function resetInput()
    {
        onInputChange({target: {value: ""}})
    }

    function onInputChange(e)
    {
        if (validation)
        {
            if (validation === "email")
            {
                const value = numberCorrection(e.target.value.trim())
                setValue(value)
                setValidationLoading("")
                clearTimeout(validationIconTimer.current)
                clearTimeout(validationTimer.current)
                if (regexConstant.EMAIL_REGEX.test(value))
                {
                    if (value !== defaultValue)
                    {
                        onChange({name, value: value || required ? null : ""})
                        if (validationCancel?.current?.cancel) validationCancel.current.cancel(REQUEST_CANCEL)
                        validationTimer.current = setTimeout(() =>
                        {
                            setValidationLoading("loading")
                            AuthActions.checkEmail({email: value, cancel: cancelSource => validationCancel.current = cancelSource})
                                .then(() =>
                                {
                                    setValidationLoading("NOK")
                                    setError(inputConstant.repeatedEmail)
                                })
                                .catch(err =>
                                {
                                    if (err?.response?.status === 404)
                                    {
                                        setValidationLoading("OK")
                                        validationIconTimer.current = setTimeout(() => setValidationLoading(""), 1000)
                                        onChange({name, value})
                                    }
                                    else setValidationLoading("NOK")
                                })
                        }, 250)
                    }
                    else onChange({name, value})
                }
                else
                {
                    onChange({name, value: value || required ? null : ""})
                    checkErrTimer()
                }
            }
            else if (validation === "national_code")
            {
                const value = numberCorrection(e.target.value.trim().slice(0, 10))
                if (!isNaN(value) && value.length <= 10) setValue(value)
                if (checkNationalCode(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "phone")
            {
                const value = numberCorrection(e.target.value.trim().slice(0, 11))
                if (!isNaN(value) && value.length <= 11) setValue(value)
                if (regexConstant.PHONE_REGEX.test(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "url")
            {
                const value = numberCorrection(e.target.value.trim())
                setValue(value)
                if (regexConstant.URL_REGEX.test(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
        }
        else
        {
            const {value} = e.target
            setValue(value)
            onChange({name, value: value.trim() ? value.trim() : required ? null : "", reset: resetInput})
            checkErrTimer()
        }
        setError("")
    }

    function checkErrTimer()
    {
        clearTimeout(validationTimer.current)
        validationTimer.current = setTimeout(onInputBlur, 800)
    }

    function onInputBlur()
    {
        const tempValue = inputRef.current.value.trim()
        let tempErr = ""
        if (!tempValue)
        {
            if (required) tempErr = inputConstant.requiredField
        }
        else
        {
            if (validation)
            {
                if (validation === "email")
                {
                    if (!regexConstant.EMAIL_REGEX.test(tempValue)) tempErr = inputConstant.unValidEmail
                }
                else if (validation === "national_code")
                {
                    if (!checkNationalCode(tempValue)) tempErr = inputConstant.unValidNationalCode
                }
                else if (validation === "phone")
                {
                    if (!regexConstant.PHONE_REGEX.test(tempValue)) tempErr = inputConstant.unValidPhone
                }
                else if (validation === "url")
                {
                    if (!regexConstant.URL_REGEX.test(tempValue)) tempErr = inputConstant.unValidUrl
                }
            }
        }
        setError(tempErr)
    }

    return (
        <label className={`input-label ${className}`}>
            <p className={`input-label-text ${labelClassName}`}>{label}</p>
            <div className="input-label-relative">
                <input autoComplete={autoComplete}
                       name={name}
                       className={`input-main ${ltrPlaceHolder ? "ltr-placeholder" : ""} ${Icon || (validation && value) ? "have-icon" : ""} ${error ? "err" : ""} ${ltr ? "ltr" : ""}`}
                       disabled={disabled}
                       ref={inputRef}
                       type={type}
                       placeholder={placeholder}
                       value={value}
                       onChange={onInputChange}
                       onBlur={onInputBlur}
                       onKeyDown={onSubmit || onSubmitDisable ? inputKeyDownEnter({onSubmit, onSubmitDisable, disableSubmit, checkValidation: onInputBlur}) : undefined}
                />
                {
                    Icon ?
                        <Icon className={`input-icon icon ${iconClassName} ${ltr ? "" : "rtl"}`} onClick={onIconClick}/>
                        :
                        <>
                            <MyLoader width={24} className={`input-icon validation ${iconClassName} ${validationLoading === "loading" ? "show" : ""} ${ltr ? "" : "rtl"}`}/>
                            <CheckSvg className={`input-icon validation ${iconClassName} ${validationLoading === "OK" ? "show" : ""} ${ltr ? "" : "rtl"}`}/>
                            <CloseSvg className={`input-icon validation ${iconClassName} ${validationLoading === "NOK" ? "show" : ""} ${ltr ? "" : "rtl"}`}/>
                        </>
                }
            </div>
            <div className={`input-label-err ${noSpace ? "no-space" : ""} ${error ? "show" : ""}`}>{error}</div>
        </label>
    )
}

export default memo(Input)