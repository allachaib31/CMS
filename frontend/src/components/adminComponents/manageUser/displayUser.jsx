import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, DeleteUserModals, Pagination } from "../../index";
import { getUserFetch, searchUserFetch, deleteUserFetch } from "../../../utils/apiFetch";

function DisplayUser() {
  const navigate = useNavigate();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
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
    searchUserFetch(search).then((res) => {
      setUsers(res.data.user);
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
    getUserFetch(currentPage).then((res) => {
      setTotalPages(res.data.totalPages);
      setUsers(res.data.users)
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
    })
  }
  useEffect(() => {
    getUser(currentPage);
  }, [currentPage]);


  return (
    <div className="px-[1rem] sm:px-0">
      <div className="flex sm:flex-row sm:gap-0 gap-[1rem] flex-col justify-between mb-[1rem]">
        <Link to="/user/addUser" className="text-[1rem] btn btn-primary">
          اضافة عضو
        </Link>
        <div className="join flex-wrap ">
          <div>
            <div>
              <input
                onChange={(input) => {
                  if (input.target.value.trim() == "") getUser();
                  setSearch((search) => {
                    return { ...search, searchValue: input.target.value.trim() }
                  })
                }}
                className="input input-bordered join-item"
                placeholder="أكتب هنا"
              />
            </div>
          </div>
          <select onChange={(input) => {
            setSearch((search) => {
              return { ...search, searchMethod: input.target.value.trim() }
            })
          }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
            <option value="_id">العدد</option>
            <option value="name">اسم</option>
            <option value="NationalIdentificationNumber">رقم الهوية</option>
            <option value="phoneNumber">رقم الجوال</option>
            <option value="status">الحالة</option>
          </select>
          <div className="indicator xs:mt-0 mt-[1rem] ">
            <button onClick={handleSearch} className="btn xs:w-auto bg-primary text-[20px] text-white join-item">
            {loadingSearch ? <span className="loading loading-ring loading-lg"></span> : "ابحث"}
            </button>
          </div>
        </div>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto  mt-[2rem]">
        <table className="table w-[1800px]">
          {/* head */}
          <thead>
            <tr className="text-center text-[1rem]">
              <th>العدد</th>
              <th>اسم العضو</th>
              <th>رقم الهوية</th>
              <th>رقم الجوال</th>
              <th colSpan="2" rowSpan="2" className="">
                <span className="flex w-full justify-center"> تاريخ الاشتراك  </span>
                <div className="flex mt-[0.5rem]">
                  <span className="w-1/2 text-center">الميلادي</span>
                  <span className="w-1/2 text-center">الهجري</span>
                </div>
              </th>
              <th>الحالة</th>
              <th>ملاحظات</th>
              <th>تعديل</th>
              <th>تعطيل</th>
            </tr>
          </thead>
          <tbody className="text-[1rem]">
            {users && users.map((user, index) => {
              const date = new Date(user.createdAt);
              return (
                <tr className="text-center">
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.NationalIdentificationNumber}</td>
                  <td>{user.phoneNumber}</td>
                  <td className="text-center">{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</td>
                  <td className="text-center">{user.hijriDate.year + "-" + user.hijriDate.month.number + "-" + user.hijriDate.day}</td>
                  <td className={(user.status == "not active" ? "text-error" : "text-success") + " font-bold text-[1.3rem]"}>{user.status == "not active" ? "غير مفعل" : "مفعل"}</td>
                  <td>{user.comments}</td>
                  <td><Link to={`/user/updateUser?id=${user._id}`} className="btn btn-warning">تعديل</Link></td>
                  <td><button data-disable={user.disable} id={user._id} onClick={(event) => {
                    setUserDelete({
                      id: user._id,
                      index,
                      disable: event.target.getAttribute("data-disable") == "true" ? true: false
                    });
                    document.getElementById('deleteModel').showModal()
                  }} className="btn btn-error">{user.disable ? "تنشيط" : "تعطيل"}</button></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages}/>
      <DeleteUserModals user={userDelete} setShowAlert={setShowAlert} users={users} setUsers={setUsers} deleteFetch={deleteUserFetch} />
    </div>
  );
}

export default DisplayUser;
