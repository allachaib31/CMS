import { faMoneyBill, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hijriDateObject } from "../../../utils/getHijriDate";
import { addBloodMoneyFetch } from "../../../utils/apiFetch";
import Alert from "../../alert/alert";

function RequestBloodMoney() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        amount: "",
        exchangeDateMiladi: "",
        exchangeDateHijri: "",
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
        addBloodMoneyFetch(inputs).then((res) => {
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
    return <div className="sm:p-0 px-[1rem] container mx-auto">
        <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
            طلب صرف دية 
        </h1>
        <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="flex sm:flex-row flex-col gap-[1rem]">
                <div className="relative sm:w-1/2">
                    <FontAwesomeIcon icon={faUser} className="absolute top-[1rem] right-[1rem]" />
                    <input type="text" onChange={(event) => {
                        return setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                name: event.target.value
                            }
                        })
                    }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`المستفيد`} />
                </div>
                <div className="relative sm:w-1/2">
                    <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                    <input type="number" onChange={(event) => {
                        return setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                amount: event.target.value
                            }
                        })
                    }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="المبلغ المصروف" />
                </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-[1rem]">
                <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                    <label>تاريخ تاريخ الصرف  (الميلادي)</label>
                    <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأقساط`} onChange={(event) => {
                        return setInputs((prevInput) => {
                            const hijriDate = hijriDateObject(event.target.value);
                            return {
                                ...prevInput,
                                exchangeDateMiladi: event.target.value,
                                exchangeDateHijri: {
                                    day: hijriDate[0],
                                    month: hijriDate[1],
                                    year: hijriDate[2],
                                }
                            }
                        })
                    }} />
                </div>
                <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                    <label>تاريخ تاريخ الصرف  (الهجري)</label>
                    {
                        inputs.exchangeDateHijri ? <span>{inputs.exchangeDateHijri.day}/{inputs.exchangeDateHijri.month.number}/{inputs.exchangeDateHijri.year}</span> : ""
                    }
                </div>
            </div>
            <input type="text" onChange={(event) => {
                setInputs((prevInputs) => {
                    return {
                        ...prevInputs,
                        comments: event.target.value
                    }
                })
            }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اكتب بيان" pattern='^.{3,1024}$' />
            <button onClick={() => {
                if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                    handleSubmit()
                }

            }} disabled={submit} className='btn text-white font-bold text-[20px] btn-primary'>{submit ? <span className="loading loading-ring loading-lg"></span> : "اضافة"}</button>
        </form>
    </div>;
}

export default RequestBloodMoney;
