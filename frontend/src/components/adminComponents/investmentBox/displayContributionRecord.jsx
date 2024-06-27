import React from 'react'

function DisplayContributionRecord() {
  return (
    <div className="px-[1rem] sm:px-0">
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        بيانات المساهمة في الصناديق الاستثمارية
      </h1>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
          <thead className="text-[1rem] text-center">
            <tr>
              <th className="border border-slate-600">
                رقم المساهمة
              </th>
              <th className="border border-slate-600">
                اسم العضو
              </th>
              <th className="border border-slate-600">
                نسبة المساهمة
              </th>
              <th className="border border-slate-600">
                مبلغ المساهمة
              </th>
              <th className="text-center border border-slate-600">
                مبلغ الريح
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <th className="border border-slate-600">
              <select  className='select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                <option selected disabled>قم باختيار رقم المساهمة</option>
                  <option value="1">1</option>
              </select>
            </th>
            <th className="border border-slate-600">
              <select  className='select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                <option selected disabled>قم باختيار اسم العضو</option>
                  <option value="1">ala</option>
              </select>
            </th>
            <td className="border border-slate-600">10%</td>
            <td className="border border-slate-600">100</td>
            <td className="border border-slate-600">500</td>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayContributionRecord