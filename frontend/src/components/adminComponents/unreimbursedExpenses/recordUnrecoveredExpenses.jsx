import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { Link, useNavigate } from 'react-router-dom';
import { getUnReimbursedExpensesFetch } from '../../../utils/apiFetch';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function RecordUnrecoveredExpenses() {
    const navigate = useNavigate();
    const [unReimbursedExpenses, setUnReimbursedExpenses] = useState(false);
    const [inputs, setInputs] = useState({
        date: "",
        dateHijri: "",
    });
    const [print, setPrint] = useState({
        from: "",
        to: ""
    })
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountMonth, setTotalAmountMonth] = useState(0);
    const getUnReimbursedExpenses = (input) => {
        getUnReimbursedExpensesFetch(input).then((res) => {
            setUnReimbursedExpenses(res.data.result);
            setTotalAmount(res.data.totalAmount);
            setTotalAmountMonth(res.data.totalAmountMonth);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }
    useEffect(() => {
        const today = new Date();
        //document.getElementById("dateInput").max = today;
        document.getElementById("dateInput").value = today.toISOString().split("T")[0];
        const hijriDate = hijriDateObject(today.toISOString().split("T")[0]);
        setInputs((prevInput) => {
            return {
                ...prevInput,
                date: today,
                dateHijri: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                },
            };
        });
        getUnReimbursedExpenses({
            year: hijriDate[2],
            month: hijriDate[1].number
        });
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
            نموذج المصروفات 
            </h1>
            <div className='text-[1.1rem] flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
                <input type="date" id="dateInput" className='input input-bordered' onChange={(event) => {
                    const hijriDate = hijriDateObject(event.target.value);
                    setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            date: event.target.value,
                            dateHijri: {
                                day: hijriDate[0],
                                month: hijriDate[1],
                                year: hijriDate[2],
                            },
                        };
                    });
                    getUnReimbursedExpenses({
                        year: hijriDate[2],
                        month: hijriDate[1].number
                    });
                }} />
                <label>
                    الموافق {" "}

                    {inputs.dateHijri ? (
                        <span>
                            {inputs.dateHijri.year}/{inputs.dateHijri.month.number}/
                            {inputs.dateHijri.day}
                        </span>
                    ) : (
                        ""
                    )}


                </label>
            </div>
            <div className="mt-[1rem] flex md:flex-row flex-col gap-[1rem] justify-center">
                <div className="flex md:flex-col items-center justify-center gap-[1rem]">
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] font-bold bg-primary w-[70%] md:w-auto text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي المصروفات لهذا الشهر</h1>
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] font-bold bg-primary w-[30%] text-center md:w-auto text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{totalAmountMonth.toFixed(2)}</h1>
                </div>
                <div className="flex md:flex-col items-center justify-center gap-[1rem]">
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] font-bold bg-primary w-[70%] md:w-auto text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">المصروفات المسددة نقداً</h1>
                    <h1 className="text-[0.8rem] sm:text-[1.1rem] font-bold bg-primary w-[30%] text-center md:w-auto text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{totalAmount.toFixed(2)}</h1>
                </div>
            </div>
            <div className='container mx-auto'>
            <button onClick={()=>document.getElementById('my_modal_1').showModal()} className='mt-[1rem] btn btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</button>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
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
                        التاريخ <br/> الميلادي
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                        التاريخ <br/> الهجري
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
                </table>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">تحديد المدة</h3>
                    <div>
                    من <input type="date" onChange={(event) => {
                        setPrint((prevInput) => {
                            return {
                                ...prevInput,
                                from: event.target.value
                            }
                        })
                    }} className='input input-bordered' name="" id="" /> الى <input type="date" onChange={(event) => {
                        setPrint((prevInput) => {
                            return {
                                ...prevInput,
                                to: event.target.value
                            }
                        })
                    }} name="" className='input input-bordered' id="" />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className='mt-[1rem] btn  font-bold'>اغلاق</button>
                            <Link to={`/print/unrecoverdExpenses?from=${print.from}&to=${print.to}`} target='_blank' className='mt-[1rem] btn btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</Link>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default RecordUnrecoveredExpenses