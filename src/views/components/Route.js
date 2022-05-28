import React, {memo, useEffect, useState} from "react"

function Route({location, isRendering, path, render})
{
    const [params, setParams] = useState(null)

    useEffect(() =>
    {
        function calcParams(location)
        {
            let tempParams = {}
            const pathSections = path.match(/\/(:?)((\w|\.|-)+)/g)
            const pathnameSections = location.match(/\/(:?)((\w|\.|-)+)/g)
            if (pathSections && pathnameSections)
            {
                pathSections.forEach((item, index) =>
                {
                    if (item && pathnameSections[index]) tempParams[item.replace(/\/(:?)/g, "")] = pathnameSections[index].replace(/\//g, "")
                })
                setParams(tempParams)
            }
            else setParams(tempParams)
        }

        calcParams(location)
    }, [location, path])

    if (params) return <React.Fragment key={path}>{render({isRendering, location: {pathname: location}, match: {params, path}})}</React.Fragment>
    else return null
}

export default memo(Route)