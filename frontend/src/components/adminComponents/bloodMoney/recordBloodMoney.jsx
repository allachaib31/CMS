import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getRecordBloodMoneyFetch } from '../../../utils/apiFetch';

function RecordBloodMoney() {
    const navigate = useNavigate();
    const [bloodMoney, setBloodMoney] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getRecordBloodMoneyFetch().then((res) => {
            setBloodMoney(res.data.bloodMoney);
            setTotal(res.data.total);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
            سجل مبالغ الدية المستردة 
            </h1>
            <div className="mt-[1rem] flex justify-center">
                <div className="flex gap-[0.2rem] sm:gap-[1rem]">
                    <h1 className="text-[0.8rem] sm:text-[1rem] text-center font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي مبالغ الدية المستردة</h1>
                    <h1 className="text-[0.8rem] sm:text-[1rem]  font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{total && total.toFixed(2)}</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                    <thead className="text-[0.8rem] text-center">
                        <tr>
                            <th className="border border-slate-600">
                                رقم <br />الطلب
                            </th>
                            <th className="border border-slate-600">
                                المستفيد
                            </th>
                            <th className="border border-slate-600">
                                المبلغ
                            </th>
                            <th className="border border-slate-600">
                                تاريخ السداد <br />بالميلادي
                            </th>
                            <th className="border border-slate-600">
                                تاريخ السداد <br />بالهجري
                            </th>
                            <th className="border border-slate-600">
                                ملحوظات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bloodMoney && bloodMoney.map((bdMoney) => {

                                return (
                                    <tr className="text-center text-[0.8rem]">
                                        <td className="border border-slate-600">{bdMoney.id}</td>
                                        <td className="border border-slate-600">{bdMoney.name}</td>
                                        <td className="border border-slate-600">{bdMoney.amount}</td>
                                        <td className="border border-slate-600">{bdMoney.paymentDateMiladi && new Date(bdMoney.paymentDateMiladi).toLocaleDateString('en-CA')}</td>
                                        <td className="border border-slate-600">{bdMoney.paymentDateHijri && bdMoney.exchangeDateHijri.year + "-" +bdMoney.exchangeDateHijri.month.number + "-" + bdMoney.exchangeDateHijri.day}</td>
                                        <td className="border border-slate-600">{bdMoney.comments}</td>
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

export default RecordBloodMoney