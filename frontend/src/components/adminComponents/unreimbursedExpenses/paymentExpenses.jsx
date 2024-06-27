import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function PaymentExpenses() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/unreimbursedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                دفع المصروفات
            </h1>
            <form action="">
                <input type="text" placeholder="اكتب رقم الطلب " className="input input-bordered w-full max-w-xs" />
                <button className='btn btn-primary text-[1.1rem] font-bold'>ابحث</button>
            </form>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                    <tr>
                        <th className="border text-center border-slate-600">
                            رقم المستخدم
                        </th>
                        <th className="border text-center border-slate-600">
                            اسم المستخدم
                        </th>
                        <th className="border text-center border-slate-600">
                            المبلغ
                        </th>
                        <th className="border text-center border-slate-600">
                        دفع
                        </th>
                    </tr>
                    <tbody>
                        <tr>
                            <td className="border text-center border-slate-600"></td>
                            <td className="border text-center border-slate-600"></td>
                            <td className="border text-center border-slate-600"></td>
                            <td className="border text-center border-slate-600"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentExpenses