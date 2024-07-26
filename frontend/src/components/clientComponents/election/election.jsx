import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getElectionFetch, setVoteFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function Election() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [votes, setVotes] = useState([]);
  const [data, setData] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    choice: ""
  })
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  useEffect(() => {
    getElectionFetch().then((res) => {
      console.log(res)
      setVotes(res.data.vote);
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/authClient");
      }
    })
  }, []);
  const handleSubmit = () => {
    console.log(inputs)
    setShowAlert({
      display: false,
    });
    setSubmit((e) => !e);
    setVoteFetch(inputs).then((res) => {
      setSubmit((e) => !e);
      setShowAlert({
          display: true,
          status: true,
          text: res.data.msg
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
  return (
    <div className="px-[1rem] sm:px-0 py-[2rem]">
      <div className='container mx-auto'>
        <div className="overflow-x-auto mt-[1rem]">
          <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
            <thead className="text-[1rem] text-center">
              <tr>
                <th className="border border-slate-600">رقم الانتخابات</th>
                <th className="border border-slate-600">
                  الموضوع
                </th>
                <th className="border border-slate-600">
                تاريخ الانتهاء
                </th>
                <th className="border border-slate-600">
                  تصويت
                </th>
                <th className="border border-slate-600">
                  تفاصيل
                </th>
              </tr>
            </thead>
            <tbody>
              {
                votes && votes.map((vote) => {
                  return (
                    <tr className="text-center">
                      <td className="border border-slate-600">{vote.id}</td>
                      <td className="border border-slate-600">{vote.subject}</td>
                      <td className="border border-slate-600">{vote.votingEndDate}</td>
                      <td className='border border-slate-600'><button onClick={() => {
                        setData(vote);
                        setInputs({
                          id: vote._id,
                          choice: ""
                        })
                        document.getElementById('my_modal_1').showModal()
                      }} className='btn btn-success'>تصويت</button></td>
                      <td className="border border-slate-600"><Link to={"/client/electionDetails?id=" + vote._id} className="btn btn-info">تفاصيل</Link></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        {showAlert.display ? <Alert msg={showAlert} /> : ""}
          <h3 className="font-bold text-lg">{data.subject}</h3>
          <div className='flex gap-[1rem] flex-col justify-center'>
            {
              data && data.choices.map((choice) => {
                return (
                  <div className='flex  gap-[1rem]'><input type="radio" onChange={(event) => {
                    setInputs((prevInput) => {
                      return {
                        ...prevInput,
                        choice: event.target.value
                      }
                    });
                  }} value={choice} name="choice" className="radio" /><p>{choice}</p></div>
                )
              })
            }
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">اغلاق</button>
              <button onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }} disabled={submit} className='btn btn-success'>{submit ? <span className="loading loading-ring loading-lg"></span> : "تصويت"}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Election