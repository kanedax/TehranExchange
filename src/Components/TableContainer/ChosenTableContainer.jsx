import React, { useEffect, useState } from 'react'
import { httpService } from '../../Core/HttpService';
import ManagableTable from '../Tables/ManagableTable';
import { toast } from 'react-toastify';
import { numberCharacterHandler } from '../../utils/NumberCharacter';
import SymbolHandler from '../../utils/Symbol';
import PercentRounder from '../../utils/Rounder';


const ChosenTableContainer = () => {
    const [chosenTableData, setChosenTableData] = useState([])
    const [show, setShow] = useState(true)
    const [showSearch, setShowSearch] = useState(false)
    const [searchedData, setSearchedData] = useState([])

    const handleGetChosenSymbols = async () => {
        try {
            const response = await httpService.get("/Index/GetIndexB1LastAll/SelectedIndexes/1")
            if (response.status === 200 && response.statusText === "OK") {
                setChosenTableData(response.data.indexB1)
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
        handleGetChosenSymbols()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            handleGetChosenSymbols()
        }, 300000)
        return () => {
            clearInterval(interval);
        };
    }, [chosenTableData])

    const Columns = [
        {
            title: 'شاخص',
            dataIndex: 'lVal30',
            key: "lVal30",
            width: "15%",
        },
        {
            title: 'زمان انتشار',
            dataIndex: 'hEven',
            key: "hEven",
            width: "6%",
        },
        {
            title: 'مقدار',
            dataIndex: 'xDrNivJIdx004',
            key: "xDrNivJIdx004",
            width: "6%",
        },
        {
            title: 'تغییر',
            dataIndex: 'indexChange',
            key: "indexChange",
            width: "7%",
        },
        {
            title: 'درصد',
            dataIndex: 'xVarIdxJRfV',
            key: "xVarIdxJRfV",
            width: "5%",
        },
        {
            title: 'کمترین',
            dataIndex: 'xPbNivJIdx004',
            key: "xPbNivJIdx004",
            width: "8%",
        },
        {
            title: 'بیشترین',
            dataIndex: 'xPhNivJIdx004',
            key: "xPhNivJIdx004",
            width: "8%",
        },
    ];

    const hEvenhandler = (data) => {
        const t = String(data)
        const hour = t.slice(0, 2)
        const min = t.slice(2, 4)
        return hour + ":" + min
    }
    const tableData = chosenTableData?.map((i) => ({
        key: i.insCode,
        lVal30: i.lVal30,
        hEven: hEvenhandler(i.hEven),
        xDrNivJIdx004: numberCharacterHandler(i.xDrNivJIdx004),
        indexChange: SymbolHandler(i.indexChange),
        xVarIdxJRfV: PercentRounder(i.xVarIdxJRfV),
        xPbNivJIdx004: numberCharacterHandler(i.xPbNivJIdx004),
        xPhNivJIdx004: numberCharacterHandler(i.xPhNivJIdx004),
    }))
    const handleSearch = (e) => {
        const searchedItem = e.target.value;
        const response = chosenTableData.filter((item) =>
            item.lVal30.includes(searchedItem)
        )
        setSearchedData(response);
    };

    return (
        <>
            <div>
                <div className='w-full border border-slate-400 rounded-lg py-3 mt-2 shadow px-2 flex items-center justify-between'>
                    <div>
                        <p>شاخص های منتخب</p>
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
                        lVal30: i.lVal30,
                        hEven: hEvenhandler(i.hEven),
                        xDrNivJIdx004: numberCharacterHandler(i.xDrNivJIdx004),
                        indexChange: SymbolHandler(i.indexChange),
                        xVarIdxJRfV: PercentRounder(i.xVarIdxJRfV),
                        xPbNivJIdx004: numberCharacterHandler(i.xPbNivJIdx004),
                        xPhNivJIdx004: numberCharacterHandler(i.xPhNivJIdx004),
                    })) : tableData} />
                </div>
            </div>
        </>
    )
}

export default ChosenTableContainer