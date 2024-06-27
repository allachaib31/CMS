import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function LoansHistory() {
    return (
        <div className="px-[1rem] sm:px-0">
            <div>
                <Link to="/loans" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
            سجل القروض
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className='border border-slate-600' colSpan={22}>سجل القروض </th>
                        </tr>
                        <tr>
                            <th className='border border-slate-600' colSpan={6}>إجمالي القروض  </th>
                            <th className='border border-slate-600' colSpan={6}>إجمالي المبالغ المسددة </th>
                            <th className='border border-slate-600' colSpan={5}>إجمالي المبالغ المتبقية</th>
                            <th className='border border-slate-600' colSpan={5}>عدد القروض</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-slate-600' colSpan={6}></td>
                            <td className='border border-slate-600' colSpan={6}></td>
                            <td className='border border-slate-600' colSpan={5}></td>
                            <td className='border border-slate-600' colSpan={5}></td>
                        </tr>
                    </tbody>
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className='border border-slate-600' rowSpan={2}>اسم العضو</th>
                            <th className='border border-slate-600' rowSpan={2}>رقم الطلب  </th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ القرض  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ الطلب  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ استلام القرض  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ بداية التسديد  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ انتهاء التسديد  </th>
                            <th className='border border-slate-600' rowSpan={2}>عدد الأقساط  </th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ القسط الأول </th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ القسط الأخير </th>
                            <th className='border border-slate-600' rowSpan={2}>الأقساط المسددة  </th>
                            <th className='border border-slate-600' rowSpan={2}>الأقساط المتبقية  </th>
                            <th className='border border-slate-600' rowSpan={2}>المبالغ المسددة  </th>
                            <th className='border border-slate-600' rowSpan={2}>المبالغ المتبقية  </th>
                            <th className='border border-slate-600' rowSpan={2}>الأقساط المتأخرة  </th>
                            <th className='border border-slate-600' rowSpan={2}>المبالغ المتأخرة  </th>
                            <th className='border border-slate-600' rowSpan={2}>ملحوظات</th>
                            <th className='border border-slate-600' rowSpan={2}>تفاصيل أكثر</th>
                        </tr>
                        <tr>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoansHistory