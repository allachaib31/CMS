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
            if(!res.data.print){
                alert("ليس لديك الاذن طباعة عقد شراء سلعة و أقساطها ")
                navigate("/commodityRevenue/commodityPurchaseOrderForm")
            }
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
                    <h1 className="text-[4rem] font-semibold text-center mb-[2rem]">بسم الله الرحمن الرحيم</h1>
                <div className="text-center mb-[2rem]">
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
                    <li>الطرف الأول : {commodityRevenu.sponsorData.name} (ممثل الصندوق)</li>
                    <li className='mt-[1rem]'>الطرف الثاني :{commodityRevenu.customerData.name} (مشتري السلعة)</li>
                </ul>

                <h3 className="text-center text-xl font-semibold mb-[1rem]">نص العقد</h3>
                <p className="text-right mb-4 text-lg">
                    اتفق كل من الطرفين الموضحة بياناتهما أعلاه على شراء الطرف الثاني من الطرف الأول السلعة / السلع التالية:
                </p>

                <div className="text-right mb-[1rem] text-lg">
                    <p>نوعها: <span className="border-b border-gray-400 text-center inline-block w-64">{commodityRevenu.commodityData.itemType}</span></p>
                    <p className="mt-[1rem]">قيمتها: <span className="border-b border-gray-400 text-center inline-block w-[3.5rem]">{commodityRevenu.commodityData.purchaseAmount.toFixed(2)}</span> ريال ، يسدد منها (الدفعة الأولى أن وجدت)مبلغاً قدره (<span className="border-b border-gray-400 text-center inline-block w-[4rem]">{commodityRevenu.commodityData.amountPaid.toFixed(2)}</span>)  ريال ، والمبلغ المتبقي قدره </p>
                    <p className='mt-[1rem]'>(<span className="border-b border-gray-400 text-center inline-block w-[4rem]">{(commodityRevenu.commodityData.purchaseAmount - commodityRevenu.commodityData.amountPaid).toFixed(2)}</span>) ريال يسدد على عدد (<span className="border-b border-gray-400 text-center inline-block w-[2rem]">{commodityRevenu.commodityData.numberOfInstallments}</span>) قسط / أقساط ، تكون كالتالي : </p>
                </div>
                <div className="text-right mb-[1rem] text-lg">
                    <p className='mt-[1rem]'> القسط الاول مبلغاً قدره ({commodityRevenu.commodityData.premiumAmount.toFixed(2)}) ريال ، يسدد بتاريخ : {new Date(commodityRevenu.commodityData.dateOfPayment).getUTCDate() + "-" + (new Date(commodityRevenu.commodityData.dateOfPayment).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPayment).getUTCFullYear()} / الموافق : {commodityRevenu.commodityData.dateOfPaymentHijri.day}-{commodityRevenu.commodityData.dateOfPaymentHijri.month.number}-{commodityRevenu.commodityData.dateOfPaymentHijri.year}</p>
                </div>
                <p className="text-right mb-[1rem] text-lg">
                وبقية الاقساط عددها ({commodityRevenu.commodityData.numberOfInstallments - 1}) قسط / أقساط . 
                </p>
                <p className="text-right mb-[1rem] text-lg">
                تسدد على أقساط شهرية بمبلغ قدره ({commodityRevenu.commodityData.premiumAmount.toFixed(2)}) ريال ابتداءً  :
                </p>
                <p className="text-center mb-[1rem] text-lg">
                من تاريخ :<span className="border-b border-gray-400 inline-block w-32">{new Date(commodityRevenu.commodityData.dateOfPayment).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPayment).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPayment).getUTCDate()}</span> الموافق <span className="border-b border-gray-400 inline-block w-32">{commodityRevenu.commodityData.dateOfPaymentHijri.year}-{commodityRevenu.commodityData.dateOfPaymentHijri.month.number}-{commodityRevenu.commodityData.dateOfPaymentHijri.day}</span> 
                </p>
                <p className="text-center mb-[1rem] text-lg">
                وحتى تاريخ :<span className="border-b border-gray-400 inline-block w-32">{new Date(commodityRevenu.commodityData.paymentExpiryDate).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.paymentExpiryDate).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.paymentExpiryDate).getUTCDate()}</span>  الموافق <span className="border-b border-gray-400 inline-block w-32">{commodityRevenu.commodityData.paymentExpiryDateHijri.year}-{commodityRevenu.commodityData.paymentExpiryDateHijri.month.number}-{commodityRevenu.commodityData.paymentExpiryDateHijri.day}</span> 
                </p>
                <p className="text-center mb-[1rem] text-lg">
                حسب جدول الأقساط المرفق : 
                </p>
                <table className="table-auto w-full border border-gray-300 mt-4 mb-2">
                    <thead>
                        <tr>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">الطرف</td>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">الاسم</td>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">التوقيع</td>
                            <td className="border border-gray-300 py-[1rem] px-0 text-center">التاريخ الميلادي</td>
                            <td className="border border-gray-300 py-[1rem] px-0 text-center">التاريخ الهجري</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='py-[2rem]'>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">الأول</td>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">{commodityRevenu.sponsorData.name}</td>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">..............................</td>
                            <td className="border border-gray-300 py-[1rem] px-0 text-center">{new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCDate()}</td>
                            <td className="border border-gray-300 py-[1rem] px-0 text-center">{commodityRevenu.commodityData.dateOfPurchaseHijri.year}-{commodityRevenu.commodityData.dateOfPurchaseHijri.month.number}-{commodityRevenu.commodityData.dateOfPurchaseHijri.day}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">الثاني</td>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">{commodityRevenu.customerData.name}</td>
                            <td className="border border-gray-300 py-[1rem] px-2 text-center">..............................</td>
                            <td className="border border-gray-300 py-[1rem] px-0 text-center">{new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.dateOfPurchase).getUTCDate()}</td>
                            <td className="border border-gray-300 py-[1rem] px-0 text-center">{commodityRevenu.commodityData.dateOfPurchaseHijri.year}-{commodityRevenu.commodityData.dateOfPurchaseHijri.month.number}-{commodityRevenu.commodityData.dateOfPurchaseHijri.day}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default GoodsPurchaseContract;
