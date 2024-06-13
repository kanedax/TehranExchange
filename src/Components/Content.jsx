import React from 'react'
import ExchangeTotalSituations from './SideTables/ExchangeTotalSituations'
import ChosenSymbolsContainer from './TableContainer/ChosenSymbolsContainer'


const Content = () => {
    return (
        <>
            <div className='py-4 px-4 border-b border-slate-400'><p className='font-slate-700'>بورس اوراق بهادار تهران</p></div>
            <div className='h-full grid grid-cols-[350px_1fr]'>
                <div >
                    <ExchangeTotalSituations />
                </div>
                <div>
                    <ChosenSymbolsContainer />
                </div>
            </div>
        </>
    )
}

export default Content