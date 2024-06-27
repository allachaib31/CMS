import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnnualSubscriptionsDetailsFetch } from '../../../utils/apiFetch';

function RecordAnnualDetails() {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [subscriptions, setSubscriptions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        idUser: query.get('idUser'),
        typeSearch: query.get("tyeSearch"),
        startYear: query.get("startYear"),
        endYear: query.get("endYear")
    });
    useEffect(() => {
        setLoading((e) => !e);
        console.log(inputs)
        getAnnualSubscriptionsDetailsFetch(inputs).then((res) => {
            if(!res.data.print){
                alert("ليس لديك الاذن طباعة سجل الاشتراكات")
                navigate("/subscription/annualSubscriptionRecord")
            }
            setLoading((e) => !e);
            setSubscriptions(res.data.subscription);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }, [])
    useEffect(() => {
        if (subscriptions.length > 0) window.print();
    }, [subscriptions])
    return (
        <div>
            <div className='flex justify-center'>
                {
                    inputs.typeSearch == "oneYear" ? <div className="overflow-x-auto">
                        {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> :
                            <table className="table border-separate border-spacing-2 w-[1000px] border text-[1rem]">
                                <thead className='text-[1rem] text-center'>
                                    <tr>
                                        <th className='border border-slate-600'>الاشهر</th>
                                        <th className='border border-slate-600'>المبلغ</th>
                                        <th className='border border-slate-600'>تاريخ الدفع</th>
                                        <th className='border border-slate-600'>ملاحظات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subscriptions && subscriptions.map((subscription) => {
                                            return Object.entries(subscription.months).map(([month, details], index) => (
                                                <tr className='text-center'>
                                                    <td className='border border-slate-600'>{details.name}</td>
                                                    <td className='border border-slate-600'>{details.amount}</td>
                                                    <td className='border border-slate-600'>{details.hijriDate && details.hijriDate.day ? details.hijriDate.day + "/" + details.hijriDate.month.number + "/" + details.hijriDate.year : "لم يتم دفع"}</td>
                                                    <td className='border border-slate-600'>{
                                                        details.amount == 0 ? "" : details.comments
                                                    }</td>
                                                </tr>
                                            ))
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div> :
                        <table className="table border-separate border-spacing-2 border text-[1rem] w-[2000px]">
                            <thead className='text-center text-[1rem]'>
                                <tr>
                                    <th className='border border-slate-600'>الاسم</th>
                                    <th className='border border-slate-600'>السنة</th>
                                    <th className='border border-slate-600'>محرم</th>
                                    <th className='border border-slate-600'>صفر</th>
                                    <th className='border border-slate-600'>ربيع الاول</th>
                                    <th className='border border-slate-600'>ربيع الثاني</th>
                                    <th className='border border-slate-600'>جمادى الاول</th>
                                    <th className='border border-slate-600'>جمادى الثاني</th>
                                    <th className='border border-slate-600'>رجب</th>
                                    <th className='border border-slate-600'>شعبان</th>
                                    <th className='border border-slate-600'>رمضان</th>
                                    <th className='border border-slate-600'>شوال</th>
                                    <th className='border border-slate-600'>ذو القعدة</th>
                                    <th className='border border-slate-600'>ذو الحجة</th>
                                    <th className='border border-slate-600'>ملاحظات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subscriptions && subscriptions.map(((subscription, subIndex) => (
                                        <tr className='text-center'>
                                            <th className='border border-slate-600'>{subscription.idUser.name}</th>
                                            <th className='border border-slate-600'>{subscription.year}</th>
                                            {
                                                Object.entries(subscription.months).map(([month, details], index) => (
                                                    <td className='border border-slate-600' key={index}>{details.amount}</td>
                                                ))
                                            }
                                            <th id={subscription._id} className='border border-slate-600'>{subscription.comments}</th>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>

                }
            </div>
        </div>
    )
}

export default RecordAnnualDetails