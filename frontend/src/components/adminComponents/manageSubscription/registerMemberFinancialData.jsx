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
                <table className="text-[1rem] table w-[1700px] border mx-auto">
                    {/* head */}
                    <thead >
                        <tr>
                            <th rowSpan={2}>اسم العضو</th>
                            <th className='text-center' colSpan={2}>تاريخ الاشتراك</th>
                            <th className='text-center' colSpan={2}>رصيد العضو</th>
                            <th rowSpan={2}>المصروف من رصيده</th>
                            <th className='text-center' colSpan={2}>القروض</th>
                            <th className='text-center' colSpan={2}>الاعانات</th>
                            <th rowSpan={2}>ارباح السلع و المساهمات</th>
                            <th colSpan={2}>تاريخ انتهاء اشتراكه</th>
                            <th>الحالة</th>
                            <th>ملاحظات</th>
                        </tr>
                        <tr>
                            <th className='text-center'>الميلادي</th>
                            <th className='text-center'>الهجري</th>
                            <th className='text-center'>مند بداية اشتراكه</th>
                            <th className='text-center'>الحالي</th>
                            <th>عددها</th>
                            <th>مبلغها</th>
                            <th>عددها</th>
                            <th>مبلغها</th>
                            <th>الميلادي</th>
                            <th>الهجري</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>chaib ala eddine</th>
                            <td>04/12/2001</td>
                            <td>13/11/1443</td>
                            <td>1500</td>
                            <td>500</td>
                            <td>1000</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2000</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>عند النقر على التفاصيل، تظهر جميع اشتراكات العضو
                                من بداية اشتراكه سواء لسنوات أو لسنة محددة</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegisterMemberFinancialData;