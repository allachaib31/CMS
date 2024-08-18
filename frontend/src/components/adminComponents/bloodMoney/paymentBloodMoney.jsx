import React, { useEffect, useState } from 'react'
import { getPaymentBloodMoneyFetch, payBloodMoneyFetch } from '../../../utils/apiFetch'
import { useNavigate } from 'react-router-dom';
import Alert from '../../alert/alert';

function PaymentBloodMoney() {
    const navigate = useNavigate();
    const [bloodMoney, setBloodMoney] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getPaymentBloodMoneyFetch().then((res) => {
            setBloodMoney(res.data.bloodMoney);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    const handleSubmit = (input) => {
        payBloodMoneyFetch(input).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setBloodMoney(res.data.newBloodMoney)
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
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                تسديد مبلغ دية مستردة
            </h1>
            <div className='container mx-auto'>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
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
                                المبلغ <br />المصروف
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
                            <th className="border border-slate-600">
                            دفع
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
                                        <td className="border border-slate-600">{new Date(bdMoney.exchangeDateMiladi).toLocaleDateString('en-CA')}</td>
                                        <td className="border border-slate-600">{bdMoney.exchangeDateHijri.year}-{bdMoney.exchangeDateHijri.month.number}-{bdMoney.exchangeDateHijri.day}</td>
                                        <td className="border border-slate-600">{bdMoney.comments}</td>
                                        <td className="border border-slate-600">                                                {
                                                    bdMoney.itPaid ? "لقد تم دفع" : <button onClick={() => {
                                                        handleSubmit({
                                                            id: bdMoney._id
                                                        })
                                                    }} className='btn btn-success'>دفع</button>
                                                }</td>
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

export default PaymentBloodMoney