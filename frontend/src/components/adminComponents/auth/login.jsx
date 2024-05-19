import React, { useState } from "react";
import authPng from "../../../images/auth.png";
import logoPng from "../../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
import { loginFetch } from "../../../utils/apiFetch";
import { Alert } from "../../index";
function Login() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [disbledSubmit, setDisbledSubmit] = useState({
    email: false,
    password: false
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const handleSubmit = () => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    loginFetch(inputs).then((res) => {
      Cookies.set('token', res.token, { secure: true });
      setSubmit((e) => !e)
      setShowAlert({
        display: true,
        status: true,
        text: res.msg
      });
      navigate("/")
    }).catch((err) => {
      setSubmit((e) => !e)
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    })
  }
  return (
    <div className="flex">
      <div className="hidden md:flex justify-center items-center w-1/2 min-h-screen bg-[#2563EB]">
        <img src={authPng} alt="" srcset="" />
      </div>
      <div className="p-[1rem] w-full md:w-1/2 min-h-screen">
        <div className="flex justify-end">
          <img src={logoPng} alt="" srcset="" />
        </div>
        <div className="flex flex-col gap-[2rem] justify-center items-center">
          <h1 className="text-[2rem]">تسجيل الدخول</h1>
          <form action="" className="flex flex-col gap-[2rem]">
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute top-[1rem] right-[1rem]" />
              <input type="email" onChange={(e) => {
                if(e.target.validity.valid) setDisbledSubmit(value => {return {...value,email: true}});
                else setDisbledSubmit(value => {return {...value,email: false}});
                setInputs((input) => {
                  return { ...input, email: e.target.value.trim() }
                })
              }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={` بريد إلكتروني`} pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$" />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faKey} className="absolute top-[1rem] right-[1rem]" />
              <input type="password" onChange={(e) => {
                if(e.target.validity.valid) setDisbledSubmit(value => {return {...value,password: true}});
                else setDisbledSubmit(value => {return {...value,password: false}});
                setInputs((input) => {
                  return { ...input, password: e.target.value.trim() }
                })
              }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="كلمة المرور" pattern="^.{8,1024}$" />
            </div>
            <button
            disabled={!disbledSubmit.email || !disbledSubmit.password}
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }} className="btn w-full bg-[#2563EB] text-white text-[18px] font-bold">{submit ? <span className="loading loading-ring loading-lg"></span> : "تسجيل الدخول"} </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
