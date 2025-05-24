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
                <Link to="/subscription" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center font-bold py-[0.5rem]">
                سجل البيانات المالية للاعضاء
            </h1>
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="table table-xs border-separate border-spacing-0 border w-[600px] md:w-[1200px] mx-auto">
                    {/* head */}
                    <thead className='text-center'>
                        <tr className='text-xs'>
                            <th rowSpan={2} className='border border-slate-600'>اسم العضو</th>
                            <th className='text-center border border-slate-600' colSpan={2}> الاشتراك</th>
                            <th className='text-center border border-slate-600' colSpan={2}>رصيد العضو</th>
                            <th rowSpan={2} className='border border-slate-600'>المصروف  <br />من رصيده</th>
                            <th className='text-center border border-slate-600' colSpan={2}>القروض</th>
                            <th className='text-center border border-slate-600' colSpan={2}>الاعانات</th>
                            <th rowSpan={2} className='border border-slate-600'>ارباح السلع<br /> و المساهمات</th>
                            <th rowSpan={2} className='border border-slate-600'>تاريخ انتهاء<br/> اشتراكه الميلادي</th>
                            <th rowSpan={2} className='border border-slate-600'>تاريخ انتهاء<br/> اشتراكه الهجري</th>
                            <th rowSpan={2} className='border border-slate-600'>الحالة</th>
                            <th rowSpan={2} className='border border-slate-600'>ملاحظات</th>
                        </tr>
                        <tr className='text-xs'>
                            <th className='text-center border border-slate-600'>ميلادي</th>
                            <th className='text-center border border-slate-600'>هجري</th>
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
                                    <tr className='text-center text-xs'>
                                        <th className='border border-slate-600 text-xs'>{user.idUser.name}</th>
                                        <td className='border border-slate-600 text-xs'>{createdAt.getUTCFullYear() + "-" + (createdAt.getUTCMonth() + 1) + "-" + createdAt.getUTCDate()}</td>
                                        <td className='border border-slate-600 text-xs'>{user.hijriDate.year}-{user.hijriDate.month.number}-{user.hijriDate.day}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.cumulativeBalance.toFixed(2)}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.memberBalance.toFixed(2)}</td>
                                        <td className='border border-slate-600 text-xs'>{(user.idUser.cumulativeBalance - user.idUser.memberBalance).toFixed(2)}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.loans.number}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.loans.amount.toFixed(2)}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.subsidies.number}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.subsidies.amount.toFixed(2)}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.commodityProfitsContributions.toFixed(2)}</td>
                                        <td className='border border-slate-600 text-xs' onClick={() => {
                                            if(!user.idUser.subscriptionExpiryDate){
                                                setEndDate({
                                                    id: user.idUser._id,
                                                    name: user.idUser.name
                                                })
                                                document.getElementById('endInscription').showModal()
                                            }
                                        }}>{user.idUser.subscriptionExpiryDate && new Date(user.idUser.subscriptionExpiryDate).getUTCFullYear() + "-" + (new Date(user.idUser.subscriptionExpiryDate).getUTCMonth() + 1) + "-" + new Date(user.idUser.subscriptionExpiryDate).getUTCDate()}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.subscriptionExpiryDateHijri && user.idUser.subscriptionExpiryDateHijri.year + "-" + user.idUser.subscriptionExpiryDateHijri.month.number + "-" + user.idUser.subscriptionExpiryDateHijri.day}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.status == "not active" ? "غير مفعل" : "مفعل"}</td>
                                        <td className='border border-slate-600 text-xs'>{user.idUser.comments}</td>
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
                    <h3 className="font-bold text-sm">انهاء الاشتراك لي  {endDate.name}</h3>
                    <p className="py-4">تنبيه في حالة انهاء اشتراكه لن تستطيع اعادة تفعيله</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm">اغلاق</button>
                            <button className="btn btn-sm btn-success" onClick={(event) => {
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