import Material from "./Material"
import MyLoader from "./MyLoader"

function Button({type = "first", className, loading, disable, onClick, onDisableClick, children})
{
    return (
        <Material className={`button ${type} ${className} ${loading ? "loading" : ""} ${disable ? "disable" : "active"}`} disable={disable || loading} onClick={onClick} onDisableClick={onDisableClick}>
            {
                loading ?
                    <MyLoader width={25}/>
                    :
                    children
            }
        </Material>
    )
}

export default Button