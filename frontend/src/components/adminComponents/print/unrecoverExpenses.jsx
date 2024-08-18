import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { printUnReimbursedExpensesFetch } from '../../../utils/apiFetch';

function UnrecoverExpenses() {
    const navigate = useNavigate();
    const [unReimbursedExpenses, setUnReimbursedExpenses] = useState(false);
    const [loading, setLoading] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        printUnReimbursedExpensesFetch({
            from: query.get("from"),
            to: query.get("to")
        }).then((res) => {
            setUnReimbursedExpenses(res.data.unReimbursedExpenses);
            setLoading((e) => !e);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
            alert( "ليس لديك الاذن للطباعة")
        })
    }, [])
    useEffect(() => {
        if (loading) window.print();
    }, [loading])
    return (
        <div id="printableArea">
            {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> :
                <table className="text-[0.8rem] table border-separate border-spacing-2 border w-[1450px] mx-auto">
                <tr>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        رقم الطلب
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                    المستفيد
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        نوع <br/>المصروف
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                    المبلغ المطلوب<br /> صرفه
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        المصروف من <br />رصيد العضو
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        المصروف من <br />رصيد الصندوق
                    </th>
                    <th colSpan={2} className="border text-center border-slate-600">
                        المصروفات المسددة نقداً
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        الإجمالي
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        تاريخ <br/> الميلادي
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        تاريخ <br/> الهجري
                    </th>
                    <th className="border text-center border-slate-600" rowSpan={2}>
                        البيان
                    </th>
                </tr>
                <tr>
                    <th className="border text-center border-slate-600">
                        المبلغ
                    </th>
                    <th className="border text-center border-slate-600">
                        المصدر
                    </th>
                </tr>
                <tbody>
                    {
                        unReimbursedExpenses && unReimbursedExpenses.map((expenses) => {
                            const d = new Date(expenses.createdAt);
                            return (
                                <tr >
                                    <td className="border text-center border-slate-600">{expenses.id}</td>
                                    <td className="border text-center border-slate-600">{expenses.name}</td>
                                    <td className="border text-center border-slate-600">{expenses.typeExpenses}</td>
                                    <td className="border text-center border-slate-600">{expenses.amount.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{expenses.expensememberbalance.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{expenses.balanceDistribution.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">
                                        {
                                            expenses.expensesPaidCash.map((expensesPaidCash) => {
                                                return (
                                                    <tr className='flex mb-1'>
                                                        <td className="w-full border text-center border-slate-600">{expensesPaidCash.amount.toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </td>
                                    <td className="border text-center border-slate-600">
                                        {
                                            expenses.expensesPaidCash.map((expensesPaidCash) => {
                                                return (
                                                    <tr className='flex mb-1'>
                                                        <td className="w-full border text-center border-slate-600">{expensesPaidCash.name}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </td>
                                    <td className="border text-center border-slate-600">{expenses.total.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate()}</td>
                                    <td className="border text-center border-slate-600">{expenses.hijriDate.year}/{expenses.hijriDate.month.number}/{expenses.hijriDate.day}</td>
                                    <td className="border text-center border-slate-600">{expenses.comments}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>}
        </div>
    )
}

export default UnrecoverExpenses