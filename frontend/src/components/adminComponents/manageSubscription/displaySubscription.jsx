import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hijriDateObject } from "../../../utils/getHijriDate";
import { getSubscriptionsFormFetch } from "../../../utils/apiFetch";

function DisplaySubscription() {
    const navigate = useNavigate();
    const [date, setDate] = useState(hijriDateObject());
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState([]);
    const [inputs, setInputs] = useState({
        month: date[1].number,
        year: date[2],
    });
    const [month, setMonth] = useState(inputs.month);
    const [yearOptions, setYearOptions] = useState([]);
    const generateYear = () => {
        const years = [];
        for (let i = 1415; i <= inputs.year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };
    const getSubscriptionsForm = () => {
        setLoading((e) => !e);
        //  alert(inputs.month)
        getSubscriptionsFormFetch(inputs)
            .then((res) => {
                setLoading((e) => !e);
                setSubscriptions(res.data.subscriptions);
                setMonth(inputs.month)
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/auth");
                }
                setLoading((e) => !e);
                setSubscriptions([]);
            });
    }
    useEffect(() => {
        generateYear();
        getSubscriptionsForm();
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <div className="mb-[1rem] flex lg:flex-row sm:gap-1 gap-[1rem] flex-col justify-center">
                <Link
                    to="/subscription/modifySubscriptionAmount"
                    className="text-[1rem] btn btn-primary"
                >
                    تعديل مبلغ الاشتراكات
                </Link>
                <Link
                    to="/subscription/annualSubscriptionRecord"
                    className="text-[1rem] btn btn-primary"
                >
                    سجل الاشتراكات السنوي
                </Link>
                <Link
                    to="/subscription/registerMemberFinancialData"
                    className="text-[1rem] btn btn-primary"
                >
                    سجل بيانات العضو المالية
                </Link>
                <Link
                    to="/subscription/subscriptionHistory"
                    className="text-[1rem] btn btn-primary"
                >
                    سجل الاشتراكات
                </Link>
                <Link
                    to="/subscription/paymentOfSubscriptions"
                    className="text-[1rem] btn btn-primary"
                >
                    دفع الاشتراكات
                </Link>
                <Link to="/subscription/managingLatePayments"
                    className="text-[1rem] btn btn-primary">
                    ادارة المدفوعات المتاخرة
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج الاشتراكات
            </h1>
            <div className="join">
                <select onChange={(event) => {
                    setInputs((input) => {
                        return { ...input, year: event.target.value.trim() }
                    })
                }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    {yearOptions.map((value) => (
                        <option key={value} value={value} selected={inputs.year === value}>
                            {value}
                        </option>
                    ))}
                </select>
                <select onChange={(event) => {
                    setInputs((input) => {
                        return { ...input, month: event.target.value.trim() }
                    })
                }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option value="1" selected={"1" == inputs.month}>محرم</option>
                    <option value="2" selected={"1" == inputs.month}>صفر</option>
                    <option value="3" selected={"3" == inputs.month}>ربيع الاول</option>
                    <option value="4" selected={"4" == inputs.month}>ربيع الثاني</option>
                    <option value="5" selected={"5" == inputs.month}>جمادى الاول</option>
                    <option value="6" selected={"6" == inputs.month}>جمادى الثاني</option>
                    <option value="7" selected={"7" == inputs.month}>رجب</option>
                    <option value="8" selected={"8" == inputs.month}>شعبان</option>
                    <option value="9" selected={"9" == inputs.month}>رمضان</option>
                    <option value="10" selected={"10" == inputs.month}>شوال</option>
                    <option value="11" selected={"11" == inputs.month}>ذو القعدة</option>
                    <option value="12" selected={"12" == inputs.month}>ذو الحجة</option>
                </select>
                <div className="indicator">
                    <button onClick={getSubscriptionsForm} className="btn btn-primary join-item">ابحث</button>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                {!loading ? (
                    <div className="flex justify-center">
                        {" "}
                        <span className=" loading loading-ring loading-lg"></span>
                    </div>
                ) : (
                    <table className="text-[1rem] table border-separate border-spacing-2 border w-[1200px] mx-auto">
                        <thead className="text-[1rem]">
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
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions &&
                                subscriptions.map((subscription) => {
                                    const createAt = new Date(
                                        subscription.months[month].createdAt
                                    );
                                    return (
                                        <tr>
                                            <th className="border border-slate-600">
                                                {subscription.idUser.name}
                                            </th>
                                            <td className="border border-slate-600">اشتراك شهري</td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].amount}
                                            </td>
                                            <td className="border border-slate-600">
                                                {createAt.getDate()}/{createAt.getMonth() + 1}/
                                                {createAt.getFullYear()}
                                            </td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].hijriDate.day}/
                                                {
                                                    subscription.months[month].hijriDate.month
                                                        .number
                                                }
                                                /{subscription.months[month].hijriDate.year}
                                            </td>
                                            <td className="border border-slate-600">
                                                {subscription.months[month].comments}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default DisplaySubscription;
