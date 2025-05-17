import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getEndUserFetch, withdrawBalanceFetch } from '../../../utils/apiFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../alert/alert';

function WithdrawMemberBalance() {
    const navigate = useNavigate();
    const [users, setUsers] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = (id) => {
        setSubmit((e) => !e);
        setShowAlert({
            display: false,
        });
        withdrawBalanceFetch({ id }).then((res) => {
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
    };
    useEffect(() => {
        getEndUserFetch().then((res) => {
            setUsers(res.data.users)
        }).catch((err) => {
            if (err.response.status == 401) {
                navigate("/auth");
            }
        })
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/subscription" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="table table-xs border-separate border-spacing-2 border w-[500px] mx-auto">
                    <thead className='text-center text-xs'>
                        <tr className='text-xs'>
                            <th rowSpan={2} className='border border-slate-600'>اسم العضو</th>
                            <th rowSpan={2} className='text-center border border-slate-600'>رصيد العضو</th>
                            <th colSpan={2} className='border border-slate-600'>تاريخ انتهاء اشتراكه</th>
                            <th rowSpan={2} className='text-center border border-slate-600'>سحب</th>
                        </tr>
                        <tr className='text-xs'>
                            <th className='text-center border border-slate-600'>الميلادي</th>
                            <th className='text-center border border-slate-600'>الهجري</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user) => {
                                return (
                                    <tr className='text-center text-xs'>
                                        <th className='border border-slate-600'>{user.name}</th>
                                        <th className='border border-slate-600'>{user.memberBalance.toFixed(2)}</th>
                                        <th className='border border-slate-600'>{user.subscriptionExpiryDate && new Date(user.subscriptionExpiryDate).getUTCFullYear() + "-" + (new Date(user.subscriptionExpiryDate).getUTCMonth() + 1) + "-" + new Date(user.subscriptionExpiryDate).getUTCDate()}</th>
                                        <th className='border border-slate-600'>{user.subscriptionExpiryDateHijri && user.subscriptionExpiryDateHijri.year + "-" + user.subscriptionExpiryDateHijri.month.number + "-" + user.subscriptionExpiryDateHijri.day}</th>
                                        <th className='border border-slate-600'><button onClick={() => {
                                            if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                                handleSubmit(user._id);
                                            }
                                        }} className='btn btn-sm text-xs btn-success'>{submit ? <span className="loading loading-ring loading-lg"></span> : "سحب"}</button></th>
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

export default WithdrawMemberBalance