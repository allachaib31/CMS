import { faArrowTrendUp, faArrowUpWideShort, faBuildingColumns, faLandmark, faMoneyBill, faPercent, faRightLong, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { addStockFetch, getActiveUserFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function StocksContributionForm() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        nameContributingParty: "",
        nameContributingBank: "",
        numberStocks: 0,
        costStocks: 0,
        totalCostStocks: 0,
        contributionDateMiladi: "",
        contributionDateHijri: "",
        freeStocks: 0,
        numberOfPreviousStockWithFreeStock: 0,
        previousStockCostWithFreeShare: 0,
        previousCostOfStockWithFreeStock: 0,
        memberId: "",
        memberPercentage: 0
    });
    const [listId, setListsId] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addStockFetch(inputs).then((res) => {
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
    useEffect(() => {
        getActiveUserFetch().then((res) => {
            setListsId(res.data.users)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="sm:container sm:mx-auto sm:p-0 px-[1rem]">
            <div>
                <Link to="/stocks" className="btn btn-primary text-[2rem] px-[2rem]">
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
                            <FontAwesomeIcon icon={faArrowTrendUp} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم الجهة المساهم فيها`} pattern="^.{3,1024}$" onChange={(event) => {
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
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم البنك المساهم عن طريقه" pattern="^.{3,1024}$" onChange={(event) => {
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
                            <FontAwesomeIcon icon={faArrowUpWideShort} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأسهم`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        numberStocks: event.target.value,
                                        numberOfPreviousStockWithFreeStock: Number(event.target.value) + Number(prevInput.freeStocks),
                                        totalCostStocks: event.target.value * prevInput.costStocks,
                                        //previousStockCostWithFreeShare: prevInput.totalCostStocks / (Number(event.target.value) + Number(prevInput.freeStocks)),
                                        //previousCostOfStockWithFreeStock: prevInput.numberOfPreviousStockWithFreeStock * (prevInput.totalCostStocks / (Number(event.target.value) + Number(prevInput.freeStocks)))
                                    }
                                })
                            }} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`تكلفة السهم`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        costStocks: event.target.value,
                                        totalCostStocks: event.target.value * prevInput.numberStocks,
                                        previousStockCostWithFreeShare: event.target.value,//(event.target.value * prevInput.numberStocks) / (Number(prevInput.numberStocks) + Number(prevInput.freeStocks)),
                                        previousCostOfStockWithFreeStock: event.target.value * prevInput.numberStocks,//prevInput.numberOfPreviousStockWithFreeStock * ((event.target.value * prevInput.numberStocks) / (Number(prevInput.numberStocks) + Number(prevInput.freeStocks))),
                                    }
                                })
                            }} />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <select required onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    memberId: event.target.value
                                }
                            })
                        }} className="select formInput select-bordered w-full sm:w-1/2">
                            <option disabled selected>اختار العضو المساهم باسم الصندوق</option>
                            {
                                listId && listId.map((user) => {
                                    return (
                                        <option value={user._id}>{user.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faPercent} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`نسبته من الربح`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        memberPercentage: Number(event.target.value)
                                    }
                                })
                            }} />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative w-full">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" disabled value={inputs.totalCostStocks} title={`اجمالي تكلفة الأسهم`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        totalCostStocks: event.target.value
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
                    {/* <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faArrowUpWideShort} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`الأسهم المجانية`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        freeStocks: event.target.value,
                                        numberOfPreviousStockWithFreeStock: Number(event.target.value) + Number(prevInput.numberStocks),
                                        previousStockCostWithFreeShare: prevInput.totalCostStocks / (Number(prevInput.numberStocks) + Number(event.target.value)),
                                        previousCostOfStockWithFreeStock: (Number(event.target.value) + Number(prevInput.numberStocks)) * (prevInput.totalCostStocks / (Number(prevInput.numberStocks) + Number(event.target.value))),
                                    }
                                })
                            }} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" disabled value={inputs.numberOfPreviousStockWithFreeStock} title={`عدد الاسهم السابقة مع الاسهم المجانية`} onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        numberOfPreviousStockWithFreeStock: event.target.value
                                    }
                                })
                            }} />
                        </div>
                    </div>*/}
                    {
                        /*           <div className="flex sm:flex-row flex-col gap-[1rem]">
                                   <div className="relative sm:w-1/2">
                                       <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                       <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" disabled value={inputs.previousStockCostWithFreeShare} title={`تكلفة السهم سابقا مع السهم المجاني`} onChange={(event) => {
                                           setInputs((prevInput) => {
                                               return {
                                                   ...prevInput,
                                                   previousStockCostWithFreeShare: event.target.value
                                               }
                                           })
                                       }} />
                                   </div>
                                   <div className="relative sm:w-1/2">
                                       <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                       <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" disabled value={inputs.previousCostOfStockWithFreeStock} title={`تكلفة الاسهم السابقة مع الاسهم المجانية`} onChange={(event) => {
                                           setInputs((prevInput) => {
                                               return {
                                                   ...prevInput,
                                                   previousCostOfStockWithFreeStock: event.target.value
                                               }
                                           })
                                       }} />
                                   </div>
                               </div>*/
                    }
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

export default StocksContributionForm