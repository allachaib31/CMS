import { faPrint, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getRecordInstallmentsFetch, payInstallmentsFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function RecordInstallments() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [loanInfo, setLoanInfo] = useState(false);
    const [installments, setInstallments] = useState(false);
    const [installmentsPaid, setInstallmentsPaid] = useState(false);
    const [id, setId] = useState(queryParams.get('id'));
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = (input) => {
        payInstallmentsFetch(input).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            getRecord();
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
    const getRecord = () => {
        getRecordInstallmentsFetch(id).then((res) => {
            setLoanInfo(res.data.loan);
            setInstallments(res.data.installments);
            setInstallmentsPaid(res.data.installmentsPaid);
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
    useEffect(() => {
        getRecord();
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <div className='container mx-auto'>
                <Link to="/loans" className="btn btn-sm btn-primary text-sm px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <div className='container mx-auto'>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <Link to={`/print/loans/recordInstallments?id=${queryParams.get('id')}`} target='_blank' className='mt-[0.5rem] btn btn-sm text-sm btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</Link>
            </div>
            <div className="overflow-x-auto mt-[0.5rem]">
                {
                    loanInfo && <table className="text-xs table table-xs border-separate border-spacing-0 border w-[500px] md:w-[900px] mx-auto">
                        <thead className="text-[0.6rem] md:text-xs text-center">
                            <tr>
                                <td className='border border-slate-600' colSpan={9}>سجل الاقساط</td>
                            </tr>
                            <tr>
                                <th className="border border-slate-600" rowSpan={2}>
                                    اسم <br /> العضو
                                </th>
                                <th className="border border-slate-600" rowSpan={2}>
                                    مبلغ <br/> القرض
                                </th>
                                <th className="border border-slate-600" rowSpan={2}>
                                    عدد <br/>الأقساط
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
                                <th className="border border-slate-600" colSpan={2} rowSpan={2}>
                                المبلغ <br/>المتبقي
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center text-xs'>
                                <td className="border border-slate-600">{loanInfo.name}</td>
                                <td className="border border-slate-600">{loanInfo.amount.toFixed(2)}</td>
                                <td className="border border-slate-600">{loanInfo.numberOfInstallments}</td>
                                <td className="border border-slate-600">{installmentsPaid}</td>
                                <td className="border border-slate-600">{loanInfo.numberOfInstallments - installmentsPaid}</td>
                                <td className="border border-slate-600">{loanInfo.balance.toFixed(2)}</td>
                                <td className="border border-slate-600" colSpan={2}>{(loanInfo.amount - loanInfo.balance).toFixed(2)}</td>
                            </tr>
                        </tbody>
                        <tr className='text-center text-[0.6rem] md:text-xs'>
                            <th className="border border-slate-600" rowSpan={2}>
                                رقم <br/>القسط
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ <br/>القسط
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
                                مبلغ القسط<br/> المتأخر
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                دفع
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
                                        <tr className='text-center text-xs'>
                                            <td className="border border-slate-600">{installment.id}</td>
                                            <td className="border border-slate-600">{installment.premiumAmount.toFixed(2)}</td>
                                            <td className="border border-slate-600">{installment.actualPaymentDate && d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate()}</td>
                                            <td className="border border-slate-600">{installment.actualPaymentDateHijri && installment.actualPaymentDateHijri.year + "-" + installment.actualPaymentDateHijri.month.number + "-" + installment.actualPaymentDateHijri.day}</td>
                                            <td className="border border-slate-600">{d2.getUTCFullYear() + "-" + (d2.getUTCMonth() + 1) + "-" + d2.getUTCDate()}</td>
                                            <td className="border border-slate-600">{installment.requiredPaymentDateHijri.year}-{installment.requiredPaymentDateHijri.month.number}-{installment.requiredPaymentDateHijri.day}</td>
                                            <td className="border border-slate-600">{amount}</td>
                                            <td className="border border-slate-600">
                                                {
                                                    installment.itPaid ? "لقد تم دفع" : <button onClick={() => {
                                                        if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                                            handleSubmit({
                                                                id: installment._id
                                                            })
                                                        }
                                                    }} className='btn btn-xs btn-success'>دفع</button>
                                                }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default RecordInstallments