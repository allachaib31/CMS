import React from "react";
import { Link } from "react-router-dom";

function LoansData() {
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                بيانات القرض
            </h1>
            <div className="join">
                <input className="input input-bordered join-item" placeholder="رقم القرض " />
                <button className="btn btn-primary text-[1.1rem] font-bold join-item rounded-r-full">ابحث</button>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                اسم العضو
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                رقم الطلب
                            </th>
                            <th className="border border-slate-600" colSpan={2}>
                                تاريخ الطلب
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ القرض
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ استلام القرض
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ بداية التسديد
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ انتهاء التسديد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                عدد الأقساط
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ القسط الأول
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ القسط الأخير
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                الأقساط المسددة
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                الأقساط المتبقية
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ المسدد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                مبلغ المتبقي
                            </th>
                        </tr>
                        <tr>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                            <th className="border border-slate-600">
                                الميلادي
                            </th>
                            <th className="border border-slate-600">
                                الهجري
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                        <td className="border border-slate-600"></td>
                    </tbody>
                    <tr>
                        <td className="text-center border border-slate-600" colSpan={18}>للانتقال إلى سجل الأقساط <Link to="/loans/recordInstallments" className="text-error">اضغط هنا</Link></td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default LoansData;
