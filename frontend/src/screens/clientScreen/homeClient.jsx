import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import profileImage from "../../images/profileImage.png";
import Cookies from "cookies-js";
import { getClientAdsFetch, uploadClientImageFetch, validationClientFetch } from "../../utils/apiFetch";
import { Alert, Loading } from "../../components";
import {
    faCheckToSlot,
    faFileInvoiceDollar,
    faGamepad,
    faGauge,
    faListCheck,
    faMicrophone,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const UserContext = React.createContext();

function HomeClient() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const fileInputRef = useRef(null);
    const [ads, setAds] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const [theme, setTheme] = useState(
        !window.localStorage.getItem("theme")
            ? "lofi"
            : window.localStorage.getItem("theme")
    );
    const [inputs, setInputs] = useState({
        image: ""
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleLogout = () => {
        Cookies.expire("tokenClient");
        navigate("/authClient");
    };
    const handleFileClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInputs((prevInput) => {
                return {
                    ...prevInput,
                    image: file
                }
            })
        }
    };
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        const form = new FormData();
        form.append("image", inputs.image);
        uploadClientImageFetch(form).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setUser((prev) => {
                return {
                    ...prev,
                    profileImage: res.data.profileImage
                }
            });
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
        try {
            const screen = document.getElementById("fullScreen");
            screen.setAttribute("data-theme", theme);
        } catch (error) { }
    }, [theme]);
    useEffect(() => {
        validationClientFetch()
            .then((res) => {
                setUser(res.user);
                setLoading((e) => !e);
            })
            .catch((err) => {
                navigate("/authClient");
            });
    }, []);
    useEffect(() => {
        getClientAdsFetch().then((res) => {
            setAds(res.data.ads)
        }).catch((err) => {
            navigate("/authClient");
        });
    }, [])
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <UserContext.Provider value={user}>
                    <header className="flex items-center bg-base-300 p-[1rem]">
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label
                                    htmlFor="my-drawer"
                                    className="btn btn-base-300 btn-circle swap swap-rotate drawer-button"
                                >
                                    <input type="checkbox" />

                                    {/* hamburger icon */}
                                    <svg
                                        className="swap-off fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                                    </svg>

                                    {/* close icon */}
                                    <svg
                                        className="swap-on fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 512 512"
                                    >
                                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                    </svg>
                                </label>
                            </div>
                            <div className="drawer-side z-[999]">
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    className="drawer-overlay"
                                ></label>
                                <ul className="menu p-4 w-[18rem] min-h-full bg-base-200 text-base-content">
                                    <div className="flex justify-center mb-[2rem]">
                                        <img src={logo} alt="" />
                                    </div>
                                    <h1 className="font-bold mb-[2rem] text-center text-[1.2rem]">
                                        {user.name}
                                    </h1>
                                    <li className="text-[1.3rem] space-y-1">
                                        <Link to="/client">
                                            <FontAwesomeIcon icon={faGauge} /> لوحة القيادة
                                        </Link>
                                    </li>
                                    <li className="text-[1.3rem] space-y-1">
                                        <Link to="/client/subscribe">
                                            <FontAwesomeIcon icon={faFileInvoiceDollar} /> الاشتراكات
                                        </Link>
                                    </li>
                                    <li className="text-[1.3rem] space-y-1">
                                        <Link to="/client/advetising">
                                            <FontAwesomeIcon icon={faMicrophone} /> اعلانات
                                        </Link>
                                    </li>
                                    {/**
                                         *                                     <li className="text-[1.3rem] space-y-1">
                                        <Link to="/client/contest"><FontAwesomeIcon icon={faGamepad} /> المسابقات</Link>
                                    </li>
                                         */}
                                    <li className="text-[1.3rem] space-y-1">
                                        <Link to="/client/election">
                                            <FontAwesomeIcon icon={faCheckToSlot} /> انتخابات
                                        </Link>
                                    </li>
                                    <li className="text-[1.3rem] space-y-1">
                                        <Link to="/client/agreements">
                                            <FontAwesomeIcon icon={faListCheck} /> بنود واتفاقيات
                                            الصندوق
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <label className="btn rounded-full mx-[1rem] swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input
                                checked={theme == "lofi" ? true : false}
                                onChange={(e) => {
                                    window.localStorage.setItem(
                                        "theme",
                                        theme == "dark" ? "lofi" : "dark"
                                    );
                                    setTheme((value) => (value == "dark" ? "lofi" : "dark"));
                                }}
                                type="checkbox"
                            />

                            {/* sun icon */}
                            <svg
                                className="swap-off fill-current w-10 h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on fill-current w-10 h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                        <div className="relative bg-white rounded-full">
                            <img
                                onClick={() => {
                                    const listMenu = document.getElementById("listMenu");
                                    listMenu.classList.toggle("hidden");
                                }}
                                src={user && user.profileImage ? "/api/v1.0/users/getProfileImage/" + user.profileImage : profileImage}
                                className="cursor-pointer w-[64.58px] h-[64.58px] rounded-full"
                                alt=""
                            />
                            <div
                                id="listMenu"
                                className="absolute left-5 hidden bg-white shadow-lg w-[150px]"
                            >
                                <ul>
                                    <li>
                                        <button onClick={() => document.getElementById('my_modal_ImageProfile').showModal()} className="btn w-full rounded-none">
                                            رفع صورة جديدة
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="btn w-full rounded-none"
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                    <div className="scrolling-text flex w-full overflow-hidden">
                        <div className="flex justify-center gap-[8rem] min-w-full animate-scroll">
                            {
                                ads && ads.map((ad) => {
                                    return (
                                        <h1 className="text-[2rem] inline-block min-w-max text-center whitespace-nowrap">
                                            {ad.text}
                                        </h1>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <dialog id="my_modal_ImageProfile" className="modal">
                        <div className="modal-box">
                            {showAlert.display ? <Alert msg={showAlert} /> : ""}
                            <h3 className="font-bold text-lg">رفع صورة جديدة</h3>
                            <button className='btn btn-info max-w-sm' type="button" onClick={handleFileClick}>
                                <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">اغلاق</button>
                                    <button onClick={(event) => {
                                        event.preventDefault();
                                        handleSubmit();
                                    }} disabled={submit} className='btn btn-success font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                                </form>
                            </div>
                        </div>
                    </dialog>


                    <Outlet />
                </UserContext.Provider>
            )}
        </div>
    );
}

export default HomeClient;
