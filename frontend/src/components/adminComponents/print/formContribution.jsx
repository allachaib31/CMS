import React, { useEffect, useState } from 'react'
import { getFormContributionPurchaseCommodityFetch } from '../../../utils/apiFetch';
import { useLocation, useNavigate } from 'react-router-dom';
function FormContribution() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [commodityRevenu, setCommodityRevenu] = useState(false);
    const [userContribution, setUserContribution] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        setLoading((e) => !e)
        getFormContributionPurchaseCommodityFetch(query.get("id")).then((res) => {
            if(!res.data.print){
                alert("ليس لديك الاذن طباعة سجل المساهمة في شراء السلع")
                navigate("/commodityRevenue/formContributionPurchaseCommodity")
            }
            setLoading((e) => !e)
            setCommodityRevenu(res.data.commodityRevenue);
            setUserContribution(res.data.userContribution);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }, []);
    useEffect(() => {
        if(commodityRevenu && commodityRevenu._id) window.print();
    },[loading])
    return (
        <div id="printableArea">
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto ">
                    {
                        commodityRevenu && <table className="text-[1.1rem] table border-separate border-spacing-2 border w-[1200px]  mx-auto">
                        <tr className='text-center'>
                            <th className="border text-center border-slate-600" colSpan={7}>البيانات: العميل \ سلعة \ الكفيل</th>
                        </tr>
                        <tr>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                رقم الطلب
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                اسم العميل
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                نوع السلعة
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                مبلغ الشراء
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                مبلغ البيع
                            </th>
                            <th className="border text-center border-slate-600" colSpan={2}>
                                تاريخ البيع
                            </th>
                        </tr>
                        <tr>
                            <th className="border text-center border-slate-600">الميلادي</th>
                            <th className="border text-center border-slate-600">الهجري</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td className="border text-center border-slate-600">{commodityRevenu.id}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.customerData.name}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.itemType}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.purchaseAmount.toFixed(2)}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.saleAmount.toFixed(2)}</td>
                                <td className="border text-center border-slate-600">{new Date(commodityRevenu.commodityData.saleDate).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.saleDate).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.saleDate).getUTCDate()}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.saleDateHijri.year}-{commodityRevenu.commodityData.saleDateHijri.month.number}-{commodityRevenu.commodityData.saleDateHijri.day}</td>
                            </tr>
                        </tbody>
                        <tr>
                            <th className="border text-center border-slate-600" colSpan={3}>
                                اسم الكفيل
                            </th>
                            <th className="border text-center border-slate-600" colSpan={2}>
                                نسبة الكفيل
                            </th>
                            <th className="border text-center border-slate-600" colSpan={2}>
                                مبلغ نسبته
                            </th>
                        </tr>
                        <tbody>
                            <tr>
                                <td className="border text-center border-slate-600" colSpan={3}>{commodityRevenu.sponsorData.name}</td>
                                <td className="border text-center border-slate-600" colSpan={2}>{commodityRevenu.sponsorData.sponsorRatio}%</td>
                                <td className="border text-center border-slate-600" colSpan={2}>{commodityRevenu.sponsorData.amount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                        <tr className='text-center'>
                            <th className="border border-slate-600" colSpan={7}>بيانات الصندوق</th>
                        </tr>
                        <tr>
                            <th className="border text-center border-slate-600">الرصيد السابق لصندوق</th>
                            <th className="border text-center border-slate-600">مبلغ المساهمة</th>
                            <th className="border text-center border-slate-600">نسبة المساهمة</th>
                            <th className="border text-center border-slate-600">نسبة الربح</th>
                            <th className="border text-center border-slate-600">مبلغ الربح</th>
                            <th className="border text-center border-slate-600" colSpan={2}>الرصيد</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.currentBalanceFund.toFixed(2)}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.contributionAmount.toFixed(2)}</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.contributionPercentage.toFixed(2)}%</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.profitRatio.toFixed(2)}%</td>
                                <td className="border text-center border-slate-600">{commodityRevenu.commodityData.profitAmount.toFixed(2)}</td>
                                <td className="border text-center border-slate-600" colSpan={3}>{commodityRevenu.commodityData.balance.toFixed(2)}</td>
                            </tr>
                        </tbody>
                        <tr className='text-center'>
                            <th className="border border-slate-600" colSpan={7}>بيانات المساهمين</th>
                        </tr>
                        <tr>
                            <th className="border text-center border-slate-600">اسم العضو</th>
                            <th className="border text-center border-slate-600">رصيده السابق</th>
                            <th className="border text-center border-slate-600">نسبة المساهمة</th>
                            <th className="border text-center border-slate-600">مبلغ المساهمة</th>
                            <th className="border text-center border-slate-600">مبلغ الربح</th>
                            <th className="border text-center border-slate-600" colSpan={2}>الرصيد</th>
                        </tr>
                        <tbody>
                            {
                                userContribution && userContribution.map((user) => {
                                    return (
                                        <tr>
                                            <td className="border text-center border-slate-600">{user.idUser.name}</td>
                                            <td className="border text-center border-slate-600">{user.previousBalance.toFixed(2)}</td>
                                            <td className="border text-center border-slate-600">{user.contributionPercentage.toFixed(2)}%</td>
                                            <td className="border text-center border-slate-600">{user.contributionAmount.toFixed(2)}</td>
                                            <td className="border text-center border-slate-600">{user.profitAmount.toFixed(2)}</td>
                                            <td className="border text-center border-slate-600" colSpan={3}>{user.balance.toFixed(2)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    }
                </div>
            }
        </div>
    )
}

export default FormContribution