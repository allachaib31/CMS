import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getSubscriptionHistoryFetch, searchSubscriptionHistoryFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';
import Pagination from '../../pagination/pagination';
import { AddNoteModals } from '../../index';

function SubscriptionHistory() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    _id: "",
    name: "",
    comment: ""
  })
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState(false);
  const [moneyBox, setMoneyBox] = useState(false);
  const [activeMember, setActiveMember] = useState(0);
  const [newUser, setNewUser] = useState(0);
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const [search, setSearch] = useState({
    searchMethod: "_id",
    searchValue: "",
  });
  const handleSearch = () => {
    setLoadingSearch((e) => !e);
    setShowAlert({
      display: false,
    });
    searchSubscriptionHistoryFetch(search).then((res) => {
      setUsers(res.data.users);
      setLoadingSearch((e) => !e);
      setCurrentPage(1);
      setTotalPages(1);
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
      setLoadingSearch((e) => !e);
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    })
  }
  const getUser = (currentPage) => {
    setLoading(false)
    getSubscriptionHistoryFetch(currentPage).then((res) => {
      console.log(res)
      setTotalPages(res.data.totalPages);
      setUsers(res.data.users);
      setMoneyBox(res.data.moneyBox);
      setActiveMember(res.data.activeMembers)
      setNewUser(res.data.newUser)
      setLoading((e) => !e)
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
      setLoading((e) => !e)
    })
  }
  useEffect(() => {
    getUser(currentPage);
  }, [currentPage]);

  return (
    <div className="sm:p-0 px-[1rem]">
      <div className='container mx-auto'>
        <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        سجل الاشتراكات
      </h1>
      <div className="container mx-auto sm:flex  mb-[1rem]">
        <div>
          <input
            onChange={(input) => {
              if (input.target.value.trim() == "") {
                setLoading((e) => !e)
                getUser()
              };
              setSearch((search) => {
                return { ...search, searchValue: input.target.value.trim() }
              })
            }}
            className="input input-bordered join-item"
            placeholder="أكتب هنا"
          />
        </div>
        <select onChange={(input) => {
          setSearch((search) => {
            return { ...search, searchMethod: input.target.value.trim() }
          })
        }} className="select sm:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
          <option value="_id">العدد</option>
          <option value="name">اسم</option>
          <option value="NationalIdentificationNumber">رقم الهوية</option>
          <option value="phoneNumber">رقم الجوال</option>
        </select>
        <div className="indicator xs:mt-0 mt-[1rem] ">
          <button onClick={handleSearch} className="btn xs:w-auto bg-primary text-[20px] text-white join-item">
            {loadingSearch ? <span className="loading loading-ring loading-lg"></span> : "ابحث"}
          </button>
        </div>
      </div>
      <div className="mt-[1rem] flex md:flex-row flex-col items-center container mx-auto justify-center gap-[0.2rem] md:gap-[1rem]">
        <div className='flex md:flex-col w-full  md:w-auto items-center justify-center gap-[1rem]'>
          <h1 className="md:text-[1.1rem] w-full sm:w-1/2 md:w-auto font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">رصيد الصندوق منذ إنشائه </h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]"> {moneyBox && moneyBox.cumulativeAmount}</h1>
        </div>
        <div className='flex md:flex-col w-full  md:w-auto items-center justify-center gap-[1rem]'>
          <h1 className="md:text-[1.1rem] w-full sm:w-1/2 md:w-auto font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">المصروفات </h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">{moneyBox &&  (moneyBox.cumulativeAmount - moneyBox.amount).toFixed(2)}</h1>
        </div>
        <div className='flex md:flex-col w-full md:w-auto items-center justify-center gap-[1rem]'>
          <h1 className="md:text-[1.1rem] w-full sm:w-1/2 md:w-auto font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">الأعضاء المفعلون </h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">{activeMember}</h1>
        </div>
        <div className='flex md:flex-col w-full md:w-auto items-center justify-center gap-[1rem]'>
          <h1 className="md:text-[1.1rem] w-full sm:w-1/2 md:w-auto font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">الأعضاء الجدد </h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]">{newUser}</h1>
        </div>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[1rem]">
        {!loading ? <div className='flex justify-center'> <span className=" loading loading-ring loading-lg"></span></div> : <table className="text-[1rem] table border-separate border-spacing-2 border w-[1700px] mx-auto">
          <thead className='text-[1rem] text-center'>
            <tr>
              <th className='border border-slate-600'>اسم العضو</th>
              <th className='border border-slate-600'>رصيد العضو منذ بداية اشتراكه</th>
              <th className='border border-slate-600'> المصروف من رصيده العضو</th>
              <th className='border border-slate-600'>الرصيد الحالي للعضو</th>
              <th className='border border-slate-600'>نسبة العضو من رصيد الصندوق</th>
              <th className='border border-slate-600'>ملاحظات</th>
              <th className='border border-slate-600'>تفاصيل أكثر</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              users && users.map((user) => {
                return (
                  <tr>
                    <td className='border border-slate-600'>{user.name}</td>
                    <td className='border border-slate-600'>{user.cumulativeBalance.toFixed(2)}</td>
                    <td className='border border-slate-600'>{(user.cumulativeBalance - user.memberBalance).toFixed(2)}</td>
                    <td className='border border-slate-600'>{user.memberBalance.toFixed(2)}</td>
                    <td className='border border-slate-600'>%{((user.memberBalance * 100) / moneyBox.amount).toFixed(2)}</td>
                    <td onClick={() => {
                      setInputs({
                        _id: user._id,
                        name: user.name,
                        comment: ""
                      })
                      document.getElementById('addNote').showModal()
                    }
                    } id={user._id} className='border cursor-pointer border-slate-600'>{user.commentSubscribeHistory}</td>
                    <td className='border border-slate-600'><Link to={`/subscription/annualSubscriptionRecordDetails?id=${user._id}&name=${user.name}`} className='btn btn-info'>التفاصيل</Link></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>}
      </div>
      <AddNoteModals inputs={inputs} setInputs={setInputs} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} />
    </div>
  )
}

export default SubscriptionHistory;