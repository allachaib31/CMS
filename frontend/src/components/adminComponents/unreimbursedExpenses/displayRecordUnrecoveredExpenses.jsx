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
      setUnReimbursedExpenses(res.data.unReimbursedExpenses)
      setTotal(res.data.total);
      setExpensesPaidCash(res.data.expensesPaidCash);
      setNumberOfBeneficiaries(res.data.numberOfBeneficiaries);
    }).catch((err) => {
    })
  }, [])
  return (
    <div className="px-[1rem] sm:px-0">
      <div className='container mx-auto'>
        <Link to="/unreimbursedExpenses/" className="btn btn-sm btn-primary px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center font-bold py-[0.5rem]">
        سجل المصروفات 
      </h1>
      <div className="mt-[0.5rem] flex flex-col md:flex-row gap-[0.5rem] justify-center">
        <div className="flex md:flex-col items-center gap-[0.5rem]">
          <h1 className="md:w-auto w-[70%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي المصروفات  </h1>
          <h1 className="md:w-auto w-[30%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{total.toFixed(2)}</h1>
        </div>
        <div className="flex md:flex-col items-center gap-[0.5rem]">
          <h1 className="md:w-auto w-[70%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">المصروفات المسددة نقداً</h1>
          <h1 className="md:w-auto w-[30%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{expensesPaidCash.toFixed(2)}</h1>
        </div>
        <div className="flex md:flex-col items-center gap-[0.5rem]">
          <h1 className="md:w-auto w-[70%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">عدد المستفيدين</h1>
          <h1 className="md:w-auto w-[30%] bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem] text-center">{numberOfBeneficiaries}</h1>
        </div>
      </div>
      <div className="overflow-x-auto mt-[0.5rem]">
        <table className="table table-xs border-separate border-spacing-0 border w-[500px] md:w-[1000px] mx-auto">
          <tr className='text-xs'>
            <th className="border text-center border-slate-600" rowSpan={2}>
              رقم <br />الطلب
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              المستفيد
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              نوع <br />المصروف
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
            المبلغ المطلوب <br />صرفه
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              المصروف من <br />رصيد العضو
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              المصروف من <br />رصيد الصندوق
            </th>
            <th colSpan={2} className="border text-center border-slate-600">
              المصروفات المسددة <br />نقداً
            </th>
            <th rowSpan={2} className="border text-center border-slate-600">
              تاريخ <br/> الميلادي
            </th>
            <th rowSpan={2} className="border text-center border-slate-600">
              تاريخ <br/> الهجري
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              البيان
            </th>
            {/*<th className="border text-center border-slate-600" rowSpan={2}>
              تفاصيل أكثر
            </th>*/}
          </tr>
          <tr>
            <th className="border text-center border-slate-600">
              المبلغ
            </th>
            <th className="border text-center border-slate-600">
              المصدر
            </th>
          </tr>
          <tbody>
            {
              unReimbursedExpenses && unReimbursedExpenses.map((expenses) => {
                const d = new Date(expenses.createdAt);
                return (
                  <tr className='text-xs'>
                    <td className="border text-center border-slate-600">{expenses.id}</td>
                    <td className="border text-center border-slate-600">{expenses.name}</td>
                    <td className="border text-center border-slate-600">{expenses.typeExpenses}</td>
                    <td className="border text-center border-slate-600">{expenses.amount.toFixed(2)}</td>
                    <td className="border text-center border-slate-600">{expenses.expensememberbalance.toFixed(2)}</td>
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
                    <td className="border text-center border-slate-600">{d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate()}</td>
                    <td className="border text-center border-slate-600">{expenses.hijriDate.year}/{expenses.hijriDate.month.number}/{expenses.hijriDate.day}</td>
                    <td className="border text-center border-slate-600">{expenses.comments}</td>
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