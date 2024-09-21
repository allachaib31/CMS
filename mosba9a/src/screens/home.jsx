import React, { useEffect, useState } from "react";
import backgroundImage from "../images/background.png";
import backgroundImage2 from "../images/backgroundIslamic2.jpg";
import backgroundImage3 from "../images/backgroundIslamic3.jpg";
import backgroundImage4 from "../images/backgroundIslamic4.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Loading } from "../components";
import { validationUserFetch } from "../utils/apiFetch";
import Cookies from "cookies-js";
export const UserContext = React.createContext();

function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(!window.localStorage.getItem("contestTheme") ? 1 : Number(window.localStorage.getItem("contestTheme")))
  const backgrounds = [backgroundImage,backgroundImage2,backgroundImage3,backgroundImage4]
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const handleLogout = () => {
    Cookies.expire("tokenClient");
    navigate("/");
}
  useEffect(() => {
    validationUserFetch()
      .then((res) => {
        setUser(res.user);
        setLoading((e) => !e);
      })
      .catch((err) => {
        navigate("/auth");
      });
  }, []);
  return (
    <div
      className="min-h-screen delay-[3000] duration-1000 ease-out"
      style={{
        backgroundImage: `url(${backgrounds[index]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <UserContext.Provider value={user}>
          <div className="drawer z-[999]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="fixed m-[2rem] drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn btn-secondary drawer-button">        <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg></label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu justify-between text-white backdrop-blur-xl bg-black/40  min-h-full w-[15rem] p-4">
                {/* Sidebar content here */}
                <div>
                  <li><Link to="/home">الصفحة الرئيسية</Link></li>
                  <li><Link to="/home/previousContest">المسابقات السابقة</Link></li>
                  <li>
                    <details>
                      <summary>تغيير المظهر</summary>
                      <ul>
                        <li><button onClick={() => {
                          setIndex(0)
                          window.localStorage.setItem("contestTheme", 0)
                        }}>المظهر 1</button></li>
                        <li><button onClick={() => {
                          setIndex(1)
                          window.localStorage.setItem("contestTheme", 1)
                        }}>المظهر 2</button></li>
                        <li><button onClick={() => {
                          setIndex(2)
                          window.localStorage.setItem("contestTheme", 2)
                        }}>المظهر 3</button></li>
                        <li><button onClick={() => {
                          setIndex(3)
                          window.localStorage.setItem("contestTheme", 3)
                        }}>المظهر 4</button></li>
                      </ul>
                    </details>
                  </li>
                </div>
                <li><button onClick={handleLogout}>تسجيل الخروج</button></li>
              </ul>
            </div>
          </div>
          <Outlet />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default Home;
