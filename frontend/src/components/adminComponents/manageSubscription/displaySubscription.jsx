import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hijriDateObject } from "../../../utils/getHijriDate";
import { addMonthlySubscriptionsFetch, getSubscriptionsFormFetch } from "../../../utils/apiFetch";
import Alert from "../../alert/alert";
import AddNoteMonthly from "../../modals/addNoteMonthly";


function DisplaySubscription() {
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
            document.getElementById(data.idUser).innerHTML = "تم الدفع بنجاح" ;
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
                console.log(res);
                setLoading((e) => !e);
                setSubscriptions(res.data.subscriptions);
                setMonth(input.dateHijri.month.number);
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
    return (
        <div className="px-[0rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج الاشتراكات
            </h1>
            <div className="join items-center justify-center w-full gap-[1rem]">
                <input
                    className="input input-bordered"
                    onChange={(event) => {
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
                        getSubscriptionsForm({
                            date: event.target.value,
                            dateHijri: {
                                day: hijriDate[0],
                                month: hijriDate[1],
                                year: hijriDate[2],
                            },
                        });
                    }}
                    type="date"
                    id="dateInput"
                    name="dateInput"
                />
                <label htmlFor="">
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
            <div className="mt-[1rem] flex justify-center">
                <div className="flex gap-[0.2rem] sm:gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الاشتراكات لهذا الشهر</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{total}</h1>
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
                    <table className="text-[1rem] table border-separate border-spacing-2 border w-[1500px] mx-auto">
                        <thead className="text-[1rem] text-center">
                            <tr>
                                <th className="border border-slate-600" rowSpan={2}>
                                    اسم العضو
                                </th>
                                <th className="border border-slate-600" rowSpan={2}>
                                    نوع المبلغ
                                </th>
                                <th className="border border-slate-600" rowSpan={2}>
                                    المبلغ
                                </th>
                                <th className="text-center border border-slate-600" colSpan={2}>
                                    تاريخ الاستحقاق
                                </th>
                                <th className="text-center border border-slate-600" colSpan={2}>
                                    تاريخ الايداع
                                </th>
                                <th className="border border-slate-600" rowSpan={2}>
                                    ملاحظات
                                </th>
                            </tr>
                            <tr>
                                <th className="text-center border border-slate-600">
                                    الميلادي
                                </th>
                                <th className="text-center border border-slate-600">الهجري</th>
                                <th className="text-center border border-slate-600">
                                    الميلادي
                                </th>
                                <th className="text-center border border-slate-600">الهجري</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {subscriptions &&
                                subscriptions.map((subscription) => {
                                    const date = new Date(subscription.months[month].createdAt);
                                    const hijriDate = hijriDateObject(date);
                                    return (
                                        <tr>
                                            <th className="border border-slate-600">
                                                {subscription.idUser.name}
                                            </th>
                                            <td className="border border-slate-600">اشتراك شهري</td>
                                            <td className="border border-slate-600">{amount}</td>
                                            <td className="border border-slate-600">{subscription.months[month].dueDate}</td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].dueDateHijri.year}-
                                                {subscription.months[month].dueDateHijri.month.number}-
                                                {subscription.months[month].dueDateHijri.day}
                                            </td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].createdAt && date.getFullYear()+ "-" + (date.getMonth() + 1) + "-" +
                                                date.getDate()}
                                            </td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].createdAt && hijriDate[2] + "-" + hijriDate[1].number + "-" + hijriDate[0]}
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
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                )}
            </div>
            <AddNoteMonthly comment={comment} setComment={setComment}/>
        </div>
    );
}

export default DisplaySubscription;
