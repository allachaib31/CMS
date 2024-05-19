import React from 'react'
import { Link } from 'react-router-dom';

function DisplaySubscription() {
    return (
        <div className="px-[1rem] sm:px-0">
            <div className='mb-[1rem] flex sm:flex-row sm:gap-1 gap-[1rem] flex-col '>
                <Link to="/subscription/modifySubscriptionAmount" className="text-[1rem] btn btn-primary">
                    تعديل مبلغ الاشتراكات
                </Link>
                <Link to="/subscription/registerMemberFinancialData" className="text-[1rem] btn btn-primary">
                    سجل بيانات العضو المالية
                </Link>
                <Link to="/subscription/subscriptionHistory" className="text-[1rem] btn btn-primary">
                    سجل الاشتراكات
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">سجل الاشتراكات السنوي</h1>
            <div className="overflow-x-auto  mt-[2rem]">
                <table className="table text-[1rem] w-[1600px]">
                    {/* head */}
                    <thead className='text-[1rem]'>
                        <tr>
                            <th>الاسم</th>
                            <th>محرم</th>
                            <th>صفر</th>
                            <th>ربيع الاول</th>
                            <th>ربيع الثاني</th>
                            <th>جمادى الاول</th>
                            <th>جمادى الثاني</th>
                            <th>رجب</th>
                            <th>شعبان</th>
                            <th>رمضان</th>
                            <th>شوال</th>
                            <th>ذو القعدة</th>
                            <th>ذو الحجة</th>
                            <th>رصيد العضو</th>
                            <th>المتاخرات</th>
                            <th>تفاصيل اكثر</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>ala chaib</th>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>1200</td>
                            <td>0</td>
                            <td><button className="btn btn-info">التفاصيل</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DisplaySubscription;