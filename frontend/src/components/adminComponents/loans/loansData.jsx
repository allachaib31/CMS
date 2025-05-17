import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getIdLoansFetch, searchLoansFetch } from "../../../utils/apiFetch";

function LoansData() {
    const navigate = useNavigate();
    const [loanInfo, setLoanInfo] = useState(false);
    const [installmentsPaid, setInstallmentsPaid] = useState(false);
    const [loansId, setLoansId] = useState(false);
    const [id, setId] = useState(false);
    const handleSearch = () => {
        searchLoansFetch(id).then((res) => {
            setLoanInfo(res.data.loan);
            setInstallmentsPaid(res.data.installmentsPaid);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }
    useEffect(() => {
        getIdLoansFetch().then((res) => {
            setLoansId(res.data.loansId);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-sm font-bold py-[0.5rem]">
                بيانات القرض
            </h1>
            <div className="container mx-auto">
                <select onChange={(event) => {
                    setId(event.target.value)
                }} className="select select-sm pr-[1rem] pl-[2rem] select-bordered w-[15rem]">
                    <option disabled selected>رقم القرض</option>
                    {
                        loansId && loansId.map((loanId) => {
                            return (
                                <option value={loanId.id}>{loanId.id}</option>
                            )
                        })
                    }
                </select>
                <button onClick={handleSearch} disabled={!id} className="btn btn-sm btn-primary text-sm font-bold join-item ">ابحث</button>
            </div>
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="table table-xs border-separate border-spacing-2 border w-[1500px] mx-auto">
                    <thead className="text-xs text-center">
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                اسم <br/>العضو
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                رقم <br/>الطلب
                            </th>
                            <th className="border border-slate-600" colSpan={2}>
                                تاريخ الطلب
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ <br/>القرض
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ استلام القرض
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ بداية التسديد
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ انتهاء التسديد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                عدد <br/>الأقساط
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ القسط <br/>الأول
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ القسط <br/>الأخير
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                الأقساط <br/>المسددة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                الأقساط <br/>المتبقية
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                            المبلغ <br/>المسدد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                            المبلغ <br/>المتبقي
                            </th>
                        </tr>
                        <tr className="text-xs">
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loanInfo && <tr className="text-center text-xs">
                                <td className="border border-slate-600">{loanInfo.name}</td>
                                <td className="border border-slate-600">{loanInfo.id}</td>
                                <td className="border border-slate-600">{new Date(loanInfo.createdAt).toLocaleDateString('en-CA')}</td>
                                <td className="border border-slate-600">{loanInfo.hijriDate.year}-{loanInfo.hijriDate.month.number}-{loanInfo.hijriDate.day}</td>
                                <td className="border border-slate-600">{loanInfo.amount}</td>
                                <td className="border border-slate-600">{new Date(loanInfo.dateOfReceipt).toLocaleDateString('en-CA')}</td>
                                <td className="border border-slate-600">{loanInfo.dateOfReceiptHijri.year}-{loanInfo.dateOfReceiptHijri.month.number}-{loanInfo.dateOfReceiptHijri.day}</td>
                                <td className="border border-slate-600">{new Date(loanInfo.paymentStartDate).toLocaleDateString('en-CA')}</td>
                                <td className="border border-slate-600">{loanInfo.paymentStartDateHijri.year}-{loanInfo.paymentStartDateHijri.month.number}-{loanInfo.paymentStartDateHijri.day}</td>
                                <td className="border border-slate-600">{new Date(loanInfo.paymentEndDate).toLocaleDateString('en-CA')}</td>
                                <td className="border border-slate-600">{loanInfo.paymentEndDateHijri.year}-{loanInfo.paymentEndDateHijri.month.number}-{loanInfo.paymentEndDateHijri.day}</td>
                                <td className="border border-slate-600">{loanInfo.numberOfInstallments}</td>
                                <td className='border border-slate-600'>{loanInfo.premiumAmount.toFixed(2)}</td>
                                <td className='border border-slate-600'>{loanInfo.premiumAmount.toFixed(2)}</td>
                                <td className="border border-slate-600">{installmentsPaid}</td>
                                <td className="border border-slate-600">{loanInfo.numberOfInstallments - installmentsPaid}</td>
                                <td className="border border-slate-600">{loanInfo.balance.toFixed(2)}</td>
                                <td className="border border-slate-600">{(loanInfo.amount - loanInfo.balance).toFixed(2)}</td>
                            </tr>
                        }
                    </tbody>
                    <tr>
                        {
                            loanInfo && <td className="text-center border border-slate-600" colSpan={18}>للانتقال إلى سجل الأقساط <Link to={"/loans/recordInstallments?id=" + loanInfo.id} className="text-error">اضغط هنا</Link></td>
                        }
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default LoansData;
