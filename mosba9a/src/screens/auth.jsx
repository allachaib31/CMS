import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
import backgroundImage from "../images/background.png";
import backgroundImage2 from "../images/backgroundIslamic2.jpg";
import backgroundImage3 from "../images/backgroundIslamic3.jpg";
import backgroundImage4 from "../images/backgroundIslamic4.jpg";
import { Alert, Loading } from "../components";
import { useState } from "react";
import { forgetPasswordFetch, loginUserFetch, validationUserFetch } from "../utils/apiFetch";

function Auth() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(!window.localStorage.getItem("contestTheme") ? 1 : Number(window.localStorage.getItem("contestTheme")))
  const backgrounds = [backgroundImage,backgroundImage2,backgroundImage3,backgroundImage4]
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [changePasswrod, setChangePassword] = useState({
    email: ""
  })
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const forgetPassword = () => {
    forgetPasswordFetch(changePasswrod).then((res) => {
      console.log(res)
    })
  }
  const handleSubmit = () => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    loginUserFetch(inputs)
      .then((res) => {
        Cookies.set("tokenClient", res.token, { secure: true });
        setSubmit((e) => !e);
        setShowAlert({
          display: true,
          status: true,
          text: res.msg,
        });
        navigate("/home");
      })
      .catch((err) => {
        setSubmit((e) => !e);
        setShowAlert({
          display: true,
          status: false,
          text: err.response.data.msg,
        });
      });
  };
  useEffect(() => {
    validationUserFetch().then((res) => {
      navigate("/home");
    }).catch((err) => {
      setLoading((e) => !e)
    })
  }, []);
  return (
    <div
      className="hero min-h-screen delay-[3000] duration-1000 ease-out"
      style={{
        backgroundImage: `url(${backgrounds[index]})`,
      }}
    >
      {
        loading ? <Loading /> : <div className="w-full transition delay-[3000] duration-1000 ease-out text-center text-neutral-content">
          <div className="md:w-[60%] lg:w-[50%] h-screen backdrop-blur-xl bg-black/40">
            <div className="h-screen">
              <form
                action=""
                className="w-full h-full gap-5 flex flex-col justify-center items-center"
              >
                <h1 className="text-3xl font-bold text-secondary">تسجيل الدخول</h1>
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <label className="sm:w-1/2 bg-transparent input input-bordered  text-white flex items-center gap-2">
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
                    className="grow formInput"
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
                <label className="sm:w-1/2 bg-transparent input input-bordered text-white flex items-center gap-2">
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
                    className="grow formInput"
                    onChange={(e) => {
                      setInputs((input) => {
                        return { ...input, password: e.target.value.trim() };
                      });
                    }}
                    required
                    placeholder="كلمة المرور"
                  />
                </label>
                <h1><Link to="/signUp">انشاء حساب ؟</Link> <button onClick={() => document.getElementById('updatePassword').showModal()}>تغيير كلمة السر</button></h1>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                  className="btn btn-secondary text-white text-[18px] font-bold"
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
        </div>
      }
      <dialog id="updatePassword" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">تغيير كلمة السر</h3>
          <div className="flex gap-[1rem] mt-[1rem]">
            <label className="bg-transparent input input-bordered flex items-center gap-2">
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
                className="grow formInput"
                onChange={(e) => {
                  setChangePassword((input) => {
                    return {
                      email: e.target.value.trim(),
                    };
                  });
                }}
                required
                placeholder="بريد إلكتروني"
              />
            </label>
            <button onClick={forgetPassword} className="btn btn-success">ارسال الرمز</button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Auth;
