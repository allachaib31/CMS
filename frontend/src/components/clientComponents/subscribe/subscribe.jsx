import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { hijriDateObject } from '../../../utils/getHijriDate';
import { getSubscribeClientFetch } from '../../../utils/apiFetch';

function SubscribeClient() {
    const navigate = useNavigate();
    const [yearOptions, setYearOptions] = useState([]);
    const [subscriptions, setSubscriptions] = useState(false);
    const [year, setYear] = useState(hijriDateObject()[2]);
    const generateYear = () => {
        const years = [];
        for (let i = 1415; i <= year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };
    const getSubscribeClient = () => {
        getSubscribeClientFetch(year).then((res) => {
            console.log(res.data)
            setSubscriptions(res.data.subscription);
        })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/authClient");
                }
            });
    }
    useEffect(() => {
        generateYear();
        getSubscribeClient();
    }, []);
    return (
        <div className='px-[1rem] sm:px-0 py-[2rem]'>
            <div className='container mx-auto'>
                <div className="flex-wrap mb-[1rem]">
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
                            //setLoading(e => !e);
                            getSubscribeClient()
                        }} className="btn xs:w-auto bg-primary text-[20px] text-white join-item">
                            ابحث
                        </button>
                    </div>
                </div>
                {
                    subscriptions && <div>
                        <div className="overflow-x-auto mt-[2rem]">
                            <table className="table border-separate border-spacing-2 border text-[1rem] w-[1000px]">
                                <thead className='text-[1rem]'>
                                    <tr className='text-center'>
                                        <th className='border border-slate-600'>الاشهر</th>
                                        <th className='border border-slate-600'>تاريخ الاستحقاق</th>
                                        <th className='border border-slate-600'>تاريخ الايداع</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subscriptions && Object.keys(subscriptions.months).map((key) => {
                                            const month = subscriptions.months[key];
                                            return (
                                                <tr className='text-center' key={key}>
                                                    <td className='border border-slate-600'>{month.name}</td>
                                                    <td className='border border-slate-600'>{month.dueDate}</td>
                                                    <td className='border border-slate-600'>{month.isInvoiceOverdue ? "انت متاخر عن الدفع" : month.createdAt}</td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SubscribeClient