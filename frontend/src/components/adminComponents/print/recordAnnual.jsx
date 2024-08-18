import React, { useEffect, useState } from 'react'
import { getAnnualSubscriptionsFetch } from '../../../utils/apiFetch';
import { useLocation, useNavigate } from 'react-router-dom';

function RecordAnnual() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [total, setTotal] = useState(Array(12).fill(0));
    const query = new URLSearchParams(useLocation().search);
    const calculateTotal = (subscriptions) => {
        const newTotal = Array(12).fill(0);
        subscriptions.forEach(subscription => {
            Object.entries(subscription.months).forEach(([month, details], index) => {
                newTotal[index] += Number(details.amount);
            });
        });
        setTotal(newTotal);
    };
    useEffect(() => {
        getAnnualSubscriptionsFetch(query.get("year")).then((res) => {
            console.log(res)
            if(!res.data.print){
                alert("ليس لديك الاذن طباعة سجل الاشتراكات")
                navigate("/subscription/annualSubscriptionRecord")
            }
            setLoading((e) => !e);
            setSubscriptions(res.data.subscription);
                calculateTotal(res.data.subscription);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        });
    }, []);
    const renderSubscriptionAmounts = (months) => {
        return Object.entries(months).map(([month, details], index) => (
            <td className='border border-slate-600' key={index}>{details.amount}</td>
        ));
    };

    const renderSubscriptions = () => {
        return subscriptions.map((subscription, subIndex) => (
            <tr className='text-center' key={subIndex}>
                <th className='border border-slate-600'>{subscription.idUser.name}</th>
                {renderSubscriptionAmounts(subscription.months)}
                <td className='border border-slate-600'>{subscription.total}</td>
                <td className='border border-slate-600'>{subscription.numberofArrears}</td>
            </tr>
        ));
    };
    useEffect(() => {
        if(loading) window.print();
    },[loading])
    return (
        <div id="printableArea">
            {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> : <div className='flex justify-center'> <table className="table border-separate border-spacing-2 border text-[1rem] w-[1300px]">
                    <thead className='text-[0.8rem]'>
                        <tr className='text-center'>
                            <th className='border border-slate-600'>الاسم</th>
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
                            <th className='border border-slate-600'>رصيد العضو</th>
                            <th className='border border-slate-600'>المتأخرات</th>
                        </tr>
                    </thead>
                    <tbody className='text-[0.8rem]'>
                        {renderSubscriptions()}
                        <tr className='text-center'>
                            <th className='border border-slate-600'>المجموع</th>
                            {total.map((value, index) => {
                                return (<td className='border border-slate-600' key={index}>{value}</td>)
                            })}
                            <td className='border border-slate-600'>{
                                total.reduce((total, value) => {
                                    return total + value;
                                })
                            }</td>
                            <td className='border border-slate-600'>0</td>
                        </tr>
                    </tbody>
                </table></div>}
        </div>
    )
}

export default RecordAnnual