import {
    faEnvelope,
    faIdCard,
    faKey,
    faNoteSticky,
    faPhone,
    faRightLong,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchUserFetch, updatePasswordFetch, updateUserFetch } from "../../../utils/apiFetch";
import Alert from "../../alert/alert";

function UpdateUser() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [disbledSubmit, setDisbledSubmit] = useState({
        status: true,
        name: true,
        NationalIdentificationNumber: true,
        phoneNumber: true
    });
    const [inputs, setInputs] = useState({
        _id: "",
        name: "",
        NationalIdentificationNumber: "",
        phoneNumber: "",
        status: "",
        comments: ""
    });
    const [password, setPassword] = useState("");
    const [disbledPassword, setDisbledPassword] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const handleUpdatePassword = () => {
        setShowAlert({
            display: false,
        });
        updatePasswordFetch({
            idUser: id,
            password
        }).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            if (err.response.status == 404 || err.response.status == 422 || err.response.status == 403) {
                setShowAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
                return
            } else if (err.response.status == 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
            return
        })
    }
    const handleUpdate = () => {
        setSubmit((e) => !e);
        setShowAlert({
            display: false,
        });
        updateUserFetch(inputs).then((res) => {
            setSubmit((e) => !e)
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            setSubmit((e) => !e)
            if (err.response.status == 404 || err.response.status == 422 || err.response.status == 403) {
                setShowAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
                return
            } else if (err.response.status == 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
            return
        })
    }
    useEffect(() => {
        if (!id) {
            return navigate("/user")
        }
        searchUserFetch({
            searchMethod: "_id",
            searchValue: id
        }).then((res) => {
            if (res.data.user.length == 0) {
                navigate("/user");
            }
            setInputs({
                _id: res.data.user[0].id,
                name: res.data.user[0].name,
                NationalIdentificationNumber: res.data.user[0].NationalIdentificationNumber,
                phoneNumber: res.data.user[0].phoneNumber,
                status: res.data.user[0].status,
                comments: res.data.user[0].comments,
            })
            setLoading((e) => !e)
        }).catch((err) => {
        })
    }, []);
    return (
        <div className="container mx-auto  sm:p-0 px-[1rem]">
            <div>
                <Link to="/user" className="btn btn-primary btn-sm px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center  font-bold py-[1rem]">
                تحديث معلومات المستخدم
            </h1>
            {loading ? <div className="flex justify-center"><span className="loading loading-ring w-[4rem]"></span></div> : <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <div className="flex sm:flex-row flex-col gap-[0.5rem]">
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="absolute top-[0.5rem] right-[1rem]"
                        />
                        <input
                            type="text"
                            onChange={(e) => {
                                if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, name: true } });
                                else setDisbledSubmit(value => { return { ...value, name: false } });
                                setInputs((input) => {
                                    return { ...input, name: e.target.value }
                                })
                            }}
                            required
                            className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2"
                            placeholder={`اسم`}
                            value={inputs.name}
                            pattern="^.{3,1024}$"
                        />
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon
                            icon={faIdCard}
                            className="absolute top-[0.5rem] right-[1rem]"
                        />
                        <input
                            type="text"
                            onChange={(e) => {
                                if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, NationalIdentificationNumber: true } });
                                else setDisbledSubmit(value => { return { ...value, NationalIdentificationNumber: false } });
                                setInputs((input) => {
                                    return { ...input, NationalIdentificationNumber: e.target.value }
                                })
                            }}
                            required
                            className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2"
                            placeholder="رقم الهوية الوطنية"
                            value={inputs.NationalIdentificationNumber}
                            pattern="[1-9]\d{9}"
                        />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                <div className="relative sm:w-1/2">
                    <select onChange={(e) => {
                        setInputs((input) => {
                            return { ...input, status: e.target.value }
                        })
                    }} className="select select-sm w-full status" required>
                        <option value="not active" selected={inputs.status == "not active" ? true : false}>غير مفعل</option>
                        <option value="active" selected={inputs.status == "active" ? true : false}>مفعل</option>
                    </select>
                </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="absolute top-[0.5rem] right-[1rem]"
                        />
                        <input
                            type="text"
                            onChange={(e) => {
                                if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, phoneNumber: true } });
                                else setDisbledSubmit(value => { return { ...value, phoneNumber: false } });
                                setInputs((input) => {
                                    return { ...input, phoneNumber: e.target.value }
                                })
                            }}
                            required
                            className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2"
                            placeholder="رقم الجوال"
                            value={inputs.phoneNumber}
                            pattern="05\d{8}"
                        />
                    </div>
                </div>
                <div className="relative">
                    <FontAwesomeIcon icon={faNoteSticky} className="absolute top-[1rem] right-[1rem]" />
                    <textarea
                        onChange={(e) => {
                            setInputs((input) => {
                                return { ...input, comments: e.target.value }
                            })
                        }}
                        className="textarea textarea-primary pr-[2.3rem] resize-none w-full"
                        placeholder="ملاحظات"
                        value={inputs.comments}
                    ></textarea>
                </div>
                <div className="relative flex">
                        <FontAwesomeIcon icon={faKey} className="absolute top-[0.5rem] right-[1rem]" />
                        <input type="password" onChange={(e) => {
                            if (e.target.validity.valid) setDisbledPassword(true);
                            else setDisbledPassword(false);
                            setPassword(e.target.value)
                        }} required value={inputs.password} className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="كلمة المرور" pattern="^.{4,1024}$" />
                        <button onClick={(event) => {
                            event.preventDefault();
                            handleUpdatePassword();
                        }} disabled={!disbledPassword} className="btn btn-sm btn-warning font-bold">تحديث</button>
                    </div>
                <button disabled={!disbledSubmit.status || !disbledSubmit.name || !disbledSubmit.phoneNumber || !disbledSubmit.NationalIdentificationNumber}
                    onClick={(event) => {
                        event.preventDefault();
                        handleUpdate();
                    }} className="btn btn-sm text-white font-bold bg-primary">
                    {submit ? <span className="loading loading-ring loading-lg"></span> : "تحديث"}
                </button>
            </form>
            }

        </div>
    );
}

export default UpdateUser;
