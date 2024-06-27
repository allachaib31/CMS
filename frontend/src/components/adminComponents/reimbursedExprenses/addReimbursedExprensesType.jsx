import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function AddReimbursedExprensesType() {
  return (
    <div className="sm:p-0 px-[1rem]">
      <div>
        <Link to="/reimbusedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        اضافة نوع مصروف
      </h1>
      <form action="">
        <input type="text" placeholder="اكتب نوع مصروف" className="input input-bordered w-full max-w-xs" />
        <button className='btn btn-primary text-[1.1rem] font-bold'>اضافة</button>
      </form>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
          <tr>
            <th className="border text-center border-slate-600">
              رقم النوع
            </th>
            <th className="border text-center border-slate-600">
              اسم النوع
            </th>
            <th className="border text-center border-slate-600">
              حدف
            </th>
          </tr>
          <tbody>
            <tr>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddReimbursedExprensesType