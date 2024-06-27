import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function RecordInstallments() {
    return (
        <div className="px-[1rem] sm:px-0">
            <div>
                <Link to="/loans" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <td className='border border-slate-600' colSpan={8}>سجل الاقساط</td>
                        </tr>
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                اسم العضو
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ القرض
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                عدد الأقساط
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                الأقساط المسددة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                الأقساط المتبقية
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ المسدد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ المتبقي
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                    </tbody>
                    <tr className='text-center'>
                        <th className="border border-slate-600" rowSpan={2}>
                            رقم القسط
                        </th>
                        <th className="border border-slate-600" rowSpan={2}>
                            مبلغ القسط
                        </th>
                        <th className="border border-slate-600" colSpan={2}>
                            تاريخ التسديد الفعلي
                        </th>
                        <th className="border border-slate-600" colSpan={2}>
                            تاريخ التسديد المطلوب
                        </th>
                        <th className="border border-slate-600" rowSpan={2}>
                            مبلغ القسط المتأخر
                        </th>
                    </tr>
                    <tr className='text-center'>
                        <th className="border border-slate-600">
                            الميلادي
                        </th>
                        <th className="border border-slate-600">
                            الهجري
                        </th>
                        <th className="border border-slate-600">
                            الميلادي
                        </th>
                        <th className="border border-slate-600">
                            الهجري
                        </th>
                    </tr>
                    <tbody>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecordInstallments