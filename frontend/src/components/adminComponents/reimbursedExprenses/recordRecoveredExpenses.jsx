import React from 'react'

function RecordRecoveredExpenses() {
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                المصروفات المستردة
            </h1>
            <div className='text-[1.1rem] flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
                <label>إيرادات اقساط السلع لشهر</label>
                <input type="date" className='input input-bordered' />
                <label>
                    الموافق لي{" "}

                    <span>
                        1445/12/19
                    </span>

                </label>
            </div>
            <div className="mt-[1rem] flex gap-[1rem] justify-center">
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي المصروفات المستردة لهذا الشهر</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">جمالي المصروفات المستردة</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">514</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
                    <tr>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                            اسم الجهة
                        </th>
                        <th className="border text-center border-slate-600" rowSpan={2}>
                        المبلغ المصروف 
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
                    </tr>
                    <tr>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecordRecoveredExpenses