import React from 'react'
import ChosenTableContainer from './ChosenTableContainer'
import MostTransitionContainer from '../MostTransitionSymbols/MostTransitionContainer'


const ChosenSymbolsContainer = () => {

    return (
        <>
            <div className='flex flex-col pl-4 max-w-[98%] pb-4'>
                <div>
                    <ChosenTableContainer />
                </div>
                <div>
                    <MostTransitionContainer/>
                </div>
            </div>
        </>
    )
}

export default ChosenSymbolsContainer
