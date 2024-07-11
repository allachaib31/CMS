import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecordUnrecovereExpensesFetch } from '../../../utils/apiFetch'

function DisplayRecordUnrecoveredExpenses() {
  const [unReimbursedExpenses, setUnReimbursedExpenses] = useState(false);
  const [total, setTotal] = useState(0);
  const [expensesPaidCash, setExpensesPaidCash] = useState(0);
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(0);
  useEffect(() => {
    getRecordUnrecovereExpensesFetch().then((res) => {
      console.log(res)
      setUnReimbursedExpenses(res.data.unReimbursedExpenses)
      setTotal(res.data.total);
      setExpensesPaidCash(res.data.expensesPaidCash);
      setNumberOfBeneficiaries(res.data.numberOfBeneficiaries);
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div className="px-[1rem] sm:px-0">
      <div className='container mx-auto'>
        <Link to="/unreimbursedExpenses/" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        سجل المصروفات الغير مستردة
      </h1>
      <div className="mt-[1rem] flex flex-col md:flex-row gap-[1rem] justify-center">
        <div className="flex md:flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] md:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي المصروفات الغير مستردة </h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{total.toFixed(2)}</h1>
        </div>
        <div className="flex md:flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] md:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">المصروفات المسددة نقداً</h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{expensesPaidCash.toFixed(2)}</h1>
        </div>
        <div className="flex md:flex-col items-center gap-[1rem]">
          <h1 className="text-[1.1rem] md:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">عدد المستفيدين</h1>
          <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{numberOfBeneficiaries}</h1>
        </div>
      </div>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[1900px] mx-auto">
          <tr>
            <th className="border text-center border-slate-600" rowSpan={2}>
              رقم الطلب
            </th>
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
            {
              unReimbursedExpenses && unReimbursedExpenses.map((expenses) => {
                return (
                  <tr >
                    <td className="border text-center border-slate-600">{expenses.id}</td>
                    <td className="border text-center border-slate-600">{expenses.name}</td>
                    <td className="border text-center border-slate-600">{expenses.balanceDistribution.toFixed(2)}</td>
                    <td className="border text-center border-slate-600">
                      {
                        expenses.expensesPaidCash.map((expensesPaidCash) => {
                          return (
                            <tr className='flex mb-1'>
                              <td className="w-full border text-center border-slate-600">{expensesPaidCash.amount.toFixed(2)}</td>
                            </tr>
                          )
                        })
                      }
                    </td>
                    <td className="border text-center border-slate-600">
                      {
                        expenses.expensesPaidCash.map((expensesPaidCash) => {
                          return (
                            <tr className='flex mb-1'>
                              <td className="w-full border text-center border-slate-600">{expensesPaidCash.name}</td>
                            </tr>
                          )
                        })
                      }
                    </td>
                    <td className="border text-center border-slate-600">{expenses.total.toFixed(2)}</td>
                    <td className="border text-center border-slate-600">{expenses.typeExpenses}</td>
                    <td className="border text-center border-slate-600">{expenses.createdAt}</td>
                    <td className="border text-center border-slate-600">{expenses.hijriDate.year}/{expenses.hijriDate.month.number}/{expenses.hijriDate.day}</td>
                    <td className="border text-center border-slate-600">{expenses.comments}</td>
                    <td className="border text-center border-slate-600"></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayRecordUnrecoveredExpenses