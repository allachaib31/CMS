import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAgreementsFetch,
  updateAgreementsActiveFetch,
} from "../../../utils/apiFetch";
import Alert from "../../alert/alert";

function DisplayAgreements() {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState([]);
  const [inputs, setInputs] = useState({
    id: "",
    active: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const modalRef = useRef(null);
  useEffect(() => {
    getAgreementsFetch()
      .then((res) => {
        console.log(res);
        setAgreements(res.data.agreements);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/auth");
        }
      });
  }, []);
  const updateAgreements = () => {
    setShowAlert({
      display: false,
    });
    updateAgreementsActiveFetch(inputs).then((res) => {
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      setAgreements(res.data.result)
      modalRef.current.close();
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
          navigate("/auth");
      }
      setShowAlert({
          display: true,
          status: false,
          text: err.response.data.msg
      });
      modalRef.current.close();
  });
  };
  return (
    <div className="px-[1rem] sm:px-0">
      <h1 className="text-center font-bold py-[0.5rem]">
        {" "}
        إدارة البنود وإتفاقيات الصندوق
      </h1>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[0.5rem]">
        <table className="text-xs table border-separate border-spacing-0 border w-[400px] md:w-[600px] mx-auto">
          <thead className="text-xs text-center">
            <tr>
              <th className="border border-slate-600">رقم</th>
              <th className="border border-slate-600">العنوان</th>
              <th className="border border-slate-600">الحالة</th>
              <th className="border border-slate-600">تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {agreements &&
              agreements.map((agreement) => (
                <tr className="text-center" key={agreement.id}>
                  <td className="border border-slate-600">{agreement.id}</td>
                  <td className="border border-slate-600">{agreement.title}</td>
                  <td className="border border-slate-600">
                    {agreement.active ? "مفعل" : "غير مفعل"}
                  </td>
                  <td className="border border-slate-600">
                    <button
                      onClick={() => {
                        setInputs({
                          id: agreement._id,
                          active: agreement.active,
                        });
                        const parser = new DOMParser();
                        const dom = parser.parseFromString(
                          agreement.text,
                          "text/html"
                        );
                        console.log(dom.body.innerText);
                        document.getElementById("text").innerHTML =
                          dom.body.innerText;
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="btn btn-xs btn-info"
                    >
                      تفاصيل
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box max-w-[70rem]">
          <div id="text" className="py-4 flex justify-center"></div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm">اغلاق</button>
              <button
              onClick={(event) => {
                event.preventDefault();
                if(window.confirm("هل انت متاكد من انك تريد القيام به العملية")){
                  updateAgreements();
              }
               // document.getElementById("my_modal_1").closeModal();
              }}
                className={`btn btn-sm ${inputs.active ? "btn-error" : "btn-success"}`}
              >
                {inputs.active ? "تعطيل" : "تفعيل"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DisplayAgreements;
