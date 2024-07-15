import React, { useState } from 'react'

function AddQuestion() {
    const [text, setText] = useState("");
    const [disable, setDisable] = useState("");
    const [numberOfResponse, setNumberOfResponse] = useState(0);
    const [inputs, setInputs] = useState({
        question: "",
        typeQuestion: ""
    })
    return (
        <div className="container mx-auto sm:p-0 px-[1rem]">
            <h1 className='text-3xl font-bold text-center'>اضافة سؤال</h1>
            <form action="" className='mt-[2rem] flex flex-col items-center justify-center gap-[1rem]'>
                <select onChange={(event) => {
                    setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            typeQuestion: event.target.value
                        }
                    })
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
                        <input type="text" className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                        <input type="number" className='input input-bordered w-full max-w-md' placeholder='إضافة عدد الإجابات' />
                        <input type="text" className='input input-bordered w-full max-w-md' placeholder='اكتب الاجابات وافصل بينهم بفاصلة' />
                        <input type="text" className='input input-bordered w-full max-w-md' placeholder='اكتب الاجابة الصحيحة' />
                        <input type="number" className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة' /></>
                }

                {
                    inputs.typeQuestion == "املأ الفراغ" && <>
                        <div className='flex w-full max-w-md'>
                            <input type="text" onChange={(event) => {
                                setText(event.target.value);
                            }} value={text} disabled={disable} className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                            <button onClick={(event) => {
                                event.preventDefault();
                                setText((prevText) => {
                                    return prevText + "_____"
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
                                    className='input input-bordered w-full max-w-md'
                                    placeholder={`الاجابات المحتملة للخانة ${responseIndex + 1} (قم باضافة فاصلة مابين الاجابات)`}
                                    key={responseIndex}
                                />
                            ))
                        }
                        <input type="number" className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة' />
                    </>
                }
                {
                    inputs.typeQuestion == "سحب" && <>
                        <div className='flex w-full max-w-md'>
                            <input type="text" onChange={(event) => {
                                setText(event.target.value);
                            }} value={text} disabled={disable} className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                            <button onClick={(event) => {
                                event.preventDefault();
                                setText((prevText) => {
                                    return prevText + "_____"
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
                                    className='input input-bordered w-full max-w-md'
                                    placeholder={`الاجابات للخانة ${responseIndex + 1}`}
                                    key={responseIndex}
                                />
                            ))
                        }
                        <input type="text" className='input input-bordered w-full max-w-md' placeholder='اضافة اجوبة عشوائية و افصل بينهم بفاصلة' />
                        <input type="number" className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة' />
                    </>
                }
                {/*<input type="text" className='input input-bordered w-full max-w-md' disabled value="hhh" />
                <input type="text" className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال'/>
                <input type="number" className='input input-bordered w-full max-w-md' placeholder='إضافة عدد الإجابات'/>
                <input type="number" className='input input-bordered w-full max-w-md' placeholder='إضافة نقطة'/>*/}
                {/*<div className='flex w-full max-w-md'>
                    <input type="text" onChange={(event) => {
                        setText(event.target.value);
                    }} value={text} disabled={disable} className='input input-bordered w-full max-w-md' placeholder='إضافة سؤال' />
                    <button onClick={(event) => {
                        event.preventDefault();
                        setText((prevText) => {
                            return prevText + "_____"
                        })
                    }} disabled={disable} className='btn btn-primary font-bold'>إضافة فراغ</button>
                </div>*/}
                {/*<button onClick={(event) => {
                    event.preventDefault();
                    setDisable((e) => !e);
                    const regex = new RegExp("_____", 'gi'); 
                    
                    const matches = text.match(regex);
                    setNumberOfResponse(matches ? matches.length : 0)
                }} className='btn btn-primary font-bold max-w-md'>إضافة الاجوبة</button>*/}
                {/*
                    Array.from({ length: numberOfResponse || 0 }).map((_, responseIndex) => (
                        <input
                            type="text"
                            className='input input-bordered w-full max-w-md'
                            placeholder={`الاجابات المحتملة للخانة ${responseIndex + 1} (قم باضافة فاصلة مابين الاجابات)`}
                            key={responseIndex}
                        />
                    ))*/
                }

                <button className='btn btn-primary w-full max-w-md font-bold'>إضافة</button>
            </form>
        </div>
    )
}

export default AddQuestion