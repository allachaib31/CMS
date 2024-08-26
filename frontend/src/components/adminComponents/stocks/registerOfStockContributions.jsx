import React, { useEffect, useState } from 'react'
import { getStockContributionRecord } from '../../../utils/apiFetch'
import { useNavigate } from 'react-router-dom';

function RegisterOfStockContributions() {
    const navigate = useNavigate();
    const [stocks, setStocks] = useState(false);
    const [data, setData] = useState({
        totalShareAmount: 0,
        totalProfitAmount: 0,
        totalNumberContribution: 0
    })
    useEffect(() => {
        getStockContributionRecord().then((res) => {
            console.log(res)
            setStocks(res.data.soldStocks)
            setData({
                totalShareAmount: res.data.totalShareAmount,
                totalProfitAmount: res.data.totalProfitAmount,
                totalNumberContribution: res.data.totalNumberContribution
            })
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                سجل المساهمات في الأسهم
            </h1>
            <div className="mt-[1rem] flex flex-col md:flex-row gap-[1rem] justify-center">
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] md:w-auto w-[70%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي مبالغ الأسهم </h1>
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] md:w-auto w-[30%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{data && data.totalShareAmount}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] md:w-auto w-[70%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي مبالغ الأرباح</h1>
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] md:w-auto w-[30%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{data && data.totalProfitAmount}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] md:w-auto w-[70%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي عدد المساهمات</h1>
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] md:w-auto w-[30%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{data && data.totalNumberContribution}</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className="border border-slate-600">
                                رقم المساهمة
                            </th>
                            <th className="border border-slate-600">
                                اسم الجهة المساهم فيها
                            </th>
                            <th className="border border-slate-600">
                                مبلغ
                                المساهمة
                            </th>
                            <th className="border border-slate-600">
                                التاريخ الميلادي
                            </th>
                            <th className="border border-slate-600">
                                التاريخ الهجري
                            </th>
                            <th className="text-center border border-slate-600">
                                مبلغ البيع
                            </th>
                            <th className="text-center border border-slate-600">
                                مبلغ الريح
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            stocks && stocks.map((stock) => {
                                return (
                                    <tr>
                                        <th className="border border-slate-600">
                                            {stock.id}
                                        </th>
                                        <th className="border border-slate-600">
                                            {stock.nameContributingParty}
                                        </th>
                                        <td className="border border-slate-600">{stock.contributionAmount.toFixed(2)}</td>
                                        <td className="border border-slate-600">{new Date(stock.contributionDateMiladi).getUTCFullYear() + "-" + (new Date(stock.contributionDateMiladi).getUTCMonth() + 1) + "-" + new Date(stock.contributionDateMiladi).getUTCDate()}</td>
                                        <td className="border border-slate-600">{stock.contributionDateHijri && stock.contributionDateHijri.year + "-" + stock.contributionDateHijri.month.number + "-" + stock.contributionDateHijri.day}</td>
                                        <td className="border border-slate-600">{stock.stockSaleValue.toFixed(2)}</td>
                                        <td className="border border-slate-600">{(stock.stockSaleValue - stock.contributionAmount).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegisterOfStockContributions