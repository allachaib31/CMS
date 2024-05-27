import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, DeleteUserModals, Pagination } from "../../index";
import { deleteAdminFetch, getAdminFetch, searchAdminFetch } from "../../../utils/apiFetch";

function DisplayAdmin() {
  const navigate = useNavigate();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [admins, setAdmins] = useState(false);
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
    searchAdminFetch(search).then((res) => {
      setAdmins(res.data.admin);
      setLoadingSearch((e) => !e)
      setCurrentPage(1);
      setTotalPages(1);
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
      setLoadingSearch((e) => !e)
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    })
  }
  const getAdmin = () => {
    getAdminFetch().then((res) => {
      setTotalPages(res.data.totalPages)
      setAdmins(res.data.admins)
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
    })
  }
  useEffect(() => {
    getAdmin(currentPage);
  }, [currentPage]);
  return (
    <div className="px-[1rem] sm:px-0">
      <div className="mb-[1rem] flex sm:flex-row sm:gap-0 gap-[1rem] flex-col justify-between">
        <Link to="/admin/addAdmin" className="text-[1rem] btn btn-primary">
          اضافة مسؤل
        </Link>
        <div className="join flex-wrap ">
          <div>
            <div>
              <input
                onChange={(input) => {
                  if (input.target.value.trim() == "") getAdmin();
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
            <option value="email">بريد إلكتروني</option>
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
        <table className="table w-[1600px]">
          {/* head */}
          <thead>
            <tr className="text-[1rem]">
              <th>العدد</th>
              <th>اسم العضو</th>
              <th>رقم الهوية</th>
              <th>بريد إلكتروني</th>
              <th>رقم الجوال</th>
              <th colSpan="2" rowSpan="2" className="">
                <span className="flex w-full justify-center"> تاريخ الاشتراك  </span>
                <div className="flex mt-[0.5rem]">
                  <span className="w-1/2 text-center">الميلادي</span>
                  <span className="w-1/2 text-center">الهجري</span>
                </div>
              </th>
              <th>الحالة</th>
              <th>تعديل</th>
              <th>حدف</th>
            </tr>
          </thead>
          <tbody className="text-[1rem]">
            {admins && admins.map((admin, index) => {
              const date = new Date(admin.createdAt);
              return (
                <tr>
                  <td>{admin._id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.NationalIdentificationNumber}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phoneNumber}</td>
                  <td className="text-center">{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</td>
                  <td className="text-center">{admin.hijriDate.year + "-" + admin.hijriDate.month.number + "-" + admin.hijriDate.day}</td>
                  <td className={(admin.status == "not active" ? "text-error" : "text-success") + " font-bold text-[1.3rem]"}>{admin.status == "not active" ? "غير مفعل" : "مفعل"}</td>
                  <td><Link to={`/admin/updateAdmin?id=${admin._id}`} className="btn btn-warning">تعديل</Link></td>
                  <td><button onClick={() => {
                    setUserDelete({
                      id: admin._id,
                      index
                    });
                    document.getElementById('deleteModel').showModal()
                  }} className="btn btn-error">حدف</button></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages}/>
      <DeleteUserModals user={userDelete} setShowAlert={setShowAlert} users={admins} setUsers={setAdmins} deleteFetch={deleteAdminFetch} />
    </div>
  )
}

export default DisplayAdmin