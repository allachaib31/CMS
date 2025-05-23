import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getIdUnReimbursedExpensesFetch, payCashUnReimbursedExpensesFetch, searchUnReimbursedExpensesFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function PaymentExpenses() {
    const navigate = useNavigate();
    const [listId, setListId] = useState(false);
    const [selectId, setSelectId] = useState(false);
    const [users, setUsers] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getIdUnReimbursedExpensesFetch().then((res) => {
            setListId(res.data.unReimbursedExpenses);
            console.log(res.data)
        })
    }, []);
    const handleSearch = () => {
        searchUnReimbursedExpensesFetch(selectId).then((res) => {
            setUsers(res.data.cashPayUsers)
        })
    }
    const handleSubmit = (id, idUser, index) => {
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
            if (err.response.status == 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/unreimbursedExpenses/" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center font-bold py-[0.5rem]">
                تسديد المصروفات
            </h1>
            <form action="" className='container mx-auto'>
                <select onChange={(event) => {
                    setSelectId(event.target.value)
                }} className="select select-sm select-bordered w-full max-w-[9rem]">
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
                }} className='btn btn-sm btn-primary font-bold'>ابحث</button>
            </form>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className=" table table-xs border-separate border-spacing-0 border w-[300px] md:w-[600px] mx-auto">
                    <tr className='text-xs'>
                        <th className="border text-center border-slate-600">
                            رقم <br />المستخدم
                        </th>
                        <th className="border text-center border-slate-600">
                            اسم <br />المستخدم
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
                            users && users.map((user, index) => {
                                return (
                                    <tr>
                                        <td className="border text-center border-slate-600">{user.idUser.id}</td>
                                        <td className="border text-center border-slate-600">{user.idUser.name}</td>
                                        <td className="border text-center border-slate-600">{user.amount.toFixed(2)}</td>
                                        <td id={user.idUser._id} className="border text-center border-slate-600">
                                            {user.itPaid ? "تم الدفع" : <button onClick={() => {
                                                if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                                    handleSubmit({
                                                        id: user._id
                                                    }, user.idUser._id, index)
                                                }
                                            }} className='btn btn-xs btn-success'>دفع</button>}
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