import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIdUnReimbursedExpensesFetch, payCashUnReimbursedExpensesFetch, searchUnReimbursedExpensesFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function PaymentExpenses() {
    const [listId, setListId] = useState(false);
    const [selectId, setSelectId] = useState(false);
    const [users, setUsers] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getIdUnReimbursedExpensesFetch().then((res) => {
            console.log(res)
            setListId(res.data.unReimbursedExpenses);
        })
    }, []);
    const handleSearch = () => {
        searchUnReimbursedExpensesFetch(selectId).then((res) => {
            setUsers(res.data.cashPayUsers)
        })
    }
    const handleSubmit = (id,idUser,index) => {
        setShowAlert({
            display: false,
        });
        payCashUnReimbursedExpensesFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            let newList = [...users];
            newList[index].itPaid = true;
            setUsers(users)
            //document.getElementById(idUser).innerHTML = "تم الدفع"
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/unreimbursedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                دفع المصروفات
            </h1>
            <form action="" className='container mx-auto'>
                <select onChange={(event) => {
                    setSelectId(event.target.value)
                }} className="select select-bordered w-full max-w-xs">
                    <option disabled selected>اختر رقم الطلب </option>
                    {
                        listId && listId.map((value) => {
                            return (
                                <option value={value._id}>{value.id}</option>
                            )
                        })
                    }
                </select>
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSearch()
                }} className='btn btn-primary text-[1.1rem] font-bold'>ابحث</button>
            </form>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                    <tr>
                        <th className="border text-center border-slate-600">
                            رقم المستخدم
                        </th>
                        <th className="border text-center border-slate-600">
                            اسم المستخدم
                        </th>
                        <th className="border text-center border-slate-600">
                            المبلغ
                        </th>
                        <th className="border text-center border-slate-600">
                            دفع
                        </th>
                    </tr>
                    <tbody>
                        {
                            users && users.map((user,index) => {
                                return (
                                    <tr>
                                        <td className="border text-center border-slate-600">{user.idUser.id}</td>
                                        <td className="border text-center border-slate-600">{user.idUser.name}</td>
                                        <td className="border text-center border-slate-600">{user.amount.toFixed(2)}</td>
                                        <td id={user.idUser._id} className="border text-center border-slate-600">
                                            {user.itPaid ? "تم الدفع" : <button onClick={() => {
                                                handleSubmit({
                                                    id: user._id
                                                },user.idUser._id,index)
                                            }} className='btn btn-success'>دفع</button>}
                                        </td>
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

export default PaymentExpenses