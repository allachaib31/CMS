import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addAdsFetch, deleteAdsFetch, getAdsFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function SlideShow() {
    const navigate = useNavigate();
    const [ads, setAds] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        text: "",
        endDate: "",
    });
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
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج النص المتحرك
            </h1>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn btn-primary text-[1.1rem] font-bold'>اضافة نص</button>
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
                    }} required type="text" placeholder="ادخل النص" className="formInput input input-bordered w-full mb-[1rem]" />
                    تاريخ نهاية العرض <input type="date" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                endDate: event.target.value
                            }
                        })
                    }} required className="formInput input input-bordered " />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleSubmit();
                            }} disabled={submit} className="btn btn-success">{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className="border border-slate-600">رقم</th>
                            <th className="border border-slate-600">الاعلان</th>
                            <th className="border border-slate-600">حدف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ads && ads.map((ad, index) => {
                                return (
                                    <tr className="text-center" key={ad.id}>
                                        <td className="border border-slate-600">{ad.id}</td>
                                        <td className="border border-slate-600">{ad.text}</td>
                                        <td className="border border-slate-600"><button className='btn btn-error' onClick={() => {
                                            handleDelete(ad._id, index)
                                        }}>حدف</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SlideShow