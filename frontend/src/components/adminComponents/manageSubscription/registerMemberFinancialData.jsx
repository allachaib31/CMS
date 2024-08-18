import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getRegisterFinancialDataFetch } from '../../../utils/apiFetch';

function RegisterMemberFinancialData() {
    const [users, setUsers] = useState(false);
    useEffect(() => {
        getRegisterFinancialDataFetch().then((res) => {
            console.log(res);
            setUsers(res.data.users)
        })
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.1rem] sm:text-[1.5rem] font-bold py-[1rem]">
                سجل البيانات المالية للعضو
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1700px] mx-auto">
                    {/* head */}
                    <thead className='text-center text-[0.9rem]'>
                        <tr>
                            <th rowSpan={2} className='border border-slate-600'>اسم العضو</th>
                            <th className='text-center border border-slate-600' colSpan={2}>تاريخ الاشتراك</th>
                            <th className='text-center border border-slate-600' colSpan={2}>رصيد العضو</th>
                            <th rowSpan={2} className='border border-slate-600'>المصروف من <br />رصيده</th>
                            <th className='text-center border border-slate-600' colSpan={2}>القروض</th>
                            <th className='text-center border border-slate-600' colSpan={2}>الاعانات</th>
                            <th rowSpan={2} className='border border-slate-600'>ارباح السلع<br/> و المساهمات</th>
                            <th colSpan={2} className='border border-slate-600'>تاريخ انتهاء اشتراكه</th>
                            <th rowSpan={2} className='border border-slate-600'>الحالة</th>
                            <th rowSpan={2} className='border border-slate-600'>ملاحظات</th>
                        </tr>
                        <tr>
                            <th className='text-center border border-slate-600'>الميلادي</th>
                            <th className='text-center border border-slate-600'>الهجري</th>
                            <th className='text-center border border-slate-600'>مند بداية <br />اشتراكه</th>
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
                        {
                            users && users.map((user) => {
                                const createdAt = new Date(user.createdAt);
                                return (
                                    <tr className='text-center text-[0.8rem]'>
                                        <th className='border border-slate-600'>{user.idUser.name}</th>
                                        <td className='border border-slate-600'>{createdAt.getUTCFullYear() + "-" + (createdAt.getUTCMonth() + 1) + "-" + createdAt.getUTCDate()}</td>
                                        <td className='border border-slate-600'>{user.hijriDate.year}-{user.hijriDate.month.number}-{user.hijriDate.day}</td>
                                        <td className='border border-slate-600'>{user.idUser.cumulativeBalance.toFixed(2)}</td>
                                        <td className='border border-slate-600'>{user.idUser.memberBalance.toFixed(2)}</td>
                                        <td className='border border-slate-600'>{(user.idUser.cumulativeBalance - user.idUser.memberBalance).toFixed(2)}</td>
                                        <td className='border border-slate-600'>{user.idUser.loans.number}</td>
                                        <td className='border border-slate-600'>{user.idUser.loans.amount}</td>
                                        <td className='border border-slate-600'>{user.idUser.subsidies.number}</td>
                                        <td className='border border-slate-600'>{user.idUser.subsidies.amount}</td>
                                        <td className='border border-slate-600'>{user.idUser.commodityProfitsContributions}</td>
                                        <td className='border border-slate-600'>{user.idUser.subscriptionExpiryDate}</td>
                                        <td className='border border-slate-600'>{user.idUser.subscriptionExpiryDateHijri && user.idUser.subscriptionExpiryDateHijri.year + "-" + user.idUser.subscriptionExpiryDateHijri.month.number + "-" + user.idUser.subscriptionExpiryDateHijri.day}</td>
                                        <td className='border border-slate-600'>{user.idUser.status == "not active" ? "غير مفعل" : "مفعل"}</td>
                                        <td className='border border-slate-600'>{user.idUser.comments}</td>
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

export default RegisterMemberFinancialData;