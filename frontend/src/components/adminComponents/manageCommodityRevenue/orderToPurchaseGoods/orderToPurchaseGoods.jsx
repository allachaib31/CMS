import { faBriefcase, faIdCard, faLandmark, faLocationDot, faMapLocationDot, faMoneyBill, faPercent, faPercentage, faPhone, faRightLong, faStore, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../../utils/getHijriDate';
import { addCommodityRevenueFetch, getActiveUserFetch, getMoneyBoxFetch } from '../../../../utils/apiFetch';
import Alert from '../../../alert/alert';

function OrderToPurchaseGoods() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [moneyBox, setMoneyBox] = useState(false);
    const [listId, setListsId] = useState(false);
    const [inputs, setInputs] = useState({
        customerData: {
            name: "",
            job: "",
            nationalIdentificationNumber: "",
            phoneNumber: "",
            region: "",
            address: "",
        },
        sponsorData: {
            idSponsor: "",
            name: "",
            nationalIdentificationNumber: "",
            sponsorRatio: 0,
            amount: 0,
            phoneNumber: "",
            region: "",
            address: "",
        },
        commodityData: {
            itemType: "",
            purchaseAmount: 0,
            dateOfPurchase: "",
            dateOfPurchaseHijri: "",
            amountPaid: 0,
            saleAmount: 0,
            saleDate: "",
            saleDateHijri: "",
            dateOfPayment: "",
            dateOfPaymentHijri: "",
            paymentExpiryDate: "",
            paymentExpiryDateHijri: "",
            premiumAmount: 0,
            numberOfInstallments: 0,
            currentBalanceFund: 0,
            contributionAmount: 0,
            contributionPercentage: 0,
            profitRatio: 0,
            profitAmount: 0,
            balance: 0,
        },
        comments: ""
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addCommodityRevenueFetch(inputs).then((res) => {
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
        getMoneyBoxFetch().then((res) => {
            console.log(res)
            setInputs((prevInput) => {
                return {
                    ...prevInput, commodityData: {
                        ...prevInput.commodityData,
                        currentBalanceFund: res.data.moneyBox.amount
                    }
                }
            })
            setMoneyBox((e) => !e)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            navigate("/commodityRevenue")
        })
    }, []);
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
        <div className="container mx-auto sm:p-0 px-[1rem]">
            <div>
                <Link to="/commodityRevenue" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">
                طلب شراء سلعة
            </h1>
            {
                !moneyBox ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    <div className='flex flex-col gap-[1rem]'>
                        <h1>بيانات العميل</h1>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faUser} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم العميل`} onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, customerData: {
                                                ...prevInput.customerData,
                                                name: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faBriefcase} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="الوظيفة" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, customerData: {
                                                ...prevInput.customerData,
                                                job: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="رقم الهوية الوطنية" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, customerData: {
                                                ...prevInput.customerData,
                                                nationalIdentificationNumber: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="[1-9]\d{9}" />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faPhone} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="رقم الجوال" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, customerData: {
                                                ...prevInput.customerData,
                                                phoneNumber: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="05\d{8}" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faLocationDot} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="المنطقة" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, customerData: {
                                                ...prevInput.customerData,
                                                region: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMapLocationDot} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="العنوان" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, customerData: {
                                                ...prevInput.customerData,
                                                address: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <h1>بيانات الكفيل (العضو المشرف على شراء السلعة)</h1>
                        {
                            /*
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faUser} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم الكفيل`} onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, sponsorData: {
                                                ...prevInput.sponsorData,
                                                name: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="رقم الهوية الوطنية" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, sponsorData: {
                                                ...prevInput.sponsorData,
                                                nationalIdentificationNumber: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="[1-9]\d{9}" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faPhone} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="رقم الجوال" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, sponsorData: {
                                                ...prevInput.sponsorData,
                                                phoneNumber: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="05\d{8}" />
                            </div>
                        </div>
                            */
                        }
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <select required onChange={(event) => {
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput, sponsorData: {
                                            ...prevInput.sponsorData,
                                            idSponsor: event.target.value.trim()
                                        }
                                    }
                                })
                            }} className="select formInput select-bordered w-full sm:w-1/2">
                                <option disabled selected>اختار العضو المساهم باسم الصندوق</option>
                                {
                                    listId && listId.map((user) => {
                                        return (
                                            <option value={user._id}>{user.id} ({user.name})</option>
                                        )
                                    })
                                }
                            </select>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faPercent} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, sponsorData: {
                                                ...prevInput.sponsorData,
                                                sponsorRatio: Number(event.target.value.trim())
                                            }
                                        }
                                    })
                                }} placeholder="نسبة الكفيل" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faLocationDot} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="المنطقة" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, sponsorData: {
                                                ...prevInput.sponsorData,
                                                region: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMapLocationDot} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="العنوان" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, sponsorData: {
                                                ...prevInput.sponsorData,
                                                address: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <h1> بيانات السلع</h1>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faStore} className="absolute top-[1rem] right-[1rem]" />
                                <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`نوع السلعة`} onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                itemType: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} pattern="^.{3,1024}$" />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                purchaseAmount: Number(event.target.value.trim()),
                                                contributionAmount: Number(event.target.value.trim()),
                                                contributionPercentage: (Number(event.target.value.trim()) * 100) / inputs.commodityData.currentBalanceFund,
                                                //profitRatio: ((inputs.commodityData.saleAmount - Number(event.target.value.trim())) / Number(event.target.value.trim())) * 100,
                                                //profitAmount: prevInput.commodityData.saleAmount - Number(event.target.value.trim())
                                            }
                                        }
                                    })
                                }} placeholder="مبلغ الشراء" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                                <label>تاريخ الشراء (الميلادي)</label>
                                <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        const hijriDate = hijriDateObject(event.target.value);
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                dateOfPurchase: event.target.value,
                                                dateOfPurchaseHijri: {
                                                    day: hijriDate[0],
                                                    month: hijriDate[1],
                                                    year: hijriDate[2],
                                                }
                                            }
                                        }
                                    })
                                }} />
                            </div>
                            <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                                <label>تاريخ الشراء (الهجري)</label>
                                {
                                    inputs.commodityData.dateOfPurchaseHijri ? <span>{inputs.commodityData.dateOfPurchaseHijri.day}/{inputs.commodityData.dateOfPurchaseHijri.month.number}/{inputs.commodityData.dateOfPurchaseHijri.year}</span> : ""
                                }
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                amountPaid: Number(event.target.value.trim())
                                            }
                                        }
                                    })
                                }} placeholder={`المبلغ المسدد`} />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        //let amount = (Number(event.target.value.trim()) - prevInput.commodityData.purchaseAmount) - ((Number(event.target.value.trim()) - prevInput.commodityData.purchaseAmount) * (prevInput.sponsorData.sponsorRatio / 100));
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                saleAmount: Number(event.target.value.trim()),
                                                //profitAmount: amount,
                                                //profitRatio: (amount / prevInput.commodityData.purchaseAmount) * 100,
                                            }
                                        }
                                    })
                                }} title="مبلغ البيع" placeholder="مبلغ البيع" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                                <label>تاريخ البيع (الميلادي)</label>
                                <input type="date" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        const hijriDate = hijriDateObject(event.target.value);
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                saleDate: event.target.value,
                                                saleDateHijri: {
                                                    day: hijriDate[0],
                                                    month: hijriDate[1],
                                                    year: hijriDate[2],
                                                }
                                            }
                                        }
                                    })
                                }} required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                            </div>
                            <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                                <label>تاريخ البيع (الهجري)</label>
                                {
                                    inputs.commodityData.saleDateHijri ? <span>{inputs.commodityData.saleDateHijri.day}/{inputs.commodityData.saleDateHijri.month.number}/{inputs.commodityData.saleDateHijri.year}</span> : ""
                                }
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                                <label>تاريخ بدء السداد بالميلادي</label>
                                <input type="date" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        const hijriDate = hijriDateObject(event.target.value);
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                dateOfPayment: event.target.value,
                                                dateOfPaymentHijri: {
                                                    day: hijriDate[0],
                                                    month: hijriDate[1],
                                                    year: hijriDate[2],
                                                }
                                            }
                                        }
                                    })
                                }} required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                            </div>
                            <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                                <label>تاريخ بدء السداد بالهجري</label>
                                {
                                    inputs.commodityData.dateOfPaymentHijri ? <span>{inputs.commodityData.dateOfPaymentHijri.day}/{inputs.commodityData.dateOfPaymentHijri.month.number}/{inputs.commodityData.dateOfPaymentHijri.year}</span> : ""
                                }
                            </div>
                        </div>

                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative w-full">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" min={0} onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                numberOfInstallments: event.target.value,
                                                //premiumAmount: prevInput.commodityData.saleAmount / event.target.value
                                            }
                                        }
                                    })
                                }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="عدد الاقساط" />
                            </div>
                            {
                            /*
                             <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" disabled value={inputs.commodityData.premiumAmount} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`مبلغ القسط`} />
                            </div>*/}
                        </div>
                        {
                            /**
                             *                         <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faLandmark} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" value={inputs.commodityData.currentBalanceFund} disabled className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`الرصيد الحالي صندوق`} title={`الرصيد الحالي صندوق`} />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" value={inputs.commodityData.contributionAmount} disabled required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    if (event.target.value > inputs.commodityData.currentBalanceFund) event.target.value = inputs.commodityData.currentBalanceFund;
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                contributionAmount: Number(event.target.value.trim()),
                                                contributionPercentage: (Number(event.target.value.trim()) * 100) / inputs.commodityData.currentBalanceFund
                                            }
                                        }
                                    })
                                }} placeholder="مبلغ المساهمة " title="مبلغ المساهمة " />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faPercent} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" value={inputs.commodityData.contributionPercentage.toFixed(2)} disabled className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`نسبة المساهمة`} title={`نسبة المساهمة`} />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faPercentage} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" disabled value={inputs.commodityData.profitRatio} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" onChange={(event) => {
                                    return setInputs((prevInput) => {
                                        return {
                                            ...prevInput, commodityData: {
                                                ...prevInput.commodityData,
                                                profitRatio: event.target.value.trim()
                                            }
                                        }
                                    })
                                }} placeholder="نسبة الربح" title="نسبة الربح" />
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-[1rem]">
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} required className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" disabled value={inputs.commodityData.profitAmount} className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" title='مبلغ الربح' placeholder={`مبلغ الربح`} />
                            </div>
                            <div className="relative sm:w-1/2">
                                <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                                <input type="number" value={inputs.commodityData.balance} disabled required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="الرصيد" title="الرصيد" />
                            </div>
                        </div>
                             */
                        }
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        console.log(inputs)
                        handleSubmit();
                    }} disabled={submit} className='btn text-white font-bold text-[20px] btn-primary'>{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
                </form>
            }
        </div>
    )
}

export default OrderToPurchaseGoods