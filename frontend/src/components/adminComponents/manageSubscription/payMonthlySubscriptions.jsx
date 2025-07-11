import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hijriDateObject } from "../../../utils/getHijriDate";
import { addMonthlySubscriptionsFetch, getSubscriptionsFormFetch } from "../../../utils/apiFetch";
import Alert from "../../alert/alert";
import moment from "moment-hijri";
import AddNoteMonthly from "../../modals/addNoteMonthly";


function PayMonthlySubscriptions() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState([]);
    const [amount, setAmount] = useState(0);
    const [inputs, setInputs] = useState({
        date: "",
        dateHijri: "",
    });
    const [comment, setComment] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const [month, setMonth] = useState(inputs.month);
    const [total, setTotal] = useState(0);
    const handleSubmit = (data) => {
        setShowAlert({
            display: false,
        });
        addMonthlySubscriptionsFetch(data).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            document.getElementById(data.idUser).innerHTML = "تم الدفع بنجاح";
        }).catch((err) => {
            if (err.response.status == 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const getSubscriptionsForm = (input) => {
        setLoading((e) => !e);
        getSubscriptionsFormFetch(input)
            .then((res) => {
                setLoading((e) => !e);
                setSubscriptions(res.data.subscriptions);
                setMonth(new Date(input.date).getMonth() + 1);
                setTotal(res.data.total);
                setAmount(res.data.typeSubscription[0].amount);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/auth");
                }
                setLoading((e) => !e);
                setSubscriptions([]);
            });
    };
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        //document.getElementById("dateInput").max = today;
        document.getElementById("dateInput").value = today;
        const hijriDate = hijriDateObject(today);
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
        getSubscriptionsForm({
            date: today,
            dateHijri: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            },
        });
    }, []);
    useEffect(() => {
        const today = new Date();
        const currentDate25th = new Date(today.getFullYear(), today.getMonth(), 25 + 1);
        const formatted = currentDate25th.toISOString().split("T")[0];

        const hijriDate = hijriDateObject(formatted);
        setInputs({
            date: formatted,
            dateHijri: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            },
        });
    }, []);
    return (
        <div>
            <h1 className="text-center font-bold py-[0.5rem]">
                نموذج الاشتراكات
            </h1>
            <div className="join items-center justify-center w-full gap-[1rem]">
                <input
                    className="input input-sm input-bordered"
                    onChange={(event) => {
                        const selected = new Date(event.target.value);
                        // Force day to 25
                        const forcedDate = new Date(selected.getFullYear(), selected.getMonth(), 25 + 1);
                        const formatted = forcedDate.toISOString().split("T")[0];

                        // Update the input value to show 25th immediately
                        event.target.value = formatted;

                        const hijriDate = hijriDateObject(formatted);
                        setInputs((prevInput) => ({
                            ...prevInput,
                            date: formatted,
                            dateHijri: {
                                day: hijriDate[0],
                                month: hijriDate[1],
                                year: hijriDate[2],
                            },
                        }));
                        getSubscriptionsForm({
                            date: formatted,
                            dateHijri: {
                                day: hijriDate[0],
                                month: hijriDate[1],
                                year: hijriDate[2],
                            },
                        });
                    }}
                    value={inputs.date}

                    type="date"
                    id="dateInput"
                    name="dateInput"
                />
                <label htmlFor="" className="text-sm">
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
            <div className="mt-[1rem] flex justify-center">
                <div className="flex gap-[0.2rem]">
                    <h1 className="text-sm bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الاشتراكات لهذا الشهر</h1>
                    <h1 className="text-sm font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{total}</h1>
                </div>
            </div>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto mt-[1rem]">
                {!loading ? (
                    <div className="flex justify-center">
                        {" "}
                        <span className=" loading loading-ring loading-lg"></span>
                    </div>
                ) : (
                    <table className="table table-xs border-separate border-spacing-0 border w-[350px] md:w-[1500px] mx-auto">
                        <thead className="text-center text-xs">
                            <tr className="text-xs">
                                <th className="border border-slate-600">
                                    اسم العضو
                                </th>
                                <th className="border border-slate-600">
                                    نوع المبلغ
                                </th>
                                <th className="border border-slate-600">
                                    المبلغ
                                </th>
                                <th className="text-center border border-slate-600" >
                                    الاستحقاق <br /> الميلادي
                                </th>
                                <th className="text-center border border-slate-600" >
                                    الاستحقاق <br /> الهجري
                                </th>
                                <th className="text-center border border-slate-600" >
                                    الايداع <br /> الميلادي
                                </th>
                                <th className="text-center border border-slate-600" >
                                    الايداع <br /> الهجري
                                </th>
                                <th className="border border-slate-600">
                                    ملاحظات
                                </th>
                                <th className="border border-slate-600">
                                    دفع
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-sm">
                            {subscriptions &&
                                subscriptions.map((subscription) => {
                                    const date = subscription.months[month].createdAt == null ? null : new Date(subscription.months[month].createdAt);
                                    const hijriDate = hijriDateObject(date);
                                    return (
                                        <tr>
                                            <th className="border border-slate-600">
                                                {subscription.idUser.name}
                                            </th>
                                            <td className="border border-slate-600">اشتراك شهري</td>
                                            <td className="border border-slate-600">{subscription.months[month].amount ? subscription.months[month].amount : amount}</td>
                                            <td className="border border-slate-600">{subscription.months[month].dueDate}</td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].dueDateHijri.year}-
                                                {subscription.months[month].dueDateHijri.month.number}-
                                                {subscription.months[month].dueDateHijri.day}
                                            </td>
                                            <td className="border border-slate-600">
                                                {date && date.getFullYear()}-{date && date.getMonth() + 1}-
                                                {date && date.getDate()}
                                            </td>
                                            <td className="border border-slate-600">
                                                {date && hijriDate[2]}-{date && hijriDate[1].number}-{date && hijriDate[0]}
                                            </td>
                                            <td id={subscription._id} onClick={() => {
                                                setComment({
                                                    _id: subscription._id,
                                                    month: month,
                                                    comment: "",
                                                })
                                                document.getElementById('addNote').showModal()
                                            }} className="border border-slate-600 cursor-pointer">
                                                {subscription.months[month].comments}
                                            </td>
                                            <td id={subscription.idUser._id} className="border border-slate-600">
                                                {subscription.months[month].amount != 0 ? "تم الدفع بنجاح" : <button onClick={() => {
                                                    if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                                        handleSubmit({
                                                            idUser: subscription.idUser._id,
                                                            amount,
                                                            month,
                                                            dueDateHijri: subscription.months[month].dueDateHijri,
                                                            dueDate: inputs.date,
                                                            year: subscription.months[month].dueDateHijri.year,
                                                        })
                                                    }
                                                }} className="btn btn-sm btn-success text-sm">دفع</button>}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                )}
            </div>
            <AddNoteMonthly comment={comment} setComment={setComment} />
        </div>
    );
}

export default PayMonthlySubscriptions;
