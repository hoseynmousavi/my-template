function checkNationalCode(input)
{
    if (
        !/^\d{10}$/.test(input) ||
        input === "0000000000" ||
        input === "1111111111" ||
        input === "2222222222" ||
        input === "3333333333" ||
        input === "4444444444" ||
        input === "5555555555" ||
        input === "6666666666" ||
        input === "7777777777" ||
        input === "8888888888" ||
        input === "9999999999"
    )
    {
        return false
    }
    else
    {
        const check = +input[9]
        let sum = 0
        let i
        for (i = 0; i < 9; ++i)
        {
            sum += +input[i] * (10 - i)
        }
        sum %= 11
        return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
    }
}

export default checkNationalCode