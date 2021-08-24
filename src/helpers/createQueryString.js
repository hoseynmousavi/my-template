function createQueryString({params})
{
    const str = Object.keys(params).reduce((sum, item) => `${sum}${item}=${params[item]}&`, "?")
    return str.substr(0, str.length - 1)
}

export default createQueryString