import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRecordReimbursedExpensesFetch } from '../../../utils/apiFetch'

function DisplayRecordRecoveredExpenses() {
    const navigate = useNavigate();
    const [reimbursedExpenses, setReimbursedExpensesExpenses] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getRecordReimbursedExpensesFetch().then((res) => {
            console.log(res);
            setReimbursedExpensesExpenses(res.data.reimbursedExpenses)
            setTotal(res.data.totalAmount)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="px-[1rem] sm:px-0">
            <div className='container mx-auto'>
                <Link to="/reimbusedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                سجل المصروفات المستردة
            </h1>
            <div className="mt-[1rem] flex md:flex-row flex-col gap-[1rem] justify-center">
                <div className="flex md:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] w-[90%] md:w-auto font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[0.5rem] sm:px-[1.3rem]">إجمالي المصروفات المستردة</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{total}</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1900px] mx-auto">
                    <tr>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            اسم الجهة
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            المبلغ المصروف
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            نوع المصروف
                        </th>
                        <th colSpan={2} className="border text-center border-slate-600">
                            تاريخ الصرف
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            البيان
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            تفاصيل أكثر
                        </th>
                    </tr>
                    <tr>
                        <th className="border text-center border-slate-600">
                            الميلادي
                        </th>
                        <th className="border text-center border-slate-600">
                            الهجري
                        </th>
                    </tr>
                    <tbody>
                        {
                            reimbursedExpenses && reimbursedExpenses.map((expenses) => {
                                return (
                                    <tr>
                                        <td className="border text-center border-slate-600">{expenses.name}</td>
                                        <td className="border text-center border-slate-600">{expenses.amount}</td>
                                        <td className="border text-center border-slate-600">{expenses.typeExpenses}</td>
                                        <td className="border text-center border-slate-600">{expenses.createdAt}</td>
                                        <td className="border text-center border-slate-600">{expenses.hijriDate.year}/{expenses.hijriDate.month.number}/{expenses.hijriDate.day}</td>
                                        <td className="border text-center border-slate-600">{expenses.comments}</td>
                                        <td className="border text-center border-slate-600"></td>
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

export default DisplayRecordRecoveredExpenses