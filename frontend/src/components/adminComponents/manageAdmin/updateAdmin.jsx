import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchAdminFetch, updateAdminFetch } from "../../../utils/apiFetch";
import Checkbox from "./checkbox";
import Alert from "../../alert/alert";

function UpdateAdmin() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    idUser: "",
    UserPermission: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const name = queryParams.get('name');
  const handleUpdate = () => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    updateAdminFetch(inputs).then((res) => {
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
      return navigate("/admin")
    }
    searchAdminFetch({
      searchMethod: "_id",
      searchValue: id
    }).then((res) => {
      if (res.data.admin.length == 0) {
        navigate("/admin");
      }
      console.log(res.data)
      setInputs({
        idUser: res.data.admin[0].id,
        UserPermission: res.data.admin[0].admin.userPermissions,
      })
      setLoading((e) => !e);
    }).catch((err) => {
      console.log(err)
    })
  }, []);
  useEffect(() => {
    console.log(inputs)
    const checkInput = document.querySelectorAll(".checkbox");
    checkInput.forEach((input) => {
      if (inputs.UserPermission.indexOf(input.getAttribute("value")) > -1) {
        input.checked = true;
      }
    })
  }, [loading])
  return (
    <div className="container mx-auto  sm:p-0 px-[1rem]">
      <div>
        <Link to="/admin" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        تحديث معلومات المستخدم : {name}
      </h1>
      {loading ? <div className="flex justify-center"><span className="loading loading-ring w-[4rem]"></span></div> :
        <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
          {showAlert.display ? <Alert msg={showAlert} /> : ""}
          <Checkbox inputs={inputs} setInputs={setInputs} />
          <button
            onClick={(event) => {
              event.preventDefault();
              handleUpdate();
            }} className="btn text-white font-bold text-[20px] bg-primary">{submit ? <span className="loading loading-ring loading-lg"></span> : "تحديث"}</button>
        </form>}
    </div>
  )
}

export default UpdateAdmin