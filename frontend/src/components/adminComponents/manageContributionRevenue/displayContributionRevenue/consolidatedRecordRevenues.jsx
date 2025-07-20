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
                <Link to="/subscription/payMonthlySubscriptions" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>

            <h1 className="text-center text-sm font-bold py-[0.5rem]">السجل الموحد للإيرادات</h1>
            <div className="mt-[0.5rem] flex lg:flex-row flex-col gap-[0.5rem] justify-center">
                <div className="flex items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الايرادات</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox &&(moneyBox.source.subscriptions + moneyBox.source.commodityRevenue + moneyBox.source.contributionRevenues + moneyBox.source.financialCompany + moneyBox.source.investmentBox).toFixed(2)}</h1>
                </div>
                {/**
                 *                  <div className="flex lg:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الاشتراكات</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto  text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.subscriptions.toFixed(2)}</h1>
                </div>
                <div className="flex lg:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي إيراد السلع</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto  text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.commodityRevenue.toFixed(2)}</h1>
                </div>
                <div className="flex lg:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي إيرادات الأسهم</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto  text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.contributionRevenues.toFixed(2)}</h1>
                </div>
                <div className="flex lg:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الشركات المالية</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto  text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.financialCompany.toFixed(2)}</h1>
                </div>
                <div className="flex lg:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الصناديق الاستثمارية</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto  text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.investmentBox.toFixed(2)}</h1>
                </div>
                <div className="flex lg:flex-col items-center gap-[0.5rem]">
                    <h1 className="text-sm w-[70%] lg:w-auto md:text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي إيرادات القروض</h1>
                    <h1 className="text-sm w-[30%] lg:w-auto  text-center bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{moneyBox && moneyBox.source.loanIncome.toFixed(2)}</h1>
                </div>
                 */}
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="table table-xs border-separate border-spacing-0 border w-[300px] sm:w-[700px] mx-auto">
                    <thead className="text-center text-xs">
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
                               
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            moneyBox && <>
                                <tr className='text-xs'>
                                    <th className="border border-slate-600">الاشتراكات</th>
                                    <td className="border border-slate-600">{moneyBox.source.subscriptions.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                        {moneyBox.source.comment}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/subscription/payMonthlySubscriptions" className='btn btn-sm text-xs btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">إيرادات السلع</th>
                                    <td className="border border-slate-600">{moneyBox.source.commodityRevenue.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                        {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/commodityRevenue"  className='btn btn-sm text-xs btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">إيرادات الأسهم</th>
                                    <td className="border border-slate-600">{moneyBox.source.contributionRevenues.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                    {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/stocks/stockRevenue" className='btn btn-sm text-xs btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">إيرادات الشركات</th>
                                    <td className="border border-slate-600">{moneyBox.source.financialCompany.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                    {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/financialCompany/contributionData" className='btn btn-sm text-xs btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">إيرادات الصناديق</th>
                                    <td className="border border-slate-600">{moneyBox.source.investmentBox.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                    {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/investmentBox/contributionData" className='btn btn-sm text-xs btn-info'>التفاصيل</Link> 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-slate-600">إيرادات القروض</th>
                                    <td className="border border-slate-600">{moneyBox.source.loanIncome.toFixed(2)}</td>
                                    <td className="border border-slate-600">
                                    {moneyBox.source.comments}
                                    </td>
                                    <td className="border border-slate-600">
                                        <Link to="/loans" className='btn btn-sm text-xs btn-info'>التفاصيل</Link> 
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