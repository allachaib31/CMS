import { faIdCard, faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addExpensesFetch, getTypeExpensesFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function ReimbursedExpenseRequest() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    amount: 0,
    typeExpenses: "",
    comments: ""
  });
  const [expensesType, setExpensesType] = useState(false);
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const handleSubmit = () => {
    setShowAlert({
      display: false,
    });
    setSubmit((e) => !e);
    addExpensesFetch(inputs).then((res) => {
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
  useEffect(() => {
    getTypeExpensesFetch().then((res) => {
      setExpensesType(res.data.typesExpenses);
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
    })
  }, []);
  return (
    <div className="container mx-auto sm:p-0 px-[1rem]">
      <div>
        <Link to="/reimbusedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        نموذج تسجيل مصروف
      </h1>
      <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
        {showAlert.display ? <Alert msg={showAlert} /> : ""}
        <div className="flex sm:flex-row flex-col gap-[1rem]">
          <div className="relative sm:w-1/2">
            <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
            <input type="text" onChange={(event) => {
              setInputs((prevInputs) => {
                return {
                  ...prevInputs,
                  name: event.target.value
                }
              })
            }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم الجهة" pattern='^.{3,1024}$' />
          </div>
          <div className="relative sm:w-1/2">
            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
            <input type="number" onChange={(event) => {
              setInputs((prevInputs) => {
                return {
                  ...prevInputs,
                  amount: event.target.value
                }
              })
            }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="المصروف من رصيد الصندوق " />
          </div>
        </div>
        <input type="text" onChange={(event) => {
          setInputs((prevInputs) => {
            return {
              ...prevInputs,
              comments: event.target.value
            }
          })
        }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اكتب بيان" pattern='^.{3,1024}$' />
        <select onChange={(event) => {
          setInputs((prevInputs) => {
            return {
              ...prevInputs,
              typeExpenses: event.target.value
            }
          })
        }} pattern='^.{3,1024}$' className="select select-bordered w-full">
          <option disabled selected>اختر نوع المصروف</option>
          {expensesType && expensesType.map((expenses) => {
            return (
              <option value={expenses.id}>{expenses.name}</option>
            )
          })}
        </select>
        <button onClick={handleSubmit} disabled={submit} className='btn text-white font-bold text-[20px] btn-primary'>{submit ? <span className="loading loading-ring loading-lg"></span> : "اضافة"}</button>
      </form>
    </div>
  )
}

export default ReimbursedExpenseRequest