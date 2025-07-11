import { faPrint, faRightLong } from '@fortawesome/free-solid-svg-icons';
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
    const [year, setYear] = useState(new Date().getFullYear());

    const generateYear = () => {
        const years = [];
        for (let i = 2019; i <= year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };

    const calculateTotal = (subscriptions) => {
        const newTotal = Array(12).fill(0);
        console.log(subscriptions)
        subscriptions.forEach(subscription => {
            console.log(newTotal)
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
            <td className='border border-slate-600 text-ms' key={index}>{details.amount}</td>
        ));
    };

    const renderSubscriptions = () => {
        return subscriptions.map((subscription, subIndex) => (
            <tr className='text-center text-xs' key={subIndex}>
                <th className='border border-slate-600 text-xs'>{subscription.idUser.name}</th>
                {renderSubscriptionAmounts(subscription.months)}
                <td className='border border-slate-600'>{subscription.total}</td>
                <td className='border border-slate-600'>{subscription.numberofArrears}</td>
                <td className='border border-slate-600'>
                    <Link to={`/subscription/annualSubscriptionRecordDetails?id=${subscription.idUser._id}&smallId=${subscription.idUser.id}&name=${subscription.idUser.name}`} className="btn btn-xs text-xs btn-info">التفاصيل</Link>
                </td>
            </tr>
        ));
    };

    return (
        <div className="sm:p-0 px-4">
            <div className='container mx-auto'>
                <Link to="/subscription" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center font-bold">
                سجل الاشتراكات لعام : {year}
            </h1>
            <h1 className="text-center font-bold">
                الرصيد : {total.reduce((total, value) => {
                    return total + Number(value);
                })}
            </h1>
            <div className="container mx-auto flex-wrap">
                <Link to={`/print/recordAnnual?year=${year}`} target='_blank' className='ml-[1rem] btn btn-sm btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</Link>
                <select
                    onChange={(event) => setYear(event.target.value)}
                    className="select select-sm xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item"
                >
                    {yearOptions.map((value) => (
                        <option key={value} value={value} selected={year == value}>
                            {value}
                        </option>
                    ))}
                </select>
                <div className="indicator xs:mt-0 mt-[1rem]">
                    <button onClick={() => {
                        setLoading(e => !e);
                        getAnnualSubscriptions()
                    }} className="btn btn-sm xs:w-auto bg-primary text-white join-item">
                        ابحث
                    </button>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className="overflow-x-auto mt-[0.5rem]">
                    {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> : <table className="table table-xs border-separate border-spacing-0 border w-[450px] md:w-[1350px]">
                        <thead>
                            <tr className='text-center text-xs'>
                                <th className='border border-slate-600'>الاسم</th>
                                <th className='border border-slate-600'>يناير</th>
                                <th className='border border-slate-600'>فبراير</th>
                                <th className='border border-slate-600'>مارس</th>
                                <th className='border border-slate-600'>أبريل</th>
                                <th className='border border-slate-600'>مايو</th>
                                <th className='border border-slate-600'>يونيو</th>
                                <th className='border border-slate-600'>يوليو</th>
                                <th className='border border-slate-600'>أغسطس</th>
                                <th className='border border-slate-600'>سبتمبر</th>
                                <th className='border border-slate-600'>أكتوبر</th>
                                <th className='border border-slate-600'>نوفمبر</th>
                                <th className='border border-slate-600'>ديسمبر</th>

                                <th className='border border-slate-600'>رصيد <br />العضو</th>
                                <th className='border border-slate-600'>المتأخرات</th>
                                <th className='border border-slate-600'>تفاصيل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderSubscriptions()}
                            <tr className='text-center'>
                                <th className='border border-slate-600'>المجموع</th>
                                {total.map((value, index) => {
                                    return (<td className='border border-slate-600' key={index}>{value}</td>)
                                })}
                                <td className='border border-slate-600'>{
                                    total.reduce((total, value) => {
                                        return total + Number(value);
                                    })
                                }</td>
                                <td className='border border-slate-600'>0</td>
                            </tr>
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    );
}

export default AnnualSubscriptionRecord;
