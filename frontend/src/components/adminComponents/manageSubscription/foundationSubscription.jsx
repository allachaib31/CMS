import React, { useEffect, useState } from 'react'
import { addFoundationSubscriptionsFetch, getTypeSubscriptionFetch, getUserForFoundationSubscripeFetch, searchUserFetch } from '../../../utils/apiFetch';
import { useNavigate } from 'react-router-dom';
import Alert from '../../alert/alert';

function FoundationSubscription() {
  const navigate = useNavigate();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inputs, setInputs] = useState({
    idUser: "",
    amount: "",
    comments: ""
  });
  const [user, setUser] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [foundationPrice, setFoundationPrice] = useState(0);
  const [search, setSearch] = useState({
    searchMethod: "_id",
    searchValue: "",
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
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
  const handleSubmit = (input) => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    addFoundationSubscriptionsFetch(input).then((res) => {
      setSubmit((e) => !e)
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      document.getElementById(input.idUser).innerHTML = "لقد تم دفع";
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
  useEffect(() => {
    getTypeSubscriptionFetch().then((res) => {
      setFoundationPrice(res.data.typeSubscription[1].amount);
      setInputs((prevInputs) => {
        return { ...prevInputs, amount: res.data.typeSubscription[1].amount };
      })
      getUserForFoundationSubscripeFetch().then((res) => {
        setUser(res.data.users);
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
  }, []);
  return (
    <div>
      {
        /**
         *       <div className="container mx-auto flex flex-wrap mb-[1rem]">
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
        }} className="select pl-[2rem] pr-[1.5rem] select-bordered join-item">
          <option value="_id">العدد</option>
          <option value="NationalIdentificationNumber">رقم الهوية</option>
          <option value="phoneNumber">رقم الجوال</option>
        </select>
        <div className="indicator  ">
          <button onClick={handleSearch} className="btn xs:w-auto bg-primary text-[20px] text-white join-item">
            {loadingSearch ? <span className="loading loading-ring loading-lg"></span> : "ابحث"}
          </button>
        </div>
      </div>
         */
      }

      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto ">
        <table className="table table-x mx-auto w-[700px] sm:w-[1400px]">
          <thead className="text-center text-sm">
            <tr>
              <th>العدد</th>
              <th>اسم العضو</th>
              <th>رقم الهوية</th>
              <th>رقم الجوال</th>
              <th>نوع المبلغ</th>
              <th>مبلغ الاشتراك</th>
              <th>ملحوظات</th>
              <th>دفع</th>
            </tr>
          </thead>
          <tbody>
            {user && user.map((user, index) => {
              let comment = "";
              return (
                <tr className='text-center text-sm'>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.NationalIdentificationNumber}</td>
                  <td>{user.phoneNumber}</td>
                  <td>التأسيس</td>
                  <td>{foundationPrice}</td>
                  <td>{user.enableAccount ? "" : <input type="text" onChange={(event) => {
                    comment = event.target.value.trim()
                    /*setInputs((prevInputs) => {
                      return { ...prevInputs, comments: event.target.value.trim() }
                    })*/
                  }} placeholder="أكتب هنا" className="input input-bordered w-full max-w-xs" />}</td>
                  <td id={user._id}>{user.enableAccount ? "لقد تم دفع" : <button onClick={() => {
                    if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                      handleSubmit({
                        idUser: user._id,
                        amount: foundationPrice,
                        comments: comment
                      })
                    }
                  }} className='btn btn-success'>دفع</button>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FoundationSubscription