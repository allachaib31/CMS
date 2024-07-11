import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLoansHistoryFetch } from '../../../utils/apiFetch';

function LoansHistory() {
    const [loansInfo, setLoansInfo] = useState(false);
    const [totalAmountsPaid, setTotalAmountsPaid] = useState(0);
    const [totalLoans, setTotalLoans] = useState(0);
    useEffect(() => {
        getLoansHistoryFetch().then((res) => {
            console.log(res)
            setLoansInfo(res.data.result);
            setTotalAmountsPaid(res.data.totalAmountsPaid);
            setTotalLoans(res.data.totalLoans);
        }).catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <div className='container mx-auto'>
                <Link to="/loans" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                سجل القروض
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[3500px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className='border border-slate-600' colSpan={22}>سجل القروض </th>
                        </tr>
                        <tr>
                            <th className='border border-slate-600' colSpan={6}>إجمالي القروض  </th>
                            <th className='border border-slate-600' colSpan={6}>إجمالي المبالغ المسددة </th>
                            <th className='border border-slate-600' colSpan={5}>إجمالي المبالغ المتبقية</th>
                            <th className='border border-slate-600' colSpan={5}>عدد القروض</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td className='border border-slate-600' colSpan={6}>{totalLoans}</td>
                            <td className='border border-slate-600' colSpan={6}>{totalAmountsPaid}</td>
                            <td className='border border-slate-600' colSpan={5}>{totalLoans - totalAmountsPaid}</td>
                            <td className='border border-slate-600' colSpan={5}>{loansInfo.length}</td>
                        </tr>
                    </tbody>
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className='border border-slate-600' rowSpan={2}>اسم العضو</th>
                            <th className='border border-slate-600' rowSpan={2}>رقم الطلب  </th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ القرض  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ الطلب  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ استلام القرض  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ بداية التسديد  </th>
                            <th className='border border-slate-600' colSpan={2}>تاريخ انتهاء التسديد  </th>
                            <th className='border border-slate-600' rowSpan={2}>عدد الأقساط  </th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ القسط الأول </th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ القسط الأخير </th>
                            <th className='border border-slate-600' rowSpan={2}>الأقساط المسددة  </th>
                            <th className='border border-slate-600' rowSpan={2}>الأقساط المتبقية  </th>
                            <th className='border border-slate-600' rowSpan={2}>المبالغ المسددة  </th>
                            <th className='border border-slate-600' rowSpan={2}>المبالغ المتبقية  </th>
                            <th className='border border-slate-600' rowSpan={2}>الأقساط المتأخرة  </th>
                            <th className='border border-slate-600' rowSpan={2}>المبالغ المتأخرة  </th>
                            <th className='border border-slate-600' rowSpan={2}>ملحوظات</th>
                            <th className='border border-slate-600' rowSpan={2}>تفاصيل أكثر</th>
                        </tr>
                        <tr>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                            <th className='border border-slate-600'>الميلادي</th>
                            <th className='border border-slate-600'>الهجري</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {loansInfo && loansInfo.map((loanInfo) => {
                            return (
                                <tr>
                                    <td className='border border-slate-600'>{loanInfo.loan.name}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.id}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.amount}</td>
                                    <td className='border border-slate-600'>{new Date(loanInfo.loan.createdAt).toLocaleDateString('en-CA')}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.hijriDate.year}-{loanInfo.loan.hijriDate.month.number}-{loanInfo.loan.hijriDate.day}</td>
                                    <td className='border border-slate-600'>{new Date(loanInfo.loan.dateOfReceipt).toLocaleDateString('en-CA')}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.dateOfReceiptHijri.year}-{loanInfo.loan.dateOfReceiptHijri.month.number}-{loanInfo.loan.dateOfReceiptHijri.day}</td>
                                    <td className='border border-slate-600'>{new Date(loanInfo.loan.paymentStartDate).toLocaleDateString('en-CA')}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.paymentStartDateHijri.year}-{loanInfo.loan.paymentStartDateHijri.month.number}-{loanInfo.loan.paymentStartDateHijri.day}</td>
                                    <td className='border border-slate-600'>{new Date(loanInfo.loan.paymentEndDate).toLocaleDateString('en-CA')}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.paymentEndDateHijri.year}-{loanInfo.loan.paymentEndDateHijri.month.number}-{loanInfo.loan.paymentEndDateHijri.day}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.numberOfInstallments}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.premiumAmount}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.premiumAmount}</td>
                                    <td className='border border-slate-600'>{loanInfo.installmentsPaid}</td>
                                    <td className='border border-slate-600'>{loanInfo.remainingInstallments}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.balance}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.amount - loanInfo.loan.balance}</td>
                                    <td className='border border-slate-600'>{loanInfo.lateInstallmentst}</td>
                                    <td className='border border-slate-600'>{loanInfo.overdueAmounts}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.comments}</td>
                                    <td className='border border-slate-600'><Link to={`/loans/recordInstallments?id=${loanInfo.loan.id}`} className='btn btn-info'>تفاصيل أكثر</Link></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoansHistory