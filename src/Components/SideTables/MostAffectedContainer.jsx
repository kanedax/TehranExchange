import React, { useEffect, useState } from 'react'
import { httpService } from '../../Core/HttpService'
import { toast } from 'react-toastify'
import ManagableTable from '../Tables/ManagableTable'
import { numberCharacterHandler } from '../../utils/NumberCharacter'
import SymbolHandler from '../../utils/Symbol'

const MostAffectedContainer = () => {
    const [mostAffected, setMostAffected] = useState([])
    const handleGetMostAffected = async () => {
        try {
            const response = await httpService.get('/Index/GetInstEffect/0/1/7')
            if (response.status === 200 && response.statusText === "OK") {
                setMostAffected(response.data.instEffect)
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
        handleGetMostAffected()
    }, [])

    const Columns = [
        {
            title: 'نماد',
            dataIndex: 'lVal18AFC',
            key: "lVal18AFC",
            width: "10%",
        },
        {
            title: 'قیمت پایانی',
            dataIndex: 'pClosing',
            key: "pClosing",
            width: "6%",
        },
        {
            title: 'تاثیر',
            dataIndex: 'instEffectValue',
            key: "instEffectValue",
            width: "6%",
        },
    ]
    const tableData = mostAffected?.map((i)=>({
        key:i.insCode,
        lVal18AFC:i.instrument.lVal18AFC,
        pClosing:numberCharacterHandler(i.pClosing),
        instEffectValue:SymbolHandler(i.instEffectValue)
    }))
    return (
        <>
            <div>
                <div className='w-full border border-slate-400 rounded-lg py-3  shadow px-2 flex items-center justify-between'>
                    <div>
                        <p>تاثیر بر شاخص</p>
                    </div>
                </div>
                <div>
                    <ManagableTable tableColumns={Columns} tableData={tableData} />
                </div>
            </div>
        </>
    )
}

export default MostAffectedContainer