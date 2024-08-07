import React from 'react'
import { Alert } from '../components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AuthAdmin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [disbledSubmit, setDisbledSubmit] = useState({
        NationalIdentificationNumber: false,
        password: false,
    });
    const [inputs, setInputs] = useState({
        NationalIdentificationNumber: "",
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
        /*loginFetch(inputs)
          .then((res) => {
            Cookies.set("token", res.token, { secure: true });
            setSubmit((e) => !e);
            setShowAlert({
              display: true,
              status: true,
              text: res.msg,
            });
            navigate("/");
          })
          .catch((err) => {
            setSubmit((e) => !e);
            setShowAlert({
              display: true,
              status: false,
              text: err.response.data.msg,
            });
          });*/
      };
    return (
        <div className='min-h-screen bg-white'>
            <div className='flex justify-center items-center h-screen'>
                <form
                    action=""
                    className=" h-full gap-5 flex flex-col justify-center items-center"
                >
                    <h1 className='text-black text-3xl font-bold'>تسجيل الدخول</h1>
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
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
                                if (e.target.validity.valid)
                                    setDisbledSubmit((value) => {
                                        return { ...value, NationalIdentificationNumber: true };
                                    });
                                else
                                    setDisbledSubmit((value) => {
                                        return {
                                            ...value,
                                            NationalIdentificationNumber: false,
                                        };
                                    });
                                setInputs((input) => {
                                    return {
                                        ...input,
                                        NationalIdentificationNumber: e.target.value.trim(),
                                    };
                                });
                            }}
                            required
                            placeholder="رقم الهوية الوطنية"
                            pattern="[1-9]\d{9}"
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
                                if (e.target.validity.valid)
                                    setDisbledSubmit((value) => {
                                        return { ...value, password: true };
                                    });
                                else
                                    setDisbledSubmit((value) => {
                                        return { ...value, password: false };
                                    });
                                setInputs((input) => {
                                    return { ...input, password: e.target.value.trim() };
                                });
                            }}
                            required
                            placeholder="كلمة المرور"
                        />
                    </label>
                    <button
                        disabled={
                            !disbledSubmit.NationalIdentificationNumber ||
                            !disbledSubmit.password
                        }
                        onClick={(event) => {
                            event.preventDefault();
                            handleSubmit();
                        }}
                        className="btn  text-white text-[18px] font-bold"
                    >
                        {submit ? (
                            <span className="loading loading-ring loading-lg"></span>
                        ) : (
                            "تسجيل الدخول"
                        )}{" "}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthAdmin