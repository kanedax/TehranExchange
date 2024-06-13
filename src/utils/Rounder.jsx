const PercentRounder = (data) => {
    const symbol = String(data)
    const finalSymbol = symbol.slice(0, 1)
    const index = String(data)
    const finalIndex = index.slice(1)
    const n = +finalIndex;
    const rounded = Math.ceil(n * 100) / 100;
    return <p className={finalSymbol === "-" ? "text-red-500" : "text-green-500"}>({rounded.toFixed(2)})</p>
}

export default PercentRounder