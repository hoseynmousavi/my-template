import MyLoaderIos from "./MyLoaderIos"
import checkOs from "../../helpers/checkOs"

function MyLoader({className, width = 40, strokeWidth = 3})
{
    if (checkOs() === "mac" || checkOs() === "ios") return <MyLoaderIos className={className} width={width}/>
    else
    {
        return (
            <svg className={`circular ${className}`} width={width} height={width} viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
            </svg>
        )
    }
}

export default MyLoader