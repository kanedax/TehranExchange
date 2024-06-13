const SymbolHandler = (data) => {
    const symbol = String(data)
    const finalSymbol = symbol.slice(0, 1)
    const index = String(data)
    const finalIndex = index.slice(1)
    return <p className={finalSymbol === "-" ? "text-red-500" : "text-green-500"}>({finalIndex})</p>
}

export default SymbolHandler