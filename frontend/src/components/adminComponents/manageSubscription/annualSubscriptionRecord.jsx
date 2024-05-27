import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAnnualSubscriptionsFetch } from '../../../utils/apiFetch';
import { hijriDateObject } from '../../../utils/getHijriDate';

function AnnualSubscriptionRecord() {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [yearOptions, setYearOptions] = useState([]);
    const [total, setTotal] = useState(Array(12).fill(0));
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const [year, setYear] = useState(hijriDateObject()[2]);

    const generateYear = () => {
        const years = [];
        for (let i = 1415; i <= year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };

    const calculateTotal = (subscriptions) => {
        const newTotal = Array(12).fill(0);
        subscriptions.forEach(subscription => {
            Object.entries(subscription.months).forEach(([month, details], index) => {
                newTotal[index] += Number(details.amount);
            });
        });
        setTotal(newTotal);
    };

    const getAnnualSubscriptions = () => {
        getAnnualSubscriptionsFetch(year)
            .then((res) => {
                setLoading((e) => !e);
                setSubscriptions(res.data.subscription);
                calculateTotal(res.data.subscription);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/auth");
                }
                setLoading((e) => !e);
                setShowAlert({
                    display: true,
                    status: false,
                    text: err.response ? err.response.data.msg : 'An error occurred'
                });
            });
    };

    useEffect(() => {
        generateYear();
        getAnnualSubscriptions();
    }, []);

    const renderSubscriptionAmounts = (months) => {
        return Object.entries(months).map(([month, details], index) => (
            <td className='border border-slate-600' key={index}>{details.amount}</td>
        ));
    };

    const renderSubscriptions = () => {
        return subscriptions.map((subscription, subIndex) => (
            <tr key={subIndex}>
                <th className='border border-slate-600'>{subscription.idUser.name}</th>
                {renderSubscriptionAmounts(subscription.months)}
                <td className='border border-slate-600'>{subscription.total}</td>
                <td className='border border-slate-600'>{subscription.numberofArrears}</td>
                <td className='border border-slate-600'>
                    <Link to={`/subscription/annualSubscriptionRecordDetails?id=${subscription.idUser._id}`} className="btn btn-info">التفاصيل</Link>
                </td>
            </tr>
        ));
    };

    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                سجل الاشتراكات السنوي لسنة {year}
            </h1>
            <div className="join flex-wrap mb-[1rem]">
                <select
                    onChange={(event) => setYear(event.target.value)}
                    className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item"
                >
                    {yearOptions.map((value) => (
                        <option key={value} value={value} selected={year === value}>
                            {value}
                        </option>
                    ))}
                </select>
                <div className="indicator xs:mt-0 mt-[1rem]">
                    <button onClick={() => {
                        setLoading(e => !e);
                        getAnnualSubscriptions()
                    }} className="btn xs:w-auto bg-primary text-[20px] text-white join-item">
                        ابحث
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto mt-[2rem]">
                {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> : <table className="table border-separate border-spacing-2 border text-[1rem] w-[1800px]">
                    <thead className='text-[1rem]'>
                        <tr>
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
                            <th className='border border-slate-600'>المتاخرات</th>
                            <th className='border border-slate-600'>تفاصيل اكثر</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderSubscriptions()}
                        <tr>
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
                </table>}
            </div>
        </div>
    );
}

export default AnnualSubscriptionRecord;
