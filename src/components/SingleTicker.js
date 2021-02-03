import React, { useState,useEffect } from 'react'

export default function SingleTicker({ticker}) {
    const [exchange, setExchange] = useState(null)
    const [marketCap, setMarketCap] = useState(null)
    const [float, setFloat] = useState(null)
    const [logo, setLogo] = useState(null)
    const tickerSymbol = ticker

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${tickerSymbol}&token=sandbox_c007t0n48v6r2qrrjr90`)
            .then(results => results.json())
            .then(data => {
                setExchange(data.exchange)
                setMarketCap(data.marketCapitalization)
                setFloat(data.shareOutstanding)
                setLogo(data.logo)
                
            });
      }, []);


    return(
        <div style={{'display':'flex', 'flexDirection':'row', 'justifyContent': 'space-between', 'height':'20px', 'width':'80vw', 'borderBottom':'1px solid black'}}>
            <div>{tickerSymbol}</div>
            <div>{exchange}</div>
            <div>{marketCap}</div>
            <div>{float}</div>
            <div>{logo}</div>
        </div>
    )
}