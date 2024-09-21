import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRecordInstallmentsFetch } from '../../../utils/apiFetch';

function PrintRecordInstallments() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [loanInfo, setLoanInfo] = useState(false);
    const [installments, setInstallments] = useState(false);
    const [installmentsPaid, setInstallmentsPaid] = useState(false);
    const [id, setId] = useState(queryParams.get('id'));

    const getRecord = () => {
        getRecordInstallmentsFetch(id).then((res) => {
            if (!res.data.print) {
                alert("ليس لديك الاذن طباعة")
                return
            }
            setLoanInfo(res.data.loan);
            setInstallments(res.data.installments);
            setInstallmentsPaid(res.data.installmentsPaid);
            setLoading((e) => !e);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }
    useEffect(() => {
        getRecord();
    }, []);
    useEffect(() => {
        if (loading) window.print();
    }, [loading])
    return (
        <div>                {
            loanInfo && <table className="text-[1rem] table border-separate border-spacing-2 border w-[1300px] mx-auto">
            <thead className="text-[1rem] text-center">
                <tr>
                    <td className='border border-slate-600' colSpan={9}>سجل الاقساط</td>
                </tr>
                <tr>
                    <th className="border border-slate-600" rowSpan={2}>
                        اسم العضو
                    </th>
                    <th className="border border-slate-600" rowSpan={2}>
                        مبلغ القرض
                    </th>
                    <th className="border border-slate-600" rowSpan={2}>
                        عدد الأقساط
                    </th>
                    <th className="border border-slate-600" rowSpan={2}>
                        الأقساط المسددة
                    </th>
                    <th className="border border-slate-600" rowSpan={2}>
                        الأقساط المتبقية
                    </th>
                    <th className="border border-slate-600" rowSpan={2}>
                        مبلغ المسدد
                    </th>
                    <th className="border border-slate-600" colSpan={2} rowSpan={2}>
                        مبلغ المتبقي
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-center'>
                    <td className="border border-slate-600">{loanInfo.name}</td>
                    <td className="border border-slate-600">{loanInfo.amount.toFixed(2)}</td>
                    <td className="border border-slate-600">{loanInfo.numberOfInstallments}</td>
                    <td className="border border-slate-600">{installmentsPaid}</td>
                    <td className="border border-slate-600">{loanInfo.numberOfInstallments - installmentsPaid}</td>
                    <td className="border border-slate-600">{loanInfo.balance.toFixed(2)}</td>
                    <td className="border border-slate-600" colSpan={2}>{(loanInfo.amount - loanInfo.balance).toFixed(2)}</td>
                </tr>
            </tbody>
            <tr className='text-[0.8rem] text-center'>
                <th className="border border-slate-600" rowSpan={2}>
                    رقم القسط
                </th>
                <th className="border border-slate-600" rowSpan={2}>
                    مبلغ القسط
                </th>
                <th className="border border-slate-600" >
                    تاريخ التسديد الفعلي بالميلادي
                </th>
                <th className="border border-slate-600" >
                    تاريخ التسديد الفعلي بالهجري
                </th>
                <th className="border border-slate-600" >
                    تاريخ التسديد المطلوب بالميلادي
                </th>
                <th className="border border-slate-600" >
                    تاريخ التسديد المطلوب بالهجري
                </th>
                <th className="border border-slate-600" rowSpan={2}>
                    مبلغ القسط المتأخر
                </th>
            </tr>
            <tbody>
                {
                    installments && installments.map((installment) => {
                        let amount;
                        const targetDate = new Date(installment.requiredPaymentDate);
                        targetDate.setDate(targetDate.getDate() + 5);
                        const currentDate = new Date();
                        targetDate.setHours(0, 0, 0, 0);
                        currentDate.setHours(0, 0, 0, 0);
                        if (currentDate.getTime() >= targetDate.getTime() && !installment.itPaid) {
                            amount = installment.premiumAmount;
                        }
                        const d = new Date(installment.actualPaymentDate);
                        const d2 = new Date(installment.requiredPaymentDate)
                        return (
                            <tr className='text-center'>
                                <td className="border border-slate-600">{installment.id}</td>
                                <td className="border border-slate-600">{installment.premiumAmount}</td>
                                <td className="border border-slate-600">{installment.actualPaymentDate && d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate()}</td>
                                <td className="border border-slate-600">{installment.actualPaymentDateHijri && installment.actualPaymentDateHijri.year + "-" + installment.actualPaymentDateHijri.month.number + "-" + installment.actualPaymentDateHijri.day}</td>
                                <td className="border border-slate-600">{d2.getUTCFullYear() + "-" + (d2.getUTCMonth() + 1) + "-" + d2.getUTCDate()}</td>
                                <td className="border border-slate-600">{installment.requiredPaymentDateHijri.year}-{installment.requiredPaymentDateHijri.month.number}-{installment.requiredPaymentDateHijri.day}</td>
                                <td className="border border-slate-600">{amount}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        }
        </div>

    )
}

export default PrintRecordInstallments