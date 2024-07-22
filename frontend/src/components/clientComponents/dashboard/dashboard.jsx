import React, { useEffect, useState } from 'react'
import { clientInformationFetch } from '../../../utils/apiFetch'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        commodityProfitsContributions: 0,
        cumulativeBalance: 0,
        memberBalance: 0,
        loans: 0,
        moneyBox: {
            amount: 0,
            cumulativeAmount: 0
        },
        subsidies: 0
    })
    useEffect(() => {
        clientInformationFetch().then((res) => {
            console.log(res)
            setData({
                commodityProfitsContributions: res.data.commodityProfitsContributions,
                cumulativeBalance: res.data.cumulativeBalance,
                memberBalance: res.data.memberBalance,
                loans: res.data.loans.amount,
                moneyBox: {
                    amount: res.data.moneyBox.amount,
                    cumulativeAmount: res.data.moneyBox.cumulativeAmount
                },
                subsidies: res.data.subsidies.amount
            })
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
            }
        })
    }, [])
    return (
        <div className="px-[1rem] sm:px-0 py-[2rem]">
            <div className="container mx-auto">
                <div className='flex flex-col gap-[1rem] justify-center items-center'>
                    <div className='flex flex-col items-center justify-center md:flex-row w-full bg-base-100'>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'>
                            <h1 className='text-[1.3rem] text-center font-bold'>رصيدك المالي الحالي</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.memberBalance.toFixed(2)}</h1>
                        </div>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'>
                            <h1 className='text-[1.3rem] text-center font-bold'>رصيدك المالي منذ بداية الاشتراك</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.cumulativeBalance.toFixed(2)}</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center md:flex-row w-full base-100'>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'>
                            <h1 className='text-[1.3rem] text-center font-bold'>رصيد الحالي لصندوق</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.moneyBox.amount.toFixed(2)}</h1>
                        </div>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'>
                            <h1 className='text-[1.3rem] text-center font-bold'>رصيد الصندوق منذ انشائه</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.moneyBox.cumulativeAmount.toFixed(2)}</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center md:flex-row w-full base-100'>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'> 
                            <h1 className='text-[1.3rem] text-center font-bold'>أرباح المساهمات وبيع السلع</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.commodityProfitsContributions.toFixed(2)}</h1>
                        </div>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'>
                            <h1 className='text-[1.3rem] text-center font-bold'>الاعانات</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.subsidies.toFixed(2)}</h1>
                        </div>
                    </div>
                    <div className='flex justify-center w-full base-100'>
                        <div className='flex flex-col justify-center items-center md:w-1/2 py-[2rem]'>
                            <h1 className='text-[1.3rem] text-center font-bold'>القروض</h1>
                            <h1 className='text-[1.3rem] text-center font-bold'>{data.loans.toFixed(2)}</h1>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard