import { faCheckToSlot, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addVoteFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function AddVote() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        subject: "",
        votingStartDate: "",
        votingEndDate: "",
        choices: [],
        numberOfChoices: 4,
    })
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addVoteFetch(inputs).then((res) => {
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
                <Link to="/manageVote" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج التصويت
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <div className="relative sm:w-full">
                    <FontAwesomeIcon icon={faCheckToSlot} className="absolute top-[1rem] right-[1rem]" />
                    <input type="text" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                subject: event.target.value
                            }
                        })
                    }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`موضوع التصويت`} />
                </div>
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ بداية التصويت</h1>
                    <input type="date" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                votingStartDate: event.target.value
                            }
                        })
                    }} required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ نهاية التصويت</h1>
                    <input type="date" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                votingEndDate: event.target.value
                            }
                        })
                    }} required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
                <input type="number" onChange={(event) => {
                    setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            numberOfChoices: event.target.value
                        }
                    })
                }} value={inputs.numberOfChoices} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد اختيارات`} />
                {
                    Array.from({ length: inputs.numberOfChoices || 0 }).map((_, responseIndex) => (
                        <input
                            type="text"
                            onChange={(event) => {
                                setInputs((prevInput) => {
                                    let arr = prevInput.choices || [];
                                    arr[responseIndex] = event.target.value
                                    return {
                                        ...prevInput,
                                        choices: arr
                                    }
                                })
                            }}
                            className='formInput input input-bordered w-full '
                            required
                            placeholder={`الاختيار ${responseIndex + 1}`}
                            key={responseIndex}
                        />
                    ))
                }
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} disabled={submit} className='btn btn-primary w-full  font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
            </form>

        </div>
    )
}

export default AddVote