import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';

function RegisterMemberFinancialData() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                سجل البيانات المالية للعضو
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
                    {/* head */}
                    <thead className='text-[1rem]'>
                        <tr>
                            <th rowSpan={2} className='border border-slate-600'>اسم العضو</th>
                            <th className='text-center border border-slate-600' colSpan={2}>تاريخ الاشتراك</th>
                            <th className='text-center border border-slate-600' colSpan={2}>رصيد العضو</th>
                            <th rowSpan={2} className='border border-slate-600'>المصروف من رصيده</th>
                            <th className='text-center border border-slate-600' colSpan={2}>القروض</th>
                            <th className='text-center border border-slate-600' colSpan={2}>الاعانات</th>
                            <th rowSpan={2} className='border border-slate-600'>ارباح السلع و المساهمات</th>
                            <th colSpan={2} className='border border-slate-600'>تاريخ انتهاء اشتراكه</th>
                            <th rowSpan={2} className='border border-slate-600'>الحالة</th>
                            <th rowSpan={2} className='border border-slate-600'>ملاحظات</th>
                        </tr>
                        <tr>
                            <th className='text-center border border-slate-600'>الميلادي</th>
                            <th className='text-center border border-slate-600'>الهجري</th>
                            <th className='text-center border border-slate-600'>مند بداية اشتراكه</th>
                            <th className='text-center border border-slate-600'>الحالي</th>
                            <th className='border border-slate-600'>عددها</th>
                            <th className='border border-slate-600'>مبلغها</th>
                            <th className='border border-slate-600'>عددها</th>
                            <th className='border border-slate-600'>مبلغها</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='border border-slate-600'>chaib ala eddine</th>
                            <td className='border border-slate-600'>04/12/2001</td>
                            <td className='border border-slate-600'>13/11/1443</td>
                            <td className='border border-slate-600'>1500</td>
                            <td className='border border-slate-600'>500</td>
                            <td className='border border-slate-600'>1000</td>
                            <td className='border border-slate-600'>0</td>
                            <td className='border border-slate-600'>0</td>
                            <td className='border border-slate-600'>0</td>
                            <td className='border border-slate-600'>0</td>
                            <td className='border border-slate-600'>2000</td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'></td>
                            <td className='border border-slate-600'>عند النقر على التفاصيل، تظهر جميع اشتراكات العضو
                                من بداية اشتراكه سواء لسنوات أو لسنة محددة</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegisterMemberFinancialData;