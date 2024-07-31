import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function RecordContributions() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/contributionRevenue/" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                سجل المساهمات
            </h1>
            <div className="mt-[1rem] flex lg:flex-row flex-col gap-[1rem] justify-center">
                <div className="w-full sm:w-auto flex lg:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] lg:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي مبالغ الاسهم</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="w-full sm:w-auto flex lg:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] lg:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي مبالغ مساهمات الصناديق الاستثمارية</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="w-full sm:w-auto flex lg:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] lg:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي مبالغ المساهمات في الشركات المالية</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="w-full sm:w-auto flex lg:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] lg:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي مبالغ الارباح</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="w-full sm:w-auto flex lg:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] lg:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي عدد المساهمات</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1500px] mx-auto">
                    <thead className="text-center text-[1rem]">
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                رقم المساهمة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                اسم الشركة المساهم فيها او البنك
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ المساهمة
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ المساهمة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                المبلغ بعد البيع/انتهاء المساهمة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ الربح
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                تفاصيل اكثر
                            </th>
                        </tr>
                        <tr>
                            <th className="text-center border border-slate-600">
                                الميلادي
                            </th>
                            <th className="text-center border border-slate-600">
                                الهجري
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <th className="border border-slate-600">123</th>
                            <td className="border border-slate-600">
                                bank1
                            </td>
                            <td className="border border-slate-600">
                                200
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                1000
                            </td>
                            <td className="border border-slate-600">
                                500
                            </td>
                            <td className="border border-slate-600">
                                <button className='btn btn-info'>التفاصيل</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecordContributions