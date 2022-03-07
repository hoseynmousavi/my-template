import React, {memo, useEffect, useState} from "react"

function Route({location, path, render})
{
    const [params, setParams] = useState(null)

    useEffect(() =>
    {
        function checkParams()
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
                return tempParams
            }
            else return tempParams
        }

        setParams(checkParams())
    }, [location, path])

    if (params === null) return null
    else return <React.Fragment key={path}>{render({location: {pathname: location}, match: {params, path}})}</React.Fragment>
}

export default memo(Route)