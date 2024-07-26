import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { getReimbursedExpensesFetch } from '../../../utils/apiFetch';
import { Link, useNavigate } from 'react-router-dom';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RecordRecoveredExpenses() {
    const navigate = useNavigate();
    const [reimbursedExpenses, setReimbursedExpensesExpenses] = useState(false);
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
    const getReimbursedExpenses = (input) => {
        getReimbursedExpensesFetch(input).then((res) => {
            setReimbursedExpensesExpenses(res.data.result);
            setTotalAmount(res.data.totalAmount);
            setTotalAmountMonth(res.data.totalAmountMonth);
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
        getReimbursedExpenses({
            year: hijriDate[2],
            month: hijriDate[1].number
        });
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                المصروفات المستردة
            </h1>
            <div className='text-[1.1rem] flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
                <label>إيرادات اقساط السلع لشهر</label>
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
                    getReimbursedExpenses({
                        year: hijriDate[2],
                        month: hijriDate[1].number
                    });
                }} />
                <label>
                    الموافق لي{" "}

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
                    <h1 className="text-[1.1rem] md:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي المصروفات المستردة لهذا الشهر</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{totalAmountMonth}</h1>
                </div>
                <div className="flex md:flex-col items-center justify-center gap-[1rem]">
                    <h1 className="text-[1.1rem] md:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">جمالي المصروفات المستردة</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{totalAmount}</h1>
                </div>
            </div>
            <button onClick={()=>document.getElementById('my_modal_1').showModal()} className='mt-[1rem] btn btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</button>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1900px] mx-auto">
                    <tr>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            اسم الجهة
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            المبلغ المصروف
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            نوع المصروف
                        </th>
                        <th colSpan={2} className="border text-center border-slate-600">
                            تاريخ الصرف
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            البيان
                        </th>
                    </tr>
                    <tr>
                        <th className="border text-center border-slate-600">
                            الميلادي
                        </th>
                        <th className="border text-center border-slate-600">
                            الهجري
                        </th>
                    </tr>
                    <tbody>
                        {
                            reimbursedExpenses && reimbursedExpenses.map((expenses) => {
                                return (
                                    <tr>
                                        <td className="border text-center border-slate-600">{expenses.name}</td>
                                        <td className="border text-center border-slate-600">{expenses.amount}</td>
                                        <td className="border text-center border-slate-600">{expenses.typeExpenses}</td>
                                        <td className="border text-center border-slate-600">{expenses.createdAt}</td>
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
                            <Link to={`/print/recoverdExpenses?from=${print.from}&to=${print.to}`} target='_blank' className='mt-[1rem] btn btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</Link>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default RecordRecoveredExpenses