import { faIdCard, faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUnReimbursedExpensesFetch, getActiveUserFetch, getTypeUnReimbursedExpensesFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function ExpenseRequest() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [listId, setListsId] = useState(false);
    const [selectType, setSelectType] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        amount: 0,
        typeExpenses: "",
        comments: "",
        selectType: false
    });
    const [expensesType, setExpensesType] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addUnReimbursedExpensesFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    useEffect(() => {
        getTypeUnReimbursedExpensesFetch().then((res) => {
            setExpensesType(res.data.typesExpenses);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    useEffect(() => {
        getActiveUserFetch().then((res) => {
            console.log(res.data)
            setListsId(res.data.users)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="sm:p-0 px-[1rem] container mx-auto">
            <div>
                <Link to="/unreimbursedExpenses/" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center font-bold py-[0.5rem]">
                طلب مصروف
            </h1>
            <form action="" className="py-[0.5rem] flex flex-col gap-[1rem]">
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <button onClick={(event) => {
                    event.preventDefault();
                    setSelectType((e) => !e)
                    setInputs((prevInputs) => {
                        return { ...prevInputs, name: "",selectType: !prevInputs.selectType }
                    })
                    }} className='btn btn-sm btn-info'>تغيير طريقة اضافة الاسم</button>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        {
                            selectType ? <select required onChange={(event) => {
                                return setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        name: event.target.value.trim()
                                    }
                                })
                            }}
                                className="select select-sm formInput select-bordered w-full">
                                <option disabled selected>اختار العضو</option>
                                {
                                    listId && listId.map((user) => {
                                        return (
                                            <option value={user._id}>{user.name}</option>
                                        )
                                    })
                                }
                            </select> : <>                        
                            <FontAwesomeIcon icon={faIdCard} className="absolute top-[0.5em] right-[1rem]" />
                                <input type="text" onChange={(e) => {
                                    setInputs((prevInputs) => {
                                        return { ...prevInputs, name: e.target.value.trim() }
                                    })
                                }} required className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم المستفيد" /></>
                        }

                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[0.5rem] right-[1rem]" />
                        <input type="number" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    amount: event.target.value
                                }
                            })
                        }} required className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="المصروف من رصيد الصندوق " />
                    </div>
                </div>
                <input type="text" onChange={(event) => {
                    setInputs((prevInputs) => {
                        return {
                            ...prevInputs,
                            comments: event.target.value
                        }
                    })
                }} required className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اكتب بيان" pattern='^.{3,1024}$' />
                <select onChange={(event) => {
                    setInputs((prevInputs) => {
                        return {
                            ...prevInputs,
                            typeExpenses: event.target.value
                        }
                    })
                }} pattern='^.{3,1024}$' className="select select-sm select-bordered w-full">
                    <option disabled selected>اختر نوع المصروف</option>
                    {expensesType && expensesType.map((expenses) => {
                        return (
                            <option value={expenses.id}>{expenses.name}</option>
                        )
                    })}
                </select>
                <button onClick={handleSubmit} disabled={submit} className='btn btn-sm text-white font-bold btn-primary'>{submit ? <span className="loading loading-ring loading-lg"></span> : "اضافة"}</button>
            </form>
        </div>
    )
}

export default ExpenseRequest