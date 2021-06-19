function MyLoader(props)
{
    return (
        <svg className={`circular ${props.className}`} width={props.width} height={props.width} viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth={props.strokeWidth || 4} strokeMiterlimit="10"/>
        </svg>
    )
}

export default MyLoader