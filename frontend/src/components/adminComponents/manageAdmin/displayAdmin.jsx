import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Pagination } from "../../index";
import { deleteAdminFetch, getAdminFetch, searchAdminFetch } from "../../../utils/apiFetch";
import DeleteAdminModals from "../../modals/deleteModalsAdmin";

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
      <div className="container mx-auto mb-[1rem] flex sm:flex-row sm:gap-0 gap-[1rem] flex-col justify-between">
        <Link to="/admin/addAdmin" className="btn btn-sm text-sm btn-primary">
        إضافة مسؤول 
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
                className="input input-sm input-bordered join-item"
                placeholder="أكتب هنا"
              />
            </div>
          </div>
          <select onChange={(input) => {
            setSearch((search) => {
              return { ...search, searchMethod: input.target.value.trim() }
            })
          }} className="select select-sm xs:mt-0  pl-[2rem] pr-[1.5rem] select-bordered join-item">
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
      <div className="overflow-x-auto xl:flex xl:justify-center">
        <table className="table table-xs border-separate border-spacing-0 border w-[500px] md:w-[1400px]">
          {/* head */}
          <thead>
            <tr className="text-center text-xs">
              <th className="border border-slate-600" rowSpan={2}>العدد</th>
              <th className="border border-slate-600" rowSpan={2}>اسم العضو</th>
              <th className="border border-slate-600" rowSpan={2}>رقم الهوية</th>
              <th className="border border-slate-600" rowSpan={2}>رقم الجوال</th>
              <th colSpan="2" className="border border-slate-600">
                <span className="flex w-full justify-center"> تاريخ الاشتراك  </span>

              </th>
              <th className="border border-slate-600" rowSpan={2}>الحالة</th>
              <th className="border border-slate-600" rowSpan={2}>تعديل</th>
              <th className="border border-slate-600" rowSpan={2}>حدف</th>
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
          <tbody className="text-[1rem]">
            {admins && admins.map((admin, index) => {
              const date = new Date(admin.createdAt);
              return (
                <tr className="text-center text-xs">
                  <td className="border border-slate-600">{admin.id}</td>
                  <td className="border border-slate-600">{admin.name}</td>
                  <td className="border border-slate-600">{admin.NationalIdentificationNumber}</td>
                  <td className="border border-slate-600">{admin.phoneNumber}</td>
                  <td className="text-center border border-slate-600">{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</td>
                  <td className="text-center border border-slate-600">{admin.hijriDate.year + "-" + admin.hijriDate.month.number + "-" + admin.hijriDate.day}</td>
                  <td className={"border border-slate-600"}><span className={(admin.status == "not active" ? "!text-error" : "!text-success") + " text-sm font-bold"}>{admin.status == "not active" ? "غير مفعل" : "مفعل"}</span></td>
                  <td className="border border-slate-600"><Link to={`/admin/updateAdmin?id=${admin.id}&name=${admin.name}`} className="btn btn-xs btn-warning">تعديل</Link></td>
                  <td className="border border-slate-600"><button onClick={() => {
                    setUserDelete({
                      id: admin.id,
                      index
                    });
                    document.getElementById('deleteModel').showModal()
                  }} className="btn btn-xs btn-error">حدف</button></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages}/>
      <DeleteAdminModals user={userDelete} setShowAlert={setShowAlert} users={admins} setUsers={setAdmins} deleteFetch={deleteAdminFetch} />
    </div>
  )
}

export default DisplayAdmin