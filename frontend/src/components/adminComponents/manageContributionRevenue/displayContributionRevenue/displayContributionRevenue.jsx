import React from 'react'
import { Link } from 'react-router-dom'

function DisplayContributionRevenue() {
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                إيرادات المساهمة
            </h1>
            <div className='text-[1.1rem] flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
                <label>إيرادات المساهمة لشهر</label>
                <input type="date" className='input input-bordered' />
                <label>الموافق ل 04/10/1445</label>
            </div>
            <div className="mt-[1rem] flex flex-wrap gap-[1rem] justify-center">
                <div className="flex sm:flex-col items-center gap-[1rem]">
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي إيرادات المساهمة لهذا الشهر</h1>
                    <h1 className="sm:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1500px] mx-auto">
                    <thead className="text-center text-[1rem]">
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                رقم المساهمة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                اسم البنك / الشركة / الصندوق
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                المبلغ
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                نوع الايراد
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ الاستحقاق
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                ملاحظات
                            </th>
                        </tr>
                        <tr>
                            <th className="text-center border border-slate-600">
                                الميلادي
                            </th>
                            <th className="text-center border border-slate-600">
                                الهجري
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <th className="border border-slate-600">
                                <select className='select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                                    <option selected disabled>قم باختيار رقم المساهمة</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                </select>
                            </th>
                            <th className="border border-slate-600">
                                bank1
                            </th>
                            <td className="border border-slate-600">
                                200
                            </td>
                            <td className="border border-slate-600">
                                مواد بناء
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptatibus, voluptates praesentium expedita doloremque similique suscipit enim neque, illo eius ut ipsum aliquam quisquam natus quas culpa, quos a. Ab.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DisplayContributionRevenue