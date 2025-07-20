import { faPrint, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { getAnnualSubscriptionsDetailsFetch } from '../../../utils/apiFetch';
import AddNoteRecordAnnualSubscriptions from '../../modals/addNoteRecordAnnualSubscriptions';

function AnnualSubscriptionRecordDetails() {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [subscriptions, setSubscriptions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        idUser: query.get('id'),
        typeSearch: "oneYear",
        startYear: hijriDateObject()[2],
        endYear: ""
    });
    const [comment, setComment] = useState({
        _id: "",
        year: "",
        comment: ""
    })
    const handleSearch = (typeSearch) => {
        setInputs((prevInput) => {
            return { ...prevInput, typeSearch: typeSearch }
        })
        getAnnualSubscriptionsDetails();
    }
    const getAnnualSubscriptionsDetails = () => {
        setLoading((e) => !e);
        getAnnualSubscriptionsDetailsFetch(inputs).then((res) => {
            setLoading((e) => !e);
            setSubscriptions(res.data.subscription);
            console.log(res)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }
    useEffect(() => {
        getAnnualSubscriptionsDetails();
    }, [])
    return (
        <div className="px-[1rem]">
            <h1 className="text-center text-sm font-bold py-[0.5rem]">
                سجل الاشتراكات السنوية  للعضو : {query.get("name")}
            </h1>
            <div className='flex flex-wrap gap-[1rem] container mx-auto'>
                <div>
                    <Link to="/subscription/annualSubscriptionRecord" className="btn btn-sm btn-primary px-[2rem]">
                        <FontAwesomeIcon icon={faRightLong} />
                    </Link>
                </div>
                <div>
                    <Link to={`/print/recordAnnualDetails?idUser=${inputs.idUser}&tyeSearch=${inputs.typeSearch}&startYear=${inputs.startYear}&endYear=${inputs.endYear}`} target='_blank' className='btn btn-sm w-24 btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> <span>طباعة</span></Link>
                </div>
                <div className='container mx-auto flex flex-wrap '>
                    <select onChange={(event) => {
                        setInputs((prevInput) => {
                            return { ...prevInput, typeSearch: event.target.value, endYear: (event.target.value == "years") ? hijriDateObject()[2] : "" }
                        })
                    }} className="select select-sm select-bordered w-full max-w-[7rem]">
                        <option value="oneYear">لسنة</option>
                        <option value="years">لسنوات</option>
                    </select>
                    {
                        inputs.typeSearch == "oneYear" ? <div className='flex'><input onChange={(event) => {
                            setInputs((prevInput) => {
                                return { ...prevInput, startYear: event.target.value.trim() }
                            })
                        }} type="text" className="formInput input input-sm input-bordered w-full max-w-[6rem]" placeholder='السنة' required pattern='\b(1[0-9]{3}|2[0-9]{3}|3[0-9]{3}|4[0-9]{3}|5[0-9]{3}|6[0-9]{3}|7[0-9]{3}|8[0-9]{3}|9[0-9]{3})\b' />
                            <button onClick={() => handleSearch("oneYear")} className='btn btn-sm xs:w-auto bg-primary text-white'>ابحث</button>
                        </div> : <div className='flex'>
                            <input onChange={(event) => {
                                setInputs((prevInput) => {
                                    return { ...prevInput, startYear: event.target.value.trim() }
                                })
                            }} type="text" className="formInput input input-sm input-bordered w-full max-w-[5rem]" placeholder='من ' required pattern='\b(1[0-9]{3}|2[0-9]{3}|3[0-9]{3}|4[0-9]{3}|5[0-9]{3}|6[0-9]{3}|7[0-9]{3}|8[0-9]{3}|9[0-9]{3})\b' />
                            <input onChange={(event) => {
                                setInputs((prevInput) => {
                                    return { ...prevInput, endYear: event.target.value.trim() }
                                })
                            }} type="text" className="formInput input input-sm input-bordered w-full max-w-[5rem]" placeholder='الى' required pattern='\b(1[0-9]{3}|2[0-9]{3}|3[0-9]{3}|4[0-9]{3}|5[0-9]{3}|6[0-9]{3}|7[0-9]{3}|8[0-9]{3}|9[0-9]{3})\b' />
                            <button onClick={() => handleSearch("customYear")} className='btn btn-sm xs:w-auto bg-primary text-white'>ابحث</button>
                        </div>
                    }
                </div>
            </div>

            <div className='flex justify-center'>
                {
                    inputs.typeSearch == "oneYear" ? <div className="overflow-x-auto">
                        {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> :
                            <table className="table table-xs border-separate border-spacing-0 w-[300px] border text-sm">
                                <thead className='text-xs text-center'>
                                    <tr>
                                        <th className='border border-slate-600'>الاشهر</th>
                                        <th className='border border-slate-600'>المبلغ</th>
                                        <th className='border border-slate-600'>تاريخ التسديد</th>
                                        <th className='border border-slate-600'>ملاحظات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subscriptions && subscriptions.map((subscription) => {
                                            return Object.entries(subscription.months).map(([month, details], index) => (
                                                <tr className='text-center text-xs'>
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
                    </div> : <div className="overflow-x-auto mt-[0.5rem]">
                        <table className="table table-xs border-separate border-spacing-0 border text-xs w-[500px] md:w-[1200px]">
                            <thead className='text-center text-xs'>
                                <tr className='text-xs'>
                                    <th className='border border-slate-600'>الاسم</th>
                                    <th className='border border-slate-600'>السنة</th>
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
                                    <th className='border border-slate-600'>ملاحظات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subscriptions && subscriptions.map(((subscription, subIndex) => (
                                        <tr className='text-center text-sm'>
                                            <th className='border border-slate-600'>{subscription.idUser.name}</th>
                                            <th className='border border-slate-600'>{subscription.year}</th>
                                            {
                                                Object.entries(subscription.months).map(([month, details], index) => (
                                                    <td className='border border-slate-600' key={index}>{details.amount}</td>
                                                ))
                                            }

                                            <th onClick={() => {
                                                setComment({
                                                    _id: subscription._id,
                                                    year: subscription.year,
                                                    comment: ""
                                                })
                                                document.getElementById('addNote').showModal()
                                            }
                                            } id={subscription._id} className='border border-slate-600'>{subscription.comments}</th>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <AddNoteRecordAnnualSubscriptions inputs={comment} setInputs={setComment} />
        </div>
    )
}

export default AnnualSubscriptionRecordDetails