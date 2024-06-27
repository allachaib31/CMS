import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function DisplayRecordUnrecoveredExpenses() {
  return (
    <div className="px-[1rem] sm:px-0">
      <div>
        <Link to="/unreimbursedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        سجل المصروفات الغير مستردة
      </h1>
      <div className="mt-[1rem] flex flex-wrap gap-[1rem] justify-center">
        <div className="flex flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي المصروفات الغير مستردة </h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">المصروفات المسددة نقداً</h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">514</h1>
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">المصروف من رصيد العضو</h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">514</h1>
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">عدد المستفيدين</h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">514</h1>
        </div>
      </div>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
          <tr>
            <th className="border text-center border-slate-600" rowSpan={2}>
              اسم المستفيد
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              المصروف من رصيد الصندوق
            </th>
            <th colSpan={2} className="border text-center border-slate-600">
              المصروفات المسددة نقداً
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              الإجمالي
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              نوع المصروف
            </th>
            <th colSpan={2} className="border text-center border-slate-600">
              تاريخ الصرف
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              البيان
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              تفاصيل أكثر
            </th>
          </tr>
          <tr>
            <th className="border text-center border-slate-600">
              المبلغ
            </th>
            <th className="border text-center border-slate-600">
              المصدر
            </th>
            <th className="border text-center border-slate-600">
              الميلادي
            </th>
            <th className="border text-center border-slate-600">
              الهجري
            </th>
          </tr>
          <tbody>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
            <td className="border text-center border-slate-600"></td>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayRecordUnrecoveredExpenses