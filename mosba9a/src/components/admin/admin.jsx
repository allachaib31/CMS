import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '../alert/alert';
import { addAdminFetch, deleteAdminFetch, getAdminFetch } from '../../utils/apiFetch';

function Admin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [admins, setAdmins] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleDelete = (id,index) => {
        setShowAlert({
            display: false,
        });
        deleteAdminFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            let arr = admins;
            arr.splice(index,1);
            setAdmins(arr)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addAdminFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setAdmins((prev) => {
                return [...prev, res.data.admin]
            })
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
    useEffect(() => {
        getAdminFetch().then((res) => {
            setAdmins(res.data.admins)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
        })
    }, [])
    return (
        <div className='p-[2rem]'>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn btn-primary'>اضافة مسؤل</button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white">
                    <form
                        action=""
                        className=" h-full gap-5 flex flex-col justify-center items-center"
                    >
                        <h1 className='text-black text-3xl font-bold'>اضافة مسؤول</h1>
                        {showAlert.display ? <Alert msg={showAlert} /> : ""}
                        <label className="w-full input input-bordered  flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="formInput"
                                onChange={(e) => {
                                    setInputs((input) => {
                                        return {
                                            ...input,
                                            name: e.target.value.trim(),
                                        };
                                    });
                                }}
                                required
                                placeholder="الاسم"
                            />
                        </label>
                        <label className="w-full input input-bordered  flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="email"
                                className="formInput"
                                onChange={(e) => {
                                    setInputs((input) => {
                                        return {
                                            ...input,
                                            email: e.target.value.trim(),
                                        };
                                    });
                                }}
                                required
                                placeholder="بريد إلكتروني"
                            />
                        </label>
                        <label className="w-full input input-bordered  flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                className="formInput"
                                onChange={(e) => {
                                    setInputs((input) => {
                                        return {
                                            ...input,
                                            phoneNumber: e.target.value.trim(),
                                        };
                                    });
                                }}
                                required
                                placeholder="رقم الهاتف"
                            />
                        </label>
                        <label className="w-full input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="formInput"
                                onChange={(e) => {
                                    setInputs((input) => {
                                        return { ...input, password: e.target.value.trim() };
                                    });
                                }}
                                required
                                placeholder="كلمة المرور"
                            />
                        </label>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleSubmit();
                                }}
                                className="btn btn-success"
                            >
                                {submit ? (
                                    <span className="loading loading-ring loading-lg"></span>
                                ) : (
                                    "اضافة"
                                )}{" "}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto flex justify-center mt-[2rem]">
                <table className="bg-white text-black table w-[1000px]">
                    <thead>
                        <tr className="text-center text-black text-[1rem]">
                            <th>العدد</th>
                            <th>الاسم</th>
                            <th>بريد إلكتروني</th>
                            <th>رقم الهاتف</th>
                            <th>حدف</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-[1rem]">
                        {
                            admins && admins.map((admin,index) => {
                                return (
                                    <tr>
                                        <th>{admin.id}</th>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.phoneNumber}</td>
                                        <td><button onClick={() => {
                                            handleDelete(admin._id,index)
                                        }} className='btn btn-error'>حدف</button></td>
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

export default Admin