import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addTypeUnReimbursedExpensesFetch, deleteTypeUnReimbursedExpensesFetch, getTypeUnReimbursedExpensesFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function AddExpenseType() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        name: ""
    });
    const [expensesType, setExpensesType] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleDelete = (input,index) => {
        setShowAlert({
            display: false,
        });

        deleteTypeUnReimbursedExpensesFetch(input).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            const newList = [...expensesType];
            newList.splice(index, 1);
            setExpensesType(newList);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addTypeUnReimbursedExpensesFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setExpensesType((prevExpenses) => {
                return [...prevExpenses, res.data.typeExpenses]
            })
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
            console.log(res)
            setExpensesType(res.data.typesExpenses);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/unreimbursedExpenses/" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center font-bold py-[0.5rem]">
                اضافة نوع مصروف
            </h1>
            <form action="" className='container mx-auto'>
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <input type="text" placeholder="اكتب نوع مصروف" className="input input-sm input-bordered w-full max-w-[10rem]" onChange={(event) => {
                    setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            name: event.target.value
                        }
                    })
                }} />
                <button onClick={handleSubmit} disabled={submit} className='btn btn-sm btn-primary font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "اضافة"}</button>
            </form>
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="table table-xs border-separate border-spacing-0 border w-[350px] mx-auto">
                    <tr>
                        <th className="border text-center border-slate-600">
                            رقم النوع
                        </th>
                        <th className="border text-center border-slate-600">
                            اسم النوع
                        </th>
                        <th className="border text-center border-slate-600">
                            حدف
                        </th>
                    </tr>
                    <tbody>
                        {
                            expensesType && expensesType.map((expenses,index) => {
                                return (<tr>
                                    <td className="border text-center border-slate-600">{expenses.id}</td>
                                    <td className="border text-center border-slate-600">{expenses.name}</td>
                                    <td className="border text-center border-slate-600"><button onClick={() => {
                                        handleDelete({ id: expenses._id },index)
                                    }} className='btn btn-xs btn-error'>حدف</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddExpenseType