import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../alert/alert';
import { addContestFetch } from '../../../utils/apiFetch';

function AddContest() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        competitionStartDate: "",
        competitionEndDate: "",
       // numberOfAwards: 0,
       // awards: []
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addContestFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            navigate("/manageContest")
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
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
        <div className='container mx-auto sm:p-0 px-[1rem]'>
            <div>
                <Link to="/manageContest" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <form className="py-[2rem] flex flex-col gap-[1rem]">
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <input type="text" onChange={(event) => {
                    return setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            name: event.target.value
                        }
                    })
                }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم المسابقة`} />
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ بداية المسابقة</h1>
                    <input type="date" onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                competitionStartDate: event.target.value
                            }
                        })
                    }} required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ نهاية المسابقة</h1>
                    <input type="date" onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                competitionEndDate: event.target.value
                            }
                        })
                    }}  required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
               { /*<input type="number" onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                numberOfAwards: event.target.value
                            }
                        })
                    }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الجوائز`} />
                    <input type='text' onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                awards: event.target.value.split(",")
                            }
                        })
                    }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`قم باضافة جوائز بترتيب مع الفصل بينهم بفاصلة`} />*/}
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} disabled={submit} className='btn text-white font-bold text-[20px] btn-primary'> {submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
            </form>
        </div>
    )
}

export default AddContest