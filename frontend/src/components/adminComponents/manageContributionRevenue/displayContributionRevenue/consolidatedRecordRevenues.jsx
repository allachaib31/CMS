import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getConsolidatedRecordRevenuesFetch } from '../../../../utils/apiFetch'

function ConsolidatedRecordRevenues() {
    const navigate = useNavigate();
    const [moneyBox, setMoneyBox] = useState(false);
    useEffect(() => {
        getConsolidatedRecordRevenuesFetch().then((res) => {
            console.log(res)
            setMoneyBox(res.data.moneyBox);
        }).catch((err) => {
            if (err.response.status == 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/subscription/payMonthlySubscriptions" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>

            <h1 className="text-center text-[1.1rem]ss sm:text-[1.5rem] font-bold py-[1rem]">السجل الموحد للإيرادات</h1>
            <div className="mt-[1rem] flex md:flex-row flex-col gap-[1rem] justify-center">
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] w-[70%] md:w-auto md:text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الايرادات</h1>
                    <h1 className="text-[0.8rem] w-[30%] md:w-auto text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox &&(moneyBox.source.subscriptions + moneyBox.source.commodityRevenue + moneyBox.source.contributionRevenues + moneyBox.source.loanIncome).toFixed(2)}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] w-[70%] md:w-auto md:text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الاشتراكات</h1>
                    <h1 className="text-[0.8rem] w-[30%] md:w-auto  text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.subscriptions.toFixed(2)}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] w-[70%] md:w-auto md:text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي إيراد السلع</h1>
                    <h1 className="text-[0.8rem] w-[30%] md:w-auto  text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.commodityRevenue.toFixed(2)}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] w-[70%] md:w-auto md:text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي إيرادات الأسهم</h1>
                    <h1 className="text-[0.8rem] w-[30%] md:w-auto  text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.contributionRevenues.toFixed(2)}</h1>
                </div>
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="text-[0.8rem] w-[70%] md:w-auto md:text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي إيرادات القروض</h1>
                    <h1 className="text-[0.8rem] w-[30%] md:w-auto  text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.loanIncome.toFixed(2)}</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[700px] mx-auto">
                    <thead className="text-center text-[1rem]">
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                نوع الايراد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                المبلغ
                            </th>
                            <th className="text-center border border-slate-600">
                                الملاحظات
                            </th>
                            <th className="text-center border border-slate-600">
                                تفاصيل اكثر
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            moneyBox && <>
                                <tr>
                                    <th className="border border-slate-600">الاشتراكات</th>
                                    <td className="border border-slate-600">{moneyBox.source.subscriptions.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                        {moneyBox.source.comment}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/subscription" className='btn btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">ايرادات السلع</th>
                                    <td className="border border-slate-600">{moneyBox.source.commodityRevenue.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                        {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/commodityRevenue"  className='btn btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">إيرادات الأسهم</th>
                                    <td className="border border-slate-600">{moneyBox.source.contributionRevenues.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                    {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/contributionRevenue" className='btn btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">ايرادات القروض</th>
                                    <td className="border border-slate-600">{moneyBox.source.loanIncome.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                    {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/loans" className='btn btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                            </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ConsolidatedRecordRevenues