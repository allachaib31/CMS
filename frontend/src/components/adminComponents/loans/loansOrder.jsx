import { faIdCard, faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../alert/alert';
import { hijriDateObject } from '../../../utils/getHijriDate';
import { addLoansFetch, getActiveUserFetch } from '../../../utils/apiFetch';

function LoansOrder() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [listId, setListsId] = useState(false);
    const [inputs, setInputs] = useState({
        nationalIdentificationNumber: "",
        amount: 0,
        premiumAmount: 0,
        numberOfInstallments: 0,
        dateOfReceipt: "",
        dateOfReceiptHijri: ""
    })
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addLoansFetch(inputs).then((res) => {
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
        <div className="sm:p-0 px-[1rem] container mx-auto">
            <div>
                <Link to="/loans" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                طلب قرض
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        <select required onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    nationalIdentificationNumber: event.target.value.trim()
                                }
                            })
                        }}
                            className="select formInput select-bordered w-full">
                            <option disabled selected>اختار العضو المساهم باسم الصندوق</option>
                            {
                                listId && listId.map((user) => {
                                    return (
                                        <option value={user._id}>{user.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                        <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مبلغ القرض " onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    amount: event.target.value
                                }
                            })
                        }} />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
                        <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأقساط`} onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    numberOfInstallments: event.target.value,
                                    premiumAmount: inputs.amount / event.target.value
                                }
                            })
                        }} />
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                        <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مبلغ القسط" title="مبلغ القسط " disabled value={inputs.premiumAmount} />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label>تاريخ استلام القرض  (الميلادي)</label>
                        <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأقساط`} onChange={(event) => {
                            return setInputs((prevInput) => {
                                const hijriDate = hijriDateObject(event.target.value);
                                return {
                                    ...prevInput,
                                    dateOfReceipt: event.target.value,
                                    dateOfReceiptHijri: {
                                        day: hijriDate[0],
                                        month: hijriDate[1],
                                        year: hijriDate[2],
                                    }
                                }
                            })
                        }} />
                    </div>
                    <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label>تاريخ استلام القرض  (الهجري)</label>
                        {
                            inputs.dateOfReceiptHijri ? <span>{inputs.dateOfReceiptHijri.day}/{inputs.dateOfReceiptHijri.month.number}/{inputs.dateOfReceiptHijri.year}</span> : ""
                        }
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

export default LoansOrder