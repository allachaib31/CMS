import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAgreementsFetch } from '../../../utils/apiFetch';

function DisplayAgreements() {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    getAgreementsFetch().then((res) => {
      console.log(res);
      setAgreements(res.data.agreements);
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
    });
  }, []);

  return (
    <div className="px-[1rem] sm:px-0">
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]"> إدارة البنود وإتفاقيات الصندوق</h1>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
          <thead className="text-[1rem] text-center">
            <tr>
              <th className="border border-slate-600">رقم</th>
              <th className="border border-slate-600">الحالة</th>
              <th className="border border-slate-600">حدف</th>
            </tr>
          </thead>
          <tbody>
            {
              agreements && agreements.map((agreement) => (
                <tr className="text-center" key={agreement.id}>
                  <td className="border border-slate-600">{agreement.id}</td>
                  <td className="border border-slate-600">{agreement.active ? "مفعل" : "غير مفعل"}</td>
                  <td className="border border-slate-600">
                    <button onClick={() => {
                      const parser = new DOMParser();
                      const dom = parser.parseFromString(agreement.text, 'text/html');
                      console.log(dom.body.innerText)
                      document.getElementById("text").innerHTML = dom.body.innerText
                      document.getElementById('my_modal_1').showModal();
                    }} className="btn btn-info">تفاصيل</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div id='text' className="py-4" ></div>
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

export default DisplayAgreements;
