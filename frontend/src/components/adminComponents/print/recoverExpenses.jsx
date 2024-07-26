import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { printReimbursedExpensesFetch } from '../../../utils/apiFetch';


function RecoverExpenses() {
    const navigate = useNavigate();
    const [reimbursedExpenses, setReimbursedExpenses] = useState(false);
    const [loading, setLoading] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        printReimbursedExpensesFetch({
            from: query.get("from"),
            to: query.get("to")
        }).then((res) => {
            setReimbursedExpenses(res.data.reimbursedExpenses);
            setLoading((e) => !e);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
            alert("ليس لديك الاذن للطباعة")
        })
    }, [])
    useEffect(() => {
        if (loading) window.print();
    }, [loading])
    return (
        <div>
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
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RecoverExpenses