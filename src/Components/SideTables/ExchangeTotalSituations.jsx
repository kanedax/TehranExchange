import React from 'react'
import CashExchangeMarket from './CashExchangeMarket'
import MostAffectedContainer from './MostAffectedContainer'

const ExchangeTotalSituations = () => {
  return (
    <>
    <div className='w-full grid grid-rows-[0.5fr_0.5fr] px-2 mt-2'>
        <CashExchangeMarket/>
        <MostAffectedContainer/>
    </div>
    </>
  )
}

export default ExchangeTotalSituations
