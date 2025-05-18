import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { useNavigate } from 'react-router-dom';
import { getActiveStockFetch } from '../../../utils/apiFetch';

function StockRevenue() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [hijriDate, setHijriDate] = useState(hijriDateObject(date));
    const [stocks, setStocks] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(()=> {
        getActiveStockFetch(date).then((res) => {
            console.log(res)
            setStocks(res.data.stocks);
            setTotal(res.data.total);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [date])
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-sm font-bold py-[0.5rem]">
                إيرادات الأسهم
            </h1>
            <div className='text-sm flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
                <label>إيرادات الأسهم لشهر</label>
                <input type="date" onChange={(event) => {
                    setDate(event.target.value);
                    setHijriDate(hijriDateObject(event.target.value))
                }} value={date} className='input input-sm input-bordered' />
                <label>
                    الموافق {" "}
                    {hijriDate ? (
                        <span>
                            {hijriDate[2]}/{hijriDate[1].number}/
                            {hijriDate[0]}
                        </span>
                    ) : (
                        ""
                    )}
                </label>
            </div>
            <div className='mt-[0.5rem] flex justify-center gap-[0.2rem] sm:gap-[0.5rem]'>
                <h1 className='text-sm  w-[70%] sm:w-auto bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]'>إجمالي إيرادات المساهمات لهذا الشهر</h1>
                <span className='text-sm  w-[30%] text-center sm:w-auto bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]'>{total}</span>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-xs table table-xs border-separate border-spacing-0 border w-[350px] md:w-[550px] mx-auto">
                    <thead className="text-xs text-center">
                        <tr>
                            <th className="border border-slate-600"> رقم <br/>المساهمة</th>
                            <th className="border border-slate-600">اسم الجهة<br/> المساهمة فيها </th>
                            <th className="border border-slate-600">المبلغ</th>
                            <th className="border border-slate-600">التاريخ <br/>الميلادي</th>
                            <th className="border border-slate-600">التاريخ <br/>الهجري</th>
                            <th className="border border-slate-600">ملاحظات </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            stocks && stocks.map((stock) => {
                                return (
                                    <tr className='text-xs'>
                                        <th className="border border-slate-600">{stock.id}</th>
                                        <th className="border border-slate-600">{stock.nameContributingParty}</th>
                                        <th className="border border-slate-600">{stock.stockSaleValue - stock.totalCostOfStock}</th>
                                        <th className="border border-slate-600">{new Date(stock.dateSaleMiladi).getUTCFullYear() + "-" + (new Date(stock.dateSaleMiladi).getUTCMonth() + 1) + "-" + new Date(stock.dateSaleMiladi).getUTCDate()}</th>
                                        <th className="border border-slate-600">{stock.dateSaleHijri.year + "-" + stock.dateSaleHijri.month.number + "-" + stock.dateSaleHijri.day}</th>
                                        <th className="border border-slate-600"></th>
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

export default StockRevenue