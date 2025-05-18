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
            <h1 className="text-center text-sm font-bold py-[0.5rem]">
                سجل المساهمات في الأسهم
            </h1>
            <div className="mt-[0.5rem] flex flex-col md:flex-row gap-[0.5rem] justify-center">
                <div className="flex md:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm md:w-auto w-[70%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي مبالغ الأسهم </h1>
                    <h1 className="text-sm md:w-auto w-[30%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{data && data.totalShareAmount}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm md:w-auto w-[70%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي مبالغ الأرباح</h1>
                    <h1 className="text-sm md:w-auto w-[30%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{data && data.totalProfitAmount}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm md:w-auto w-[70%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي عدد المساهمات</h1>
                    <h1 className="text-sm md:w-auto w-[30%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{data && data.totalNumberContribution}</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="text-xs table table-xs border-separate border-spacing-0 border w-[400px] sm:w-[550px] mx-auto">
                    <thead className="text-xs text-center">
                        <tr>
                            <th className="border border-slate-600">
                                رقم <br/>المساهمة
                            </th>
                            <th className="border border-slate-600">
                                اسم الجهة<br/> المساهم فيها
                            </th>
                            <th className="border border-slate-600">
                                مبلغ
                                المساهمة
                            </th>
                            <th className="border border-slate-600">
                                التاريخ <br/>الميلادي
                            </th>
                            <th className="border border-slate-600">
                                التاريخ <br/>الهجري
                            </th>
                            <th className="text-center border border-slate-600">
                                مبلغ<br/> البيع
                            </th>
                            <th className="text-center border border-slate-600">
                                مبلغ<br/> الريح
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            stocks && stocks.map((stock) => {
                                return (
                                    <tr className='text-xs'>
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