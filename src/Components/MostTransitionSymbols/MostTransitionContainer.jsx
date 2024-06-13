import React, { useEffect, useState } from 'react'
import { httpService } from '../../Core/HttpService'
import { toast } from 'react-toastify'
import ManagableTable from '../Tables/ManagableTable'
import { numberCharacterHandler } from '../../utils/NumberCharacter'

const MostTransitionContainer = () => {
    const [mostTransition, setMostTranssition] = useState([])
    const [show, setShow] = useState(true)
    const [showSearch, setShowSearch] = useState(false)
    const [searchedData, setSearchedData] = useState([])

    const handleGetMostTransitionSymbol = async () => {
        try {
            const response = await httpService.get('/ClosingPrice/GetTradeTop/MostVisited/1/7')
            if (response.status === 200 && response.statusText === "OK") {
                setMostTranssition(response.data.tradeTop)
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
        handleGetMostTransitionSymbol()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            handleGetMostTransitionSymbol()
        }, 10000)
        return () => {
            clearInterval(interval);
        };
    }, [mostTransition])

    const Columns = [
        {
            title: 'نماد',
            dataIndex: 'nemad',
            key: "nemad",
            width: "20%",
        },
        {
            title: 'پایانی',
            dataIndex: 'pClosing',
            key: "pClosing",
            width: "6%",
        },
        {
            title: '%',
            dataIndex: 'xDrNivJIdx004',
            key: "xDrNivJIdx004",
            width: "6%",
        },
        {
            title: 'آخرین',
            dataIndex: 'priceFirst',
            key: "priceFirst",
            width: "7%",
        },
        {
            title: '%',
            dataIndex: 'xVarIdxJRfV',
            key: "xVarIdxJRfV",
            width: "5%",
        },
        {
            title: 'کمترین',
            dataIndex: 'priceMin',
            key: "priceMin",
            width: "8%",
        },
        {
            title: 'بیشترین',
            dataIndex: 'priceMax',
            key: "priceMax",
            width: "8%",
        },
        {
            title: 'تعداد',
            dataIndex: 'zTotTran',
            key: "zTotTran",
            width: "8%",
        },
        {
            title: 'حجم',
            dataIndex: 'qTotTran5J',
            key: "qTotTran5J",
            width: "8%",
        },
        {
            title: 'ارزش',
            dataIndex: 'qTotCap',
            key: "qTotCap",
            width: "8%",
        },
    ];
    const tableData = mostTransition.map((i) => ({
        key: i.insCode,
        nemad: i.instrument.lVal18AFC + " - " + i.instrument.lVal30,
        pClosing: numberCharacterHandler(i.pClosing),
        priceFirst: numberCharacterHandler(i.priceFirst),
        priceMin: numberCharacterHandler(i.priceMin),
        priceMax: numberCharacterHandler(i.priceMax),
        zTotTran: numberCharacterHandler(i.zTotTran),
        qTotTran5J: numberCharacterHandler(i.qTotTran5J),
        qTotCap: numberCharacterHandler(i.qTotCap)
    }))

    const handleSearch = (e) => {
        const searchedItem = e.target.value;
        const response = mostTransition.filter((item) =>
            item.instrument.lVal30.includes(searchedItem) ||
            item.instrument.lVal18AFC.includes(searchedItem)
        )
        setSearchedData(response);
    };
    console.log(searchedData);
    return (
        <>
            <div>
                <div className='w-full border border-slate-400 rounded-lg py-3 mt-2 shadow px-2 flex items-center justify-between'>
                    <div>
                        <p>نماد های پر تراکنش</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        {showSearch ? <input type="text" onChange={(e) => handleSearch(e)} className='outline-none rounded-lg border border-slate-400 px-4 py-1' placeholder='جستجو' /> : null}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-5 h-5 text-green-600 cursor-pointer' onClick={() => setShowSearch(last => !last)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={show ? "w-5 h-5 text-red-500 cursor-pointer transition-all" : "w-5 h-5 text-red-500 cursor-pointer rotate-45 transition-all "} onClick={() => setShow(last => !last)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                <div className={show ? "inline transition-all" : "fixed -top-full transition-all"}>
                    <ManagableTable tableColumns={Columns} tableData={searchedData.length > 0 ? searchedData.map((i) => ({
                        key: i.insCode,
                        nemad: i.instrument.lVal18AFC + " - " + i.instrument.lVal30,
                        pClosing: numberCharacterHandler(i.pClosing),
                        priceFirst: numberCharacterHandler(i.priceFirst),
                        priceMin: numberCharacterHandler(i.priceMin),
                        priceMax: numberCharacterHandler(i.priceMax),
                        zTotTran: numberCharacterHandler(i.zTotTran),
                        qTotTran5J: numberCharacterHandler(i.qTotTran5J),
                        qTotCap: numberCharacterHandler(i.qTotCap)
                    })) : tableData} />
                </div>
            </div>
        </>
    )
}

export default MostTransitionContainer