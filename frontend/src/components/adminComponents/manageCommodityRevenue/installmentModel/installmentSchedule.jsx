import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getInstallmentScheduleFetch } from '../../../../utils/apiFetch';
import moment from 'moment';
function InstallmentSchedule() {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [installmentSchedule, setInstallmentSchedule] = useState(false);
    const [installmentspaid, setInstallmentspaid] = useState(false);
    const [unpaidInstallments, setUnpaidInstallments] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading((e) => !e);
        getInstallmentScheduleFetch(query.get("id")).then((res) => {
            setLoading((e) => !e);
            setInstallmentSchedule(res.data.installmentSchedule);
            setInstallmentspaid(res.data.installmentspaid);
            setUnpaidInstallments(res.data.unpaidInstallments);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }, [])
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/commodityRevenue/commodityPurchaseOrderForm" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                جدول الاقساط
            </h1>
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[1rem]">
                    {installmentSchedule && <table className="text-[1rem] table border-separate border-spacing-2 border w-[1900px] mx-auto">
                        <tr className='text-center'>
                            <th className="border text-center border-slate-600" colSpan={9}>جدول الاقساط</th>
                        </tr>
                        <tr>
                            <th className="border text-center border-slate-600">
                                رقم الطلب
                            </th>
                            <th className="border text-center border-slate-600">
                                اسم العميل
                            </th>
                            <th className="border text-center border-slate-600">
                                نوع السلعة
                            </th>
                            <th className="border text-center border-slate-600">
                                مبلغ البيع
                            </th>
                            <th className="border text-center border-slate-600">
                                عدد الاقساط
                            </th>
                            <th className="border text-center border-slate-600">
                                الاقساط المسددة
                            </th>
                            <th className="border text-center border-slate-600">
                                الاقساط الغير المسددة
                            </th>
                            <th className="border text-center border-slate-600">
                                اجمالي المبلغ المسدد
                            </th>
                            <th className="border text-center border-slate-600">
                                المبلغ المتبقي
                            </th>
                        </tr>
                        <tbody>
                            <tr>
                                <td className="border text-center border-slate-600">{installmentSchedule[0].idCommodityRevenue.id}</td>
                                <td className="border text-center border-slate-600">{installmentSchedule[0].idCommodityRevenue.customerData.name}</td>
                                <td className="border text-center border-slate-600">{installmentSchedule[0].idCommodityRevenue.commodityData.itemType}</td>
                                <td className="border text-center border-slate-600">{installmentSchedule[0].idCommodityRevenue.commodityData.saleAmount}</td>
                                <td className="border text-center border-slate-600">{installmentSchedule.length}</td>
                                <td className="border text-center border-slate-600">{installmentspaid}</td>
                                <td className="border text-center border-slate-600">{unpaidInstallments}</td>
                                <td className="border text-center border-slate-600">{installmentspaid * installmentSchedule[0].premiumAmount}</td>
                                <td className="border text-center border-slate-600">{unpaidInstallments * installmentSchedule[0].premiumAmount}</td>
                            </tr>
                        </tbody>
                        <tr>
                            <th rowSpan={2} className="border text-center border-slate-600">
                                رقم القسط
                            </th>
                            <th rowSpan={2} className="border text-center border-slate-600">
                                مبلغ القسط
                            </th>
                            <th rowSpan={2} className="border text-center border-slate-600">
                                القسط المسدد
                            </th>
                            <th colSpan={2} className="border text-center border-slate-600">
                                تاريخ السداد المطلوب
                            </th>
                            <th colSpan={2} className="border text-center border-slate-600">
                                تاريخ السداد الفعلي
                            </th>
                            <th rowSpan={2} colSpan={2} className="border text-center border-slate-600">
                                الاقساط المتاخرة
                            </th>
                        </tr>
                        <tr>
                            <th className="border text-center border-slate-600">الميلادي</th>
                            <th className="border text-center border-slate-600">الهجري</th>
                            <th className="border text-center border-slate-600">الميلادي</th>
                            <th className="border text-center border-slate-600">الهجري</th>
                        </tr>
                        <tbody>
                            {installmentSchedule.map((installment) => {
                                // Parse the required payment date
                                const paymentDate = moment(installment.requiredPaymentDate);

                                // Get the current date in the same timezone
                                const currentDate = moment().tz('Asia/Riyadh');

                                // Calculate the difference in days
                                const daysDifference = currentDate.diff(paymentDate, 'days');

                                // Check if the difference is more than 5 days
                                let late = "";
                                if (daysDifference > 5) {
                                    late = "نعم"
                                } else {
                                    late = "لا"
                                }
                                return (
                                    <tr>
                                        <td className="border text-center border-slate-600">{installment.id}</td>
                                        <td className="border text-center border-slate-600">{installment.premiumAmount}</td>
                                        <td className="border text-center border-slate-600">{installment.itPaid ? "نعم" : "لا"}</td>
                                        <td className="border text-center border-slate-600">{installment.requiredPaymentDate}</td>
                                        <td className="border text-center border-slate-600">{installment.requiredPaymentDateHijri.year}-{installment.requiredPaymentDateHijri.month.number}-{installment.requiredPaymentDateHijri.day}</td>
                                        <td className="border text-center border-slate-600">{installment.itPaid ? installment.actualPaymentDate : ""}</td>
                                        <td className="border text-center border-slate-600">{installment.itPaid ? installment.requiredPaymentDateHijri.year + "-" + installment.requiredPaymentDateHijri.month.number + "-" + installment.requiredPaymentDateHijri.day : ""}</td>
                                        <td colSpan={2} className="border text-center border-slate-600">{late}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>}
                </div>
            }
        </div>
    )
}

export default InstallmentSchedule