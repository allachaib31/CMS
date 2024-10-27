import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { endDateUserFetch, getRegisterFinancialDataFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function RegisterMemberFinancialData() {
    const navigate = useNavigate();
    const [users, setUsers] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [endDate, setEndDate] = useState({
        id: "",
        name: ""
    })
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getRegisterFinancialDataFetch().then((res) => {
            setUsers(res.data.users)
        })
    }, []);
    const handleSubmit = () => {
        setSubmit((e) => !e);
        setShowAlert({
            display: false,
        });
        endDateUserFetch(endDate).then((res) => {
            setSubmit((e) => !e)
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setUsers(res.data.users)
        }).catch((err) => {
            setSubmit((e) => !e)
            if (err.response.status == 400 || err.response.status == 422 || err.response.status == 403) {
                setShowAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
                return
            } else if (err.response.status == 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
            return
        })
    }
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.1rem] sm:text-[1.5rem] font-bold py-[1rem]">
                سجل البيانات المالية للاعضاء
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1800px] mx-auto">
                    {/* head */}
                    <thead className='text-center text-[0.9rem]'>
                        <tr>
                            <th rowSpan={2} className='border border-slate-600'>اسم العضو</th>
                            <th className='text-center border border-slate-600' colSpan={2}>تاريخ الاشتراك</th>
                            <th className='text-center border border-slate-600' colSpan={2}>رصيد العضو</th>
                            <th rowSpan={2} className='border border-slate-600'>المصروف من <br />رصيده</th>
                            <th className='text-center border border-slate-600' colSpan={2}>القروض</th>
                            <th className='text-center border border-slate-600' colSpan={2}>الاعانات</th>
                            <th rowSpan={2} className='border border-slate-600'>ارباح السلع<br /> و المساهمات</th>
                            <th rowSpan={2} className='border border-slate-600'>تاريخ انتهاء اشتراكه <br/> الميلادي</th>
                            <th rowSpan={2} className='border border-slate-600'>تاريخ انتهاء اشتراكه <br/> الهجري</th>
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
                                        <td className='border border-slate-600'>{user.idUser.loans.amount.toFixed(2)}</td>
                                        <td className='border border-slate-600'>{user.idUser.subsidies.number}</td>
                                        <td className='border border-slate-600'>{user.idUser.subsidies.amount.toFixed(2)}</td>
                                        <td className='border border-slate-600'>{user.idUser.commodityProfitsContributions.toFixed(2)}</td>
                                        <td className='border border-slate-600' onClick={() => {
                                            if(!user.idUser.subscriptionExpiryDate){
                                                setEndDate({
                                                    id: user.idUser._id,
                                                    name: user.idUser.name
                                                })
                                                document.getElementById('endInscription').showModal()
                                            }
                                        }}>{user.idUser.subscriptionExpiryDate && new Date(user.idUser.subscriptionExpiryDate).getUTCFullYear() + "-" + (new Date(user.idUser.subscriptionExpiryDate).getUTCMonth() + 1) + "-" + new Date(user.idUser.subscriptionExpiryDate).getUTCDate()}</td>
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
            <dialog id="endInscription" className="modal">
                <div className="modal-box">
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    <h3 className="font-bold text-lg">انهاء الاشتراك لي  {endDate.name}</h3>
                    <p className="py-4">تنبيه في حالة انهاء اشتراكه لن تستطيع اعادة تفعيله</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                            <button className="btn btn-success" onClick={(event) => {
                                event.preventDefault();
                                handleSubmit();
                            }}>{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default RegisterMemberFinancialData;