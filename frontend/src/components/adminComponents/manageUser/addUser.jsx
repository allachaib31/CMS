import {
    faEnvelope,
    faIdCard,
    faKey,
    faPhone,
    faRightLong,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../alert/alert";
import { addUserFetch } from "../../../utils/apiFetch";

function AddUser() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [disbledSubmit, setDisbledSubmit] = useState({
        password: false,
        name: false,
        NationalIdentificationNumber: false,
        phoneNumber: false
    });
    const [inputs, setInputs] = useState({
        name: "",
        password: "",
        NationalIdentificationNumber: "",
        phoneNumber: ""
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setSubmit((e) => !e);
        setShowAlert({
            display: false,
        });
        addUserFetch(inputs).then((res) => {
            setSubmit((e) => !e)
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            setSubmit((e) => !e)
            if (err.response.status == 400 || err.response.status == 422 || err.response.status == 403) {
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
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/user" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                إضافة مستخدم جديد
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faUser} className="absolute top-[1rem] right-[1rem]" />
                        <input type="text" onChange={(e) => {
                            if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, name: true } });
                            else setDisbledSubmit(value => { return { ...value, name: false } });
                            setInputs((input) => {
                                return { ...input, name: e.target.value.trim() }
                            })
                        }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم`} pattern="^.{3,1024}$" />
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
                        <input type="text" onChange={(e) => {
                            if (e.target.validity.valid) {
                                setDisbledSubmit(value => { return { ...value, NationalIdentificationNumber: true,password: true } });
                            }
                            else setDisbledSubmit(value => { return { ...value, NationalIdentificationNumber: false } });
                            setInputs((input) => {
                                return { ...input, NationalIdentificationNumber: e.target.value.trim(), password: e.target.value.substring(e.target.value.length - 4).trim() }
                            })
                        }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="رقم الهوية الوطنية" pattern="[1-9]\d{9}" />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faPhone} className="absolute top-[1rem] right-[1rem]" />
                        <input type="text" onChange={(e) => {
                            if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, phoneNumber: true } });
                            else setDisbledSubmit(value => { return { ...value, phoneNumber: false } });
                            setInputs((input) => {
                                return { ...input, phoneNumber: e.target.value.trim() }
                            })
                        }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="رقم الجوال" pattern="05\d{8}" />
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faKey} className="absolute top-[1rem] right-[1rem]" />
                        <input type="password" onChange={(e) => {
                            if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, password: true } });
                            else setDisbledSubmit(value => { return { ...value, password: false } });
                            setInputs((input) => {
                                return { ...input, password: e.target.value.trim() }
                            })
                        }} required value={inputs.password} className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="كلمة المرور" pattern="^.{4,1024}$" />
                    </div>
                </div>
                <button
                    disabled={!disbledSubmit.password || !disbledSubmit.name || !disbledSubmit.phoneNumber || !disbledSubmit.NationalIdentificationNumber}
                    onClick={(event) => {
                        event.preventDefault();
                        handleSubmit();
                    }} className="btn text-white font-bold text-[20px] btn-primary">{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
            </form>
        </div>
    );
}

export default AddUser;
