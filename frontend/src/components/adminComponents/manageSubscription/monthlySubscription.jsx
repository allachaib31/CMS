import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate'
import { useNavigate } from 'react-router-dom';
import { addMonthlySubscriptionsFetch, getTypeSubscriptionFetch, searchUserFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function MonthlySubscription() {
  const navigate = useNavigate();
  var year = hijriDateObject()[2];
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inputs, setInputs] = useState({
    idUser: "",
    amount: "",
    month: "1",
    year: year,
    comments: ""
  });
  const [user, setUser] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearOptions, setYearOptions] = useState([]);
  const [search, setSearch] = useState({
    searchMethod: "_id",
    searchValue: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const handleSubmit = () => {
    setSubmit((e) => !e);
    setShowAlert({
        display: false,
    });
    addMonthlySubscriptionsFetch(inputs).then((res) => {
      setSubmit((e) => !e)
      setShowAlert({
          display: true,
          status: true,
          text: res.data.msg
      });
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
      setSubmit((e) => !e)
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    })
  }
  const handleSearch = () => {
    setLoadingSearch((e) => !e);
    setShowAlert({
      display: false,
    });
    searchUserFetch(search).then((res) => {
      setUser(res.data.user);
      setLoadingSearch((e) => !e)
      setInputs((prevInputs) => {
        return { ...prevInputs, idUser: res.data.user[0]._id };
      })
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
  const generateYear = () => {
    var years = [];
    for (let i = 1415; i <= year; i++) {
      years.push(i);
    }
    setYearOptions(years);
  }
  useEffect(() => {
    generateYear();
    getTypeSubscriptionFetch().then((res) => {
      setMonthlyPrice(res.data.typeSubscription[0].amount);
      setInputs((prevInputs) => {
        return { ...prevInputs, amount: res.data.typeSubscription[0].amount };
      })
    }).catch((err) => {
      if (err.response.status == 401) {
        navigate("/auth");
      }
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    })
  }, [])
  return (
    <div className="mt-[1rem]">
      <div className="join flex-wrap mb-[1rem]">
        <div>
          <div>
            <input
              onChange={(input) => {
                if (input.target.value.trim() == "") setUser(false);
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
          <option value="NationalIdentificationNumber">رقم الهوية</option>
          <option value="phoneNumber">رقم الجوال</option>
          <option value="email">بريد إلكتروني</option>
        </select>
        <div className="indicator xs:mt-0 mt-[1rem] ">
          <button onClick={handleSearch} className="btn xs:w-auto bg-primary text-[20px] text-white join-item">
            {loadingSearch ? <span className="loading loading-ring loading-lg"></span> : "ابحث"}
          </button>
        </div>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto  mt-[2rem]">
        <table className="table text-[1rem] mx-auto w-[1800px]">
          <thead className="text-[1rem]">
            <tr>
              <th>العدد</th>
              <th>اسم العضو</th>
              <th>رقم الهوية</th>
              <th>بريد إلكتروني</th>
              <th>رقم الجوال</th>
              <th>نوع المبلغ</th>
              <th>سعر الاشتراك</th>
              <th>الدفعة الخاصة باي شهر</th>
              <th>الدفعة الخاصة باي سنة</th>
              <th>ملحوظات</th>
              <th>دفع</th>
            </tr>
          </thead>
          <tbody>
            {user && user.map((user, index) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.NationalIdentificationNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>شهري</td>
                  <td>{monthlyPrice}</td>
                  <td><select onChange={(event) => {
                    return setInputs((prevInput) => {
                      return {...prevInput, month: event.target.value.trim()}
                    })
                  }} className="bg-transparent border pl-[2rem] pr-[1.5rem] ">
                    <option value="1">محرم</option>
                    <option value="2">صفر</option>
                    <option value="3">ربيع الاول</option>
                    <option value="4">ربيع الثاني</option>
                    <option value="5">جماد الأول</option>
                    <option value="6">جماد الثاني</option>
                    <option value="7">رجب</option>
                    <option value="8">شعبان</option>
                    <option value="9">رمضان</option>
                    <option value="10">شوال</option>
                    <option value="11">ذو القعدة</option>
                    <option value="12">ذو الحجة</option>
                  </select></td>
                  <td>
                    <select onChange={(event) => {
                      return setInputs((prevInput) => {
                        return {...prevInput, year: event.target.value.trim()}
                      })
                    }} className="bg-transparent border pl-[2rem] pr-[1.5rem] ">
                      {
                        yearOptions && yearOptions.map((value) => (
                          <option value={value} selected={year == value}>{value}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td><input type="text" onChange={(event) => {
                    setInputs((prevInputs) => {
                      return { ...prevInputs, comments: event.target.value.trim() }
                    })
                  }} placeholder="أكتب هنا" className="input input-bordered w-full max-w-xs" /></td>
                  <td><button onClick={handleSubmit} className='btn btn-success'>{submit ? <span className="loading loading-ring loading-lg"></span> : "دفع"}</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MonthlySubscription