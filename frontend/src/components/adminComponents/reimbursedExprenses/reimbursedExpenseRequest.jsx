import { faIdCard, faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function ReimbursedExpenseRequest() {
  return (
    <div className="sm:p-0 px-[1rem]">
      <div>
        <Link to="/reimbusedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        نموذج طلب مصروف
      </h1>
      <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
        <div className="flex sm:flex-row flex-col gap-[1rem]">
          <div className="relative sm:w-1/2">
            <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم الجهة" />
          </div>
          <div className="relative sm:w-1/2">
            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="المصروف من رصيد الصندوق " />
          </div>
        </div>
        <select className="select select-bordered w-full">
          <option disabled selected>اختر نوع المصروف</option>
        </select>
        <button className='btn text-white font-bold text-[20px] btn-primary'>تاكيد</button>
      </form>
    </div>
  )
}

export default ReimbursedExpenseRequest