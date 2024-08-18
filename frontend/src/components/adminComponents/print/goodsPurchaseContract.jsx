import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCommodityRevenueFetch } from '../../../utils/apiFetch';
// Import your print-specific CSS

const GoodsPurchaseContract = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [commodityRevenu, setCommodityRevenu] = useState(false);
    useEffect(() => {
        getCommodityRevenueFetch(query.get("id")).then((res) => {
            setCommodityRevenu(res.data.commodityRevenue);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    useEffect(() => {
        if(!commodityRevenu) return;

        window.print();
    }, [commodityRevenu]);

    return (
        <div className="contract-container">
            {
                commodityRevenu &&  <div className="contract-content">
                <div className="text-center mb-[2rem]">
                    <h1 className="text-[4rem] font-semibold">بسم الله الرحمن الرحيم</h1>
                    <h2 className="text-[3rem] font-semibold mt-2">نموذج عقد بيع بالتقسيط</h2>
                    <h3 className="text-[3rem] font-semibold mt-2"> رقم العقد {commodityRevenu.id}</h3>
                </div>

                <p className="text-center mb-[1rem] text-lg">
                    في تاريخ <span className="border-b border-gray-400 inline-block w-[6rem]">{new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCDate()}</span> هـ. الموافق <span className="border-b border-gray-400 inline-block w-[6rem]">{commodityRevenu.commodityData.dateOfPurchaseHijri.year}-{commodityRevenu.commodityData.dateOfPurchaseHijri.month.number}-{commodityRevenu.commodityData.dateOfPurchaseHijri.day}</span> م. بمدينة  ( <span className="border-b border-gray-400 inline-block w-32">{commodityRevenu.sponsorData.region}</span> )
                </p>

                <p className="text-right mb-[1rem] text-lg">
                    تم الاتفاق بين كل من: 
                </p>

                <ul className="list-disc pr-4 text-right mb-[1rem] text-lg">
                    <li>الطرف الأول : {commodityRevenu.sponsorData.name}</li>
                    <li> مشتري السلعة :{commodityRevenu.customerData.name}</li>
                </ul>

                <h3 className="text-right text-xl font-semibold mb-[1rem]">نص العقد :</h3>
                <p className="text-right mb-4 text-lg">
                    اتفق كل من الطرفين الموضحة بياناتهما أعلاه على شراء الطرف الثاني من الطرف الأول السلعة / السلع التالية:
                </p>

                <div className="text-right mb-[1rem] text-lg">
                    <p className="mb-1">نوعها: <span className="border-b border-gray-400 text-center inline-block w-64">{commodityRevenu.commodityData.itemType}</span></p>
                    <p className="mb-1">قيمتها: <span className="border-b border-gray-400 text-center inline-block w-[6rem]">{commodityRevenu.commodityData.purchaseAmount.toFixed(2)}</span> ريال ، يسدد منها (الدفعة اولى أن وجدت)مبلغاً قدره (<span className="border-b border-gray-400 text-center inline-block w-[6rem]">{commodityRevenu.commodityData.amountPaid.toFixed(2)}</span>)  ريال ، والمبلغ المتبقي قدره (<span className="border-b border-gray-400 text-center inline-block w-[6rem]">{(commodityRevenu.commodityData.purchaseAmount - commodityRevenu.commodityData.amountPaid).toFixed(2)}</span>) ريال يسدد على عدد (<span className="border-b border-gray-400 text-center inline-block w-[6rem]">{commodityRevenu.commodityData.numberOfInstallments}</span>) قسط / أقساط ، تكون كالتالي : </p>
                </div>
                <div className="text-right mb-[1rem] text-lg">
                    <p className='mb-1'> القسط الاول مبلغاً قدره ({commodityRevenu.commodityData.premiumAmount.toFixed(2)}) ، يسدد بتاريخ : {new Date(commodityRevenu.commodityData.dateOfPayment).getUTCDate() + "-" + (new Date(commodityRevenu.commodityData.dateOfPayment).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPayment).getUTCFullYear()} مـ الموافق : {commodityRevenu.commodityData.dateOfPaymentHijri.day}-{commodityRevenu.commodityData.dateOfPaymentHijri.month.number}-{commodityRevenu.commodityData.dateOfPaymentHijri.year} ه</p>
                </div>
                <p className="text-right mb-[1rem] text-lg">
                وبقية الاقساط عددها ({commodityRevenu.commodityData.numberOfInstallments - 1}) قسط / أقساط . 
                </p>
                <p className="text-right mb-[1rem] text-lg">
                تسدد على أقساط شهرية بمبلغ قدره ({commodityRevenu.commodityData.premiumAmount.toFixed(2)}) ريال ابتداءً  :
                </p>
                <p className="text-center mb-[1rem] text-lg">
                    في تاريخ :<span className="border-b border-gray-400 inline-block w-32">{new Date(commodityRevenu.commodityData.dateOfPayment).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPayment).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPayment).getUTCDate()}</span> هـ. الموافق <span className="border-b border-gray-400 inline-block w-32">{commodityRevenu.commodityData.dateOfPaymentHijri.year}-{commodityRevenu.commodityData.dateOfPaymentHijri.month.number}-{commodityRevenu.commodityData.dateOfPaymentHijri.day}</span> 
                </p>
                <p className="text-center mb-[1rem] text-lg">
                وحتى تاريخ :<span className="border-b border-gray-400 inline-block w-32">{new Date(commodityRevenu.commodityData.paymentExpiryDate).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.paymentExpiryDate).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.paymentExpiryDate).getUTCDate()}</span> هـ. الموافق <span className="border-b border-gray-400 inline-block w-32">{commodityRevenu.commodityData.paymentExpiryDateHijri.year}-{commodityRevenu.commodityData.paymentExpiryDateHijri.month.number}-{commodityRevenu.commodityData.paymentExpiryDateHijri.day}</span> 
                </p>
                <p className="text-center mb-[1rem] text-lg">
                حسب جدول الاقساط الموضح أدناه : 
                </p>
                <table className="table-auto w-full border border-gray-300 mt-4 mb-2 text-lg">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-center">الطرف</th>
                            <th className="border border-gray-300 p-2 text-center">الاسم</th>
                            <th className="border border-gray-300 p-2 text-center">التوقيع</th>
                            <th className="border border-gray-300 p-2 text-center">التاريخ الميلادي</th>
                            <th className="border border-gray-300 p-2 text-center">التاريخ الهجري</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">الأول</td>
                            <td className="border border-gray-300 p-2 text-center">{commodityRevenu.sponsorData.name}</td>
                            <td className="border border-gray-300 p-2 text-center">..............</td>
                            <td className="border border-gray-300 p-2 text-center">{new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCDate()}</td>
                            <td className="border border-gray-300 p-2 text-center">{commodityRevenu.commodityData.dateOfPurchaseHijri.year}-{commodityRevenu.commodityData.dateOfPurchaseHijri.month.number}-{commodityRevenu.commodityData.dateOfPurchaseHijri.day}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center">الثاني</td>
                            <td className="border border-gray-300 p-2 text-center">{commodityRevenu.customerData.name}</td>
                            <td className="border border-gray-300 p-2 text-center">..............</td>
                            <td className="border border-gray-300 p-2 text-center">{new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCDate()}</td>
                            <td className="border border-gray-300 p-2 text-center">{commodityRevenu.commodityData.dateOfPurchaseHijri.year}-{commodityRevenu.commodityData.dateOfPurchaseHijri.month.number}-{commodityRevenu.commodityData.dateOfPurchaseHijri.day}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default GoodsPurchaseContract;
