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
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                    <thead className="text-[0.8rem] text-center">
                        <tr>
                            <th className='border border-slate-600' colSpan={7}>سجل القروض </th>
                        </tr>
                        <tr>
                            <th className='border border-slate-600' colSpan={2}>إجمالي القروض  </th>
                            <th className='border border-slate-600' colSpan={2}>إجمالي المبالغ المسددة </th>
                            <th className='border border-slate-600' colSpan={2}>إجمالي المبالغ المتبقية</th>
                            <th className='border border-slate-600' colSpan={1}>عدد القروض</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center text-[0.8rem]'>
                            <td className='border border-slate-600' colSpan={2}>{totalLoans}</td>
                            <td className='border border-slate-600' colSpan={2}>{totalAmountsPaid.toFixed(2)}</td>
                            <td className='border border-slate-600' colSpan={2}>{(totalLoans - totalAmountsPaid).toFixed(2)}</td>
                            <td className='border border-slate-600' colSpan={1}>{loansInfo.length}</td>
                        </tr>
                    </tbody>
                    <thead className="text-[0.8rem] text-center">
                        <tr>
                            <th className='border border-slate-600' rowSpan={2}>رقم <br/>الطلب  </th>
                            <th className='border border-slate-600' rowSpan={2}>اسم <br/>العضو</th>
                            <th className='border border-slate-600' rowSpan={2}>مبلغ <br/>القرض  </th>
                            <th className='border border-slate-600' rowSpan={2}>تاريخ الطلب<br/> الميلادي </th>
                            <th className='border border-slate-600' rowSpan={2}>تاريخ الطلب<br/> الهجري </th>
                            <th className='border border-slate-600' rowSpan={2}>ملحوظات</th>
                            <th className='border border-slate-600' rowSpan={2}>تفاصيل أكثر</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {loansInfo && loansInfo.map((loanInfo) => {
                            return (
                                <tr className='text-[0.8rem]'>
                                    <td className='border border-slate-600'>{loanInfo.loan.id}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.name}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.amount}</td>
                                    <td className='border border-slate-600'>{new Date(loanInfo.loan.createdAt).toLocaleDateString('en-CA')}</td>
                                    <td className='border border-slate-600'>{loanInfo.loan.hijriDate.year}-{loanInfo.loan.hijriDate.month.number}-{loanInfo.loan.hijriDate.day}</td>
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