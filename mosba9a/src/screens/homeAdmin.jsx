import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import profileImage from "../images/profileImage.png";
import { Link, Outlet } from 'react-router-dom'

function HomeAdmin() {
    const handleLogout = () => {}
    return (
        <div className='min-h-screen bg-white'>
            <header className="flex items-center bg-[#F1F1F1] p-[1rem]">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-primary btn-circle swap swap-rotate drawer-button"
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
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li className="text-[1.3rem] space-y-1">
                                <Link to="/admin">
                                    <FontAwesomeIcon icon={faUserTie} /> إدارة المسؤولين
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="relative bg-white rounded-full">
                    <img
                        onClick={() => {
                            const listMenu = document.getElementById("listMenu");
                            listMenu.classList.toggle("hidden");
                        }}
                        src={profileImage}
                        className="cursor-pointer"
                        alt=""
                    />
                    <div
                        id="listMenu"
                        className="absolute left-5 hidden bg-white shadow-lg w-[150px]"
                    >
                        <ul>
                            <li>
                                <button onClick={handleLogout} className="btn w-full rounded-none">
                                    تسجيل الخروج
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}

export default HomeAdmin