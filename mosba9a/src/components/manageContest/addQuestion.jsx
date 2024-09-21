import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { addQuestionFetch } from '../../utils/apiFetch';
import Alert from '../alert/alert';

function AddQuestion() {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [submit, setSubmit] = useState(false);
    const [disable, setDisable] = useState("");
    const [numberOfResponse, setNumberOfResponse] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [inputs, setInputs] = useState({
        question: "",
        typeQuestion: "",
        idContest: queryParams.get("idContest"),
        idBranche: queryParams.get("idBranche")
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addQuestionFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
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
        <div className="container mx-auto sm:p-0 px-[1rem]">
            <h1 className='text-3xl font-bold text-center'>اضافة سؤال</h1>
            <form action="" className='mt-[2rem] flex flex-col items-center justify-center gap-[1rem]'>
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <select onChange={(event) => {
                    setInputs({
                        question: "",
                        typeQuestion: event.target.value,
                        idContest: queryParams.get("idContest"),
                        idBranche: queryParams.get("idBranche")
                    })
                    setText("");
                    setNumberOfResponse(0)
                    setDisable(false)
                }} className="select select-bordered w-full max-w-md">
                    <option disabled selected>اختر نوع السؤال</option>
                    <option value="عادي">عادي</option>
                    <option value="املأ الفراغ">املأ الفراغ</option>
                    <option value="سحب">سحب</option>
                </select>
                {/*<input type="text" className='input input-bordered w-full max-w-md' disabled value="hhh" />*/}
                {
                    inputs.typeQuestion == "عادي" && <>
                        <input type="text" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    question: event.target.value
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                        <input type="number" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    numberOfResponse: event.target.value
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='إضافة عدد الإجابات' />
                        <input type="text" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    responses: event.target.value.split(",")
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='اكتب الاجابات وافصل بينهم بفاصلة' />
                        <select name="" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    correctResponse: event.target.value
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' id="">
                            <option value="" disabled selected>اختر الاجابة الصحيحة</option>
                            {
                                inputs.responses && inputs.responses.map((response) => {
                                    return (<option value={response} >{response}</option>)
                                })
                            }
                        </select>
                        <input type="number" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    point: event.target.value
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة' /></>
                }

                {
                    inputs.typeQuestion == "املأ الفراغ" && <>
                        <div className='flex w-full max-w-md'>
                            <input type="text" onChange={(event) => {
                                setText(event.target.value);
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        question: event.target.value
                                    }
                                })
                            }} value={text} disabled={disable} className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                            <button onClick={(event) => {
                                event.preventDefault();
                                setText((prevText) => {
                                    return prevText + "_____"
                                })
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        question: prevInput.question + "_____"
                                    }
                                })
                            }} disabled={disable} className='btn btn-primary font-bold'>إضافة فراغ</button>
                        </div>
                        <button onClick={(event) => {
                            event.preventDefault();
                            setDisable((e) => !e);
                            const regex = new RegExp("_____", 'gi');

                            const matches = text.match(regex);
                            setNumberOfResponse(matches ? matches.length : 0)
                        }} className='btn btn-primary font-bold max-w-md'>إضافة الاجوبة</button>
                        {
                            Array.from({ length: numberOfResponse || 0 }).map((_, responseIndex) => (
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setInputs((prevInput) => {
                                            let arr = prevInput.responses || [];
                                            arr[responseIndex] = event.target.value.split(",")
                                            return {
                                                ...prevInput,
                                                responses: arr
                                            }
                                        })
                                    }}
                                    className='input input-bordered w-full max-w-md'
                                    placeholder={`الاجابات المحتملة للخانة ${responseIndex + 1} (قم باضافة فاصلة مابين الاجابات)`}
                                    key={responseIndex}
                                />
                            ))
                        }
                        <input type="number" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    point: event.target.value
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة' />
                    </>
                }
                {
                    inputs.typeQuestion == "سحب" && <>
                        <div className='flex w-full max-w-md'>
                            <input type="text" onChange={(event) => {
                                setText(event.target.value);
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        question: event.target.value
                                    }
                                })
                            }} value={text} disabled={disable} className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                            <button onClick={(event) => {
                                event.preventDefault();
                                setText((prevText) => {
                                    return prevText + "_____"
                                })
                                setInputs((prevInput) => {
                                    return {
                                        ...prevInput,
                                        question: prevInput.question + "_____"
                                    }
                                })
                            }} disabled={disable} className='btn btn-primary font-bold'>إضافة فراغ</button>
                        </div>
                        <button onClick={(event) => {
                            event.preventDefault();
                            setDisable((e) => !e);
                            const regex = new RegExp("_____", 'gi');

                            const matches = text.match(regex);
                            setNumberOfResponse(matches ? matches.length : 0)
                        }} className='btn btn-primary font-bold max-w-md'>إضافة الاجوبة</button>
                        {
                            Array.from({ length: numberOfResponse || 0 }).map((_, responseIndex) => (
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setInputs((prevInput) => {
                                            let arr = prevInput.responses || [];
                                            arr[responseIndex] = event.target.value
                                            return {
                                                ...prevInput,
                                                responses: arr
                                            }
                                        })
                                    }}
                                    className='input input-bordered w-full max-w-md'
                                    placeholder={`الاجابات للخانة ${responseIndex + 1}`}
                                    key={responseIndex}
                                />
                            ))
                        }
                        <input type="text" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    falseResponse: event.target.value.split(",")
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='اضافة اجوبة عشوائية و افصل بينهم بفاصلة' />
                        <input type="number" onChange={(event) => {
                            setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    point: event.target.value
                                }
                            })
                        }} className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة' />
                    </>
                }

                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} disabled={submit} className='btn btn-primary w-full max-w-md font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
            </form>
        </div>
    )
}

export default AddQuestion