import React, { useEffect, useState } from 'react'
import { getCommodityRevenueFetch } from '../../../utils/apiFetch';
import { useLocation, useNavigate } from 'react-router-dom';


function CommodityPurchase() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [commodityRevenu, setCommodityRevenu] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        setLoading((e) => !e)
        getCommodityRevenueFetch(query.get("id")).then((res) => {
            if(!res.data.print){
                alert("ليس لديك الاذن طباعة طلب شراء سلعة")
                navigate("/commodityRevenue/commodityPurchaseOrderForm")
            }
            setLoading((e) => !e)
            setCommodityRevenu(res.data.commodityRevenue);
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
                        commodityRevenu && <table className="text-[1rem] table border-separate border-spacing-2 border  mx-auto">
                            <tr className='text-center'>
                                <th className="border text-center border-slate-600" colSpan={8}>بيانات العميل</th>
                            </tr>
                            <tr>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    رقم الطلب
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    اسم العميل
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    الوظيفة
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    رقم الهوية
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    رقم الجوال
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    المنطقة
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2} colSpan={2}>
                                    العنوان
                                </th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu._id}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.customerData.name}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.customerData.job}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.customerData.nationalIdentificationNumber}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.customerData.phoneNumber}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.customerData.region}</td>
                                    <td rowSpan={2} colSpan={2} className="border text-center border-slate-600">{commodityRevenu.customerData.address}</td>
                                </tr>
                            </tbody>
                            <tr className='text-center'>
                                <th className="border border-slate-600" colSpan={8}>بيانات العميل (العضو المشرف على شراء السلعة)</th>
                            </tr>
                            <tr>
                                <th colSpan={2} className="border text-center border-slate-600" rowSpan={2}>
                                    اسم الكفيل
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    رقم الهوية
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    رقم الجوال
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    المنطقة
                                </th>
                                <th className="border text-center border-slate-600" colSpan={3} rowSpan={2}>
                                    العنوان
                                </th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td colSpan={2} rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.sponsorData.name}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.sponsorData.nationalIdentificationNumber}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.sponsorData.phoneNumber}</td>
                                    <td rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.sponsorData.region}</td>
                                    <td colSpan={3} rowSpan={2} className="border text-center border-slate-600">{commodityRevenu.sponsorData.address}</td>
                                </tr>
                            </tbody>
                            <tr className='text-center'>
                                <th className="border border-slate-600" colSpan={8}>بيانات السلعة</th>
                            </tr>
                            <tr>
                                <th colSpan={2} className="border text-center border-slate-600" rowSpan={2}>
                                    نوع السلعة
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    مبلغ الشراء
                                </th>
                                <th colSpan={2} className="border text-center border-slate-600">
                                    تاريخ الشراء
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    المبلغ المسدد
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2} colSpan={2}>
                                    مبلغ البيع
                                </th>
                            </tr>
                            <tr>
                                <th className="border text-center border-slate-600">الميلادي</th>
                                <th className="border text-center border-slate-600">الهجري</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td colSpan={2} className="border text-center border-slate-600">{commodityRevenu.commodityData.itemType}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.purchaseAmount}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.dateOfPurchase}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.dateOfPurchaseHijri.year}-{commodityRevenu.commodityData.dateOfPurchaseHijri.month.number}-{commodityRevenu.commodityData.dateOfPurchaseHijri.day}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.amountPaid}</td>
                                    <td className="border text-center border-slate-600" colSpan={2}>{commodityRevenu.commodityData.saleAmount}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} className="border text-center border-slate-600">
                                        تاريخ البيع
                                    </th>
                                    <th colSpan={2} className="border text-center border-slate-600">
                                        تاريخ بدء السداد
                                    </th>
                                    <th colSpan={2} className="border text-center border-slate-600">
                                        تاريخ انتهاء السداد
                                    </th>
                                    <th rowSpan={2} className="border text-center border-slate-600">
                                        مبلغ القسط
                                    </th>
                                    <th rowSpan={2} className="border text-center border-slate-600">
                                        عدد الاقساط
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border text-center border-slate-600">الميلادي</th>
                                    <th className="border text-center border-slate-600">الهجري</th>
                                    <th className="border text-center border-slate-600">الميلادي</th>
                                    <th className="border text-center border-slate-600">الهجري</th>
                                    <th className="border text-center border-slate-600">الميلادي</th>
                                    <th className="border text-center border-slate-600">الهجري</th>
                                </tr>
                                <tr>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.saleDate}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.saleDateHijri.year}-{commodityRevenu.commodityData.saleDateHijri.month.number}-{commodityRevenu.commodityData.saleDateHijri.day}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.dateOfPayment}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.dateOfPaymentHijri.year}-{commodityRevenu.commodityData.dateOfPaymentHijri.month.number}-{commodityRevenu.commodityData.dateOfPaymentHijri.day}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.paymentExpiryDate}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.paymentExpiryDateHijri.year}-{commodityRevenu.commodityData.paymentExpiryDateHijri.month.number}-{commodityRevenu.commodityData.paymentExpiryDateHijri.day}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.premiumAmount}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.numberOfInstallments}</td>
                                </tr>
                            </tbody>
                            <tr className='text-center'>
                                <th className="border border-slate-600" colSpan={8}>بيانات الصندوق</th>
                            </tr>
                            <tr>
                                <th className="border text-center border-slate-600">الرصيد السابق لصندوق</th>
                                <th className="border text-center border-slate-600">مبلغ المساهمة</th>
                                <th className="border text-center border-slate-600">نسبة المساهمة</th>
                                <th className="border text-center border-slate-600">نسبة الربح</th>
                                <th className="border text-center border-slate-600">مبلغ الربح</th>
                                <th className="border text-center border-slate-600" colSpan={3}>الرصيد</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.currentBalanceFund}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.contributionAmount}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.contributionPercentage.toFixed(2)}%</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.profitRatio}%</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.profitAmount}</td>
                                    <td className="border text-center border-slate-600" colSpan={3}>{commodityRevenu.commodityData.balance}</td>
                                </tr>
                            </tbody>
                        </table>
                    }

                </div>
            }
        </div>
    )
}

export default CommodityPurchase