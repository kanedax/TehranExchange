import React, { useEffect, useState } from 'react'
import DateTime from './DateTime'
import { numberCharacterHandler } from '../../utils/NumberCharacter'
import SymbolHandler from '../../utils/Symbol'
import { httpServiceTime } from '../../Core/HttpService'
import { toast } from 'react-toastify'


const CashExchangeMarket = () => {
    const [CashExchangeMarketData, setCashExchangeMarketData] = useState(null)

    const handleGetCashExchange = async () => {
        try {
            const response = await httpServiceTime.get('/MarketData/GetMarketOverview/1')
            if (response.status === 200 && response.statusText === "OK") {
                setCashExchangeMarketData(response.data.marketOverview)
            } else {
                toast.error(response.statusText, {
                    position: "bottom-left",
                });
            }
        } catch (error) {
            toast.error(
                error,
                { position: "bottom-left" }
            );
        }
    }


    useEffect(() => {
        handleGetCashExchange()
    }, [])

    useEffect(() => {
        const intervale = setInterval(() => { handleGetCashExchange() }, 5000)
        return () => {
            clearInterval(intervale);
        };
    }, [CashExchangeMarketData])

    return (
        <>

            <div className='w-full h-2/3 border border-slate-400 rounded-lg shadow px-2 flex items-center justify-between'>
                <div>
                    <p>بازار نقدی بورس در یک نگاه</p>
                </div>
            </div>
            <div className='h-full px-2 pb-6 pt-1 text-sm border border-slate-400 shadow-lg rounded-lg bg-white -mt-4'>
                <div className='grid grid-cols-[40%_60%] gap-2'>
                    <div className='mt-3'>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>وضعیت بازار</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>شاخص کل</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>شاخص كل (هم وزن)</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>ارزش بازار</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>اطلاعات قیمت</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>تعداد معاملات</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>ارزش معاملات</p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p className=''>حجم معاملات</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-2 py-2 mt-3 hover:bg-slate-100 cursor-pointer '>
                            <p className={CashExchangeMarketData?.marketStateTitle === "بسته" ? `text-red-500` : `text-green-500`}>{CashExchangeMarketData?.marketStateTitle}
                            </p>
                            <DateTime />
                        </div>
                        <div className='flex gap-2 py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {numberCharacterHandler(CashExchangeMarketData?.indexLastValue)}
                            </p>

                            {SymbolHandler(CashExchangeMarketData?.indexChange)}

                        </div>
                        <div className='flex gap-2 py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {numberCharacterHandler(CashExchangeMarketData?.indexEqualWeightedLastValue)}
                            </p>
                            {SymbolHandler(CashExchangeMarketData?.indexEqualWeightedChange)}
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {numberCharacterHandler(CashExchangeMarketData?.marketValue)}
                            </p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {"1403/03/23"}
                                {" 16:23:55"}
                            </p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {numberCharacterHandler(CashExchangeMarketData?.marketActivityZTotTran)}
                            </p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {numberCharacterHandler(CashExchangeMarketData?.marketActivityQTotCap)}
                            </p>
                        </div>
                        <div className='py-2 hover:bg-slate-100 cursor-pointer'>
                            <p>
                                {numberCharacterHandler(CashExchangeMarketData?.marketActivityQTotTran)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CashExchangeMarket