import { faIdBadge, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../alert/alert";
import { addAdminFetch } from "../../../utils/apiFetch";
import Checkbox from "./checkbox";

function AddAdmin() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    idUser: "",
    UserPermission: ["إضافة إيرادات (اشتراكات الأعضاء)"],
  });
  const [disbledSubmit, setDisbledSubmit] = useState({
    idUser: false,
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const handleSubmit = () => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    addAdminFetch(inputs).then((res) => {
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
  return (
    <div className="container mx-auto sm:p-0 px-[1rem]">
      <div>
        <Link to="/admin" className=" btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
      إضافة مسئول  جديد
      </h1>
      <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
        {showAlert.display ? <Alert msg={showAlert} /> : ""}
        <div className="relative w-full">
          <FontAwesomeIcon
            icon={faIdBadge}
            className="absolute top-[1rem] right-[1rem]"
          />
          <input
            type="text"
            onChange={(e) => {
              if (e.target.validity.valid) setDisbledSubmit(value => { return { ...value, idUser: true } });
              else setDisbledSubmit(value => { return { ...value, idUser: false } });
              setInputs((input) => {
                return { ...input, idUser: e.target.value.trim() }
              })
            }}
            required
            className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2"
            placeholder={`رقم المسؤول`}
          />
        </div>
        <Checkbox inputs={inputs} setInputs={setInputs} />
        <button
          disabled={!disbledSubmit.idUser}
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }} className="btn text-white font-bold text-[20px] bg-primary">{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
      </form>
    </div>
  );
}

export default AddAdmin;
