import MyLoader from "../components/MyLoader"

function LoadingWrapper({haveBg})
{
    return (
        <div className={`loading-wrapper ${haveBg ? "have-bg" : ""}`}>
            <MyLoader width={40}/>
        </div>
    )
}

export default LoadingWrapper