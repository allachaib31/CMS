import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFatwasFetch,
  updateFatwasFetch,
} from "../../../utils/apiFetch";
import Alert from "../../alert/alert";

function DisplayFatwas() {
  const navigate = useNavigate();
  const [fatwas, setFatwas] = useState([]);
  const [inputs, setInputs] = useState({
    id: "",
    active: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const modalRef = useRef(null);
  useEffect(() => {
    getFatwasFetch()
      .then((res) => {
        setFatwas(res.data.fatwas);
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
    updateFatwasFetch(inputs).then((res) => {
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      setFatwas(res.data.result)
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
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        {" "}
        إدارة الفتاوى
      </h1>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[600px] mx-auto">
          <thead className="text-[1rem] text-center">
            <tr>
              <th className="border border-slate-600">رقم</th>
              <th className="border border-slate-600">العنوان</th>
              <th className="border border-slate-600">الحالة</th>
              <th className="border border-slate-600">تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {fatwas &&
              fatwas.map((fatwa) => (
                <tr className="text-center" key={fatwa.id}>
                  <td className="border border-slate-600">{fatwa.id}</td>
                  <td className="border border-slate-600">{fatwa.title}</td>
                  <td className="border border-slate-600">
                    {fatwa.active ? "مفعل" : "غير مفعل"}
                  </td>
                  <td className="border border-slate-600">
                    <button
                      onClick={() => {
                        setInputs({
                          id: fatwa._id,
                          active: fatwa.active,
                        });
                        const parser = new DOMParser();
                        const dom = parser.parseFromString(
                          fatwa.text,
                          "text/html"
                        );
                        console.log(dom.body.innerText);
                        document.getElementById("text").innerHTML =
                          dom.body.innerText;
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="btn btn-info"
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
          <div className="overflow-x-auto">
            <div id="text" className="flex justify-center"></div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">اغلاق</button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                      updateAgreements();
                    }
                    // document.getElementById("my_modal_1").closeModal();
                  }}
                  className={`btn ${inputs.active ? "btn-error" : "btn-success"}`}
                >
                  {inputs.active ? "تعطيل" : "تفعيل"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DisplayFatwas;
