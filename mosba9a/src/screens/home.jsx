import React, { useEffect, useState } from "react";
import backgroundImage from "../images/background.png";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading } from "../components";
import { validationFetch } from "../utils/apiFetch";
export const UserContext = React.createContext();

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  useEffect(() => {
    validationFetch()
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
      className="hero min-h-screen delay-[3000] duration-1000 ease-out"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <UserContext.Provider value={user}>
          <Outlet />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default Home;
