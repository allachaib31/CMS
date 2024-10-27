import { faBoxOpen, faBuildingColumns, faClock, faLandmark, faMoneyBill, faPercent, faPercentage, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { addFinancialFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function FinancialCompanyForm() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        nameContributingParty: "",
        nameContributingBank: "",
        amount: 0,
        duration: 0,
        contributionDateMiladi: "",
        contributionDateHijri: "",
        contributionEndDateMiladi: "",
        contributionEndDateHijri: "",
    })
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addFinancialFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    return (
        <div className="sm:p-0 px-[1rem] container mx-auto">
            <div>
                <Link to="/financialCompany/displayContributionForm" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                طلب مساهمة
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <div className='flex flex-col gap-[1rem]'>
                    <h1>بيانات المساهمة</h1>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faBoxOpen} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم الشركة المالية`} pattern="^.{3,1024}$" onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        nameContributingParty: event.target.value
                                    }
                                })
                            }} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faBuildingColumns} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم البنك الذي سددت المساهمة عن طريقه" pattern="^.{3,1024}$" onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        nameContributingBank: event.target.value
                                    }
                                })
                            }} />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`مبلغ المساهمة`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        amount: event.target.value
                                    }
                                })
                            }} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faClock} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مدة المساهمة" onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        duration: event.target.value
                                    }
                                })
                            }} />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label> تاريخ المساهمة  (الميلادي)</label>
                            <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                const hijriDate = hijriDateObject(event.target.value);
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        contributionDateMiladi: event.target.value,
                                        contributionDateHijri: {
                                            day: hijriDate[0],
                                            month: hijriDate[1],
                                            year: hijriDate[2],
                                        }
                                    }
                                })
                            }} />
                        </div>
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label> تاريخ المساهمة  (الهجري)</label>
                            {
                                inputs.contributionDateHijri ? <span>{inputs.contributionDateHijri.day}/{inputs.contributionDateHijri.month.number}/{inputs.contributionDateHijri.year}</span> : ""
                            }
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label> تاريخ انتهاء المساهمة  (الميلادي)</label>
                            <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                const hijriDate = hijriDateObject(event.target.value);
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        contributionEndDateMiladi: event.target.value,
                                        contributionEndDateHijri: {
                                            day: hijriDate[0],
                                            month: hijriDate[1],
                                            year: hijriDate[2],
                                        }
                                    }
                                })
                            }} />
                        </div>
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label> تاريخ انتهاء المساهمة  (الهجري)</label>
                            {
                                inputs.contributionEndDateHijri ? <span>{inputs.contributionEndDateHijri.day}/{inputs.contributionEndDateHijri.month.number}/{inputs.contributionEndDateHijri.year}</span> : ""
                            }
                        </div>
                    </div>
                </div>
                <button onClick={(event) => {
                    event.preventDefault();
                    if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                        handleSubmit();
                    }
                }} disabled={submit} className='btn text-white font-bold text-[20px] btn-primary'>
                    {submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}
                </button>
            </form>
        </div>
    )
}

export default FinancialCompanyForm