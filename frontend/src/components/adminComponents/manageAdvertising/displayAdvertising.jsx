import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteAdvertisingFetch, getAdvertisingFetch, repostAdsFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function DisplayAdvertising() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [advertising, setAdverttising] = useState(false);
  const [data, setData] = useState({
    htmlContent: "",
    image: ""
  })
  const modalRef = useRef(null);
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const [inputs, setInputs] = useState({
    id: "",
    date: "",
    type: "advertisings",
  })
  const handleDelete = (id, index) => {
    setShowAlert({
      display: false,
    });
    deleteAdvertisingFetch(id).then((res) => {
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      const newList = [...advertising];
      newList.splice(index, 1);
      setAdverttising(newList)
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    });
  }
  const handleSubmit = () => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    repostAdsFetch(inputs).then((res) => {
      setSubmit((e) => !e);
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
    }).catch((err) => {
      setSubmit((e) => !e);
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    });
  }
  useEffect(() => {
    getAdvertisingFetch().then((res) => {
      setAdverttising(res.data.advertising)
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
    });
  }, [])
  return (
    <div className="px-[1rem] sm:px-0">
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        {" "}
        ادارة الاعلانات
      </h1>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
          <thead className="text-[1rem] text-center">
            <tr>
              <th className="border border-slate-600">رقم</th>
              <th className="border border-slate-600">الاعلان</th>
              <th className='border border-slate-600'>اعادة النشر</th>
              <th className="border border-slate-600">حدف</th>
            </tr>
          </thead>
          <tbody>
            {
              advertising && advertising.map((ad, index) => {
                return (
                  <tr className="text-center" key={ad.id}>
                    <td className="border border-slate-600">{ad.id}</td>
                    <td className="border border-slate-600"><p onClick={() => {
                      const parser = new DOMParser();
                      const dom = parser.parseFromString(
                        ad.text,
                        "text/html"
                      );
                      setData({
                        htmlContent: dom.body.innerHTML,
                        image: ad.imageId
                      })
                      document.getElementById("my_modal_1").showModal()
                    }} className='btn btn-info'>{ad.title}</p></td>
                    <td className='border border-slate-600'><button onClick={() => {
                      setInputs((prev) => {
                        return {
                          ...prev,
                          id: ad._id
                        }
                      })
                      document.getElementById("repost").showModal()
                      }} className='btn btn-success'>اعادة النشر</button></td>
                    <td className="border border-slate-600"><button className='btn btn-error' onClick={() => {
                      if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                        handleDelete(ad._id, index)
                      }
                    }}>حدف</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box max-w-[70rem]">
          <div className="py-4 flex justify-center" dangerouslySetInnerHTML={{ __html: data.htmlContent }}></div>
          <img src={"/api/v1.0/advertisingImage/" + data.image} alt="" />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">اغلاق</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="repost" className="modal">
        <div className="modal-box ">
          <input type="date" className='input input-bordered' onChange={((event) => {
            setInputs((prevInputs) => {
              return {
                ...prevInputs,
                date: event.target.value
              }
            })
          })}/>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">اغلاق</button>
              <button className="btn btn-success" onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}>{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DisplayAdvertising