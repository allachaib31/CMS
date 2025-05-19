import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addAdsFetch, deleteAdsFetch, getAdsFetch, repostAdsFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function SlideShow() {
    const navigate = useNavigate();
    const [ads, setAds] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        text: "",
        endDate: "",
    });
    const [repost, setRepost] = useState({
        id: "",
        date: "",
        type: "ads",
    })
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleDelete = (id, index) => {
        setShowAlert({
            display: false,
        });
        deleteAdsFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            const newList = [...ads];
            newList.splice(index, 1);
            setAds(newList)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        });
    }
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addAdsFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setAds((prev) => {
                return [...prev, res.data.ads]
            })
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
    const handleRepost = () => {
        setSubmit((e) => !e);
        setShowAlert({
            display: false,
        });
        repostAdsFetch(repost).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            setSubmit((e) => !e);
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        });
    }
    useEffect(() => {
        getAdsFetch().then((res) => {
            setAds(res.data.ads)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        });
    }, [])
    return (
        <div className="sm:p-0 px-[1rem] container mx-auto">
            <h1 className="text-center font-bold py-[0.5rem]">
                نموذج النص المتحرك
            </h1>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn btn-sm btn-primary font-bold'>اضافة نص</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    <input onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                text: event.target.value
                            }
                        })
                    }} required type="text" placeholder="ادخل النص" className="formInput input input-sm input-bordered w-full mb-[1rem]" />
                    تاريخ نهاية العرض <input type="date" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                endDate: event.target.value
                            }
                        })
                    }} required className="formInput input input-sm input-bordered " />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm">اغلاق</button>
                            <button onClick={(event) => {
                                event.preventDefault();
                                if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                    handleSubmit();
                                }
                            }} disabled={submit} className="btn btn-sm btn-success">{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="text-xs table border-separate border-spacing-0 border w-[400px] md:w-[1000px] mx-auto">
                    <thead className="text-xs text-center">
                        <tr>
                            <th className="border border-slate-600">رقم</th>
                            <th className="border border-slate-600">الاعلان</th>
                            <th className='border border-slate-600'>اعادة <br/>النشر</th>
                            <th className="border border-slate-600">حدف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ads && ads.map((ad, index) => {
                                return (
                                    <tr className="text-center text-xs" key={ad.id}>
                                        <td className="border border-slate-600">{ad.id}</td>
                                        <td className="border border-slate-600">{ad.text}</td>
                                        <td className='border border-slate-600'><button onClick={() => {
                                            setRepost((prev) => {
                                                return {
                                                    ...prev,
                                                    id: ad._id
                                                }
                                            })
                                            document.getElementById("repost2").showModal()
                                        }} className='btn btn-xs btn-success'>اعادة النشر</button></td>
                                        <td className="border border-slate-600"><button className='btn btn-xs btn-error' onClick={() => {
                                            if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                                handleDelete(ad._id, index)
                                            }
                                        }}>حدف</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <dialog id="repost2" className="modal">
                <div className="modal-box ">
                    <input type="date" className='input input-sm input-bordered' onChange={((event) => {
                        setRepost((prevInputs) => {
                            return {
                                ...prevInputs,
                                date: event.target.value
                            }
                        })
                    })} />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm">اغلاق</button>
                            <button className="btn btn-sm btn-success" onClick={(event) => {
                                event.preventDefault();
                                handleRepost();
                            }}>{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default SlideShow