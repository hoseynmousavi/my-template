function MyTimer({className, color = "var(--toast-info-text)", text, percent = 0, haveBg = false, strokeWidth = 4})
{
    return (
        <div className={`timer-cont ${className}`}>
            <div className="timer-text">{text}</div>
            <svg className="timer" viewBox="25 25 50 50">
                <circle className="timer-path" style={{stroke: color, strokeDasharray: `${percent / 4 * 5}, 125`, opacity: !percent ? "0" : "1"}} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
                {haveBg && <circle className="timer-path transparent" style={{stroke: color, strokeDasharray: `125, 125`}} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>}
            </svg>
        </div>
    )
}

export default MyTimer