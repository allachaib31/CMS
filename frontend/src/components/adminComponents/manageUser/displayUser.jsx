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
      <div className="container mx-auto flex sm:flex-row sm:gap-0 gap-[1rem] flex-col justify-between mb-[1rem]">
        <Link to="/user/addUser" className="btn btn-sm btn-primary">
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
                className="input input-sm input-bordered join-item"
                placeholder="أكتب هنا"
              />
            </div>
          </div>
          <select onChange={(input) => {
            setSearch((search) => {
              return { ...search, searchMethod: input.target.value.trim() }
            })
          }} className="select select-sm xs:mt-0 pl-[2rem] pr-[1.5rem] select-bordered join-item">
            <option value="_id">العدد</option>
            <option value="name">اسم</option>
            <option value="NationalIdentificationNumber">رقم الهوية</option>
            <option value="phoneNumber">رقم الجوال</option>
            <option value="status">الحالة</option>
          </select>
          <div className="indicator xs:mt-0 mt-[1rem] ">
            <button onClick={handleSearch} className="btn btn-sm xs:w-auto bg-primary text-white join-item">
              {loadingSearch ? <span className="loading loading-ring loading-lg"></span> : "ابحث"}
            </button>
          </div>
        </div>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto xl:flex xl:justify-center  mt-[0.5rem]">
        <table className="table table-xs w-[500px] md:w-[1300px]">
          {/* head */}
          <thead>
            <tr className="text-center text-xs">
              {/*<th>العدد</th>*/}
              <th className="border border-slate-600" rowSpan={2}>اسم العضو</th>
              <th className="border border-slate-600" rowSpan={2}>رقم الهوية</th>
              <th className="border border-slate-600" rowSpan={2}>رقم الجوال</th>
              <th className="border border-slate-600" colSpan={2}>تاريخ الاشتراك</th>
              <th className="border border-slate-600" rowSpan={2}>الحالة</th>
              <th className="border border-slate-600" rowSpan={2}>ملاحظات</th>
              <th className="border border-slate-600" rowSpan={2}></th>
              <th className="border border-slate-600" rowSpan={2}></th>
            </tr>
            <tr>
              <th className="border border-slate-600">
                الميلادي
              </th>
              <th className="border border-slate-600">
                الهجري
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {users && users.map((user, index) => {
              const date = new Date(user.createdAt);
              return (
                <tr className="text-center">
                  {/*<td>{user.id}</td>*/}
                  <td className="border border-slate-600">{user.name}</td>
                  <td className="border border-slate-600">{user.NationalIdentificationNumber}</td>
                  <td className="border border-slate-600">{user.phoneNumber}</td>
                  <td className="text-center border border-slate-600">{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</td>
                  <td className="text-center border border-slate-600">{user.hijriDate.year + "-" + user.hijriDate.month.number + "-" + user.hijriDate.day}</td>
                  <td className={"border border-slate-600"}><span className={(user.status == "not active" ? "!text-error" : "!text-success") + " text-sm font-bold"}>{user.status == "not active" ? "غير مفعل" : "مفعل"}</span></td>
                  <td className="w-fit border border-slate-600">{user.comments}</td>
                  <td className="border border-slate-600"><Link to={`/user/updateUser?id=${user.id}`} className="btn btn-sm text-sm btn-warning">تعديل</Link></td>
                  <td className="border border-slate-600"><button data-disable={user.disable} id={user.id} onClick={(event) => {
                    setUserDelete({
                      id: user.id,
                      index,
                      disable: event.target.getAttribute("data-disable") == "true" ? true : false
                    });
                    document.getElementById('deleteModel').showModal()
                  }} className="btn btn-sm text-sm btn-error">{user.disable ? "تنشيط" : "تعطيل"}</button></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} />
      <DeleteUserModals user={userDelete} setShowAlert={setShowAlert} users={users} setUsers={setUsers} deleteFetch={deleteUserFetch} />
    </div>
  );
}

export default DisplayUser;
