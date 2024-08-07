import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCommodityRevenueFetch } from '../../../../utils/apiFetch'
import AddNoteGoodsRevenueRecord from '../../../modals/addNoteGoodsRevenueRecord'

function GoodsRevenueRecord() {
    const navigate = useNavigate();
    const [commodityRevenue, setCommodityRevenue] = useState(false);
    const [saleAmount, setSaleAmount] = useState(false);
    const [profitAmount, setProfitAmount] = useState(false);
    const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        _id: "",
        comment: ""
    })
    useEffect(() => {
        setLoading((e) => !e)
        getAllCommodityRevenueFetch().then((res) => {
            console.log(res)
            setLoading((e) => !e)
            setCommodityRevenue(res.data.commodityRevenue);
            setSaleAmount(res.data.saleAmount);
            setProfitAmount(res.data.profitAmount);
            setNumberOfBeneficiaries(res.data.numberOfBeneficiaries)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e)
        })
    }, [])
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/commodityRevenue/" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">
                سجل إيرادات السلع
            </h1>
            {
                !loading ? "" : <div className="mt-[1rem] flex sm:flex-row flex-col gap-[1rem] justify-center">
                    <div className="flex sm:flex-col items-center justify-center gap-[1rem]">
                        <h1 className="md:text-[1.1rem] sm:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي مبلغ إيرادات السلع</h1>
                        <h1 className="md:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{saleAmount}</h1>
                    </div>
                    <div className="flex sm:flex-col items-center justify-center gap-[1rem]">
                        <h1 className="md:text-[1.1rem] sm:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي الارباح</h1>
                        <h1 className="md:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{profitAmount}</h1>
                    </div>
                    <div className="flex sm:flex-col items-center justify-center gap-[1rem]">
                        <h1 className="md:text-[1.1rem] sm:w-auto w-[90%] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">عدد المستفيدين</h1>
                        <h1 className="md:text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{numberOfBeneficiaries}</h1>
                    </div>
                </div>
            }
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[1rem]">
                    {
                        commodityRevenue && commodityRevenue.map((commodity) => {
                            return (
                                <table className="text-[1rem] table border-separate border-spacing-2 border w-[2500px] mx-auto">
                                    <tr>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            رقم الطلب
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            اسم العميل
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            مبلغ الشراء
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            مبلغ البيع
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            مبلغ الربح
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            عدد الاقساط
                                        </th>
                                        <th colSpan={2} className="border text-center border-slate-600">
                                            تاريخ بدء السداد
                                        </th>
                                        <th colSpan={2} className="border text-center border-slate-600">
                                            تاريخ انتهاء السداد
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            ملاحظات
                                        </th>
                                        <th className="border text-center border-slate-600" rowSpan={2}>
                                            تفاصيل اكثر
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="border text-center border-slate-600">الميلادي</th>
                                        <th className="border text-center border-slate-600">الهجري</th>
                                        <th className="border text-center border-slate-600">الميلادي</th>
                                        <th className="border text-center border-slate-600">الهجري</th>
                                    </tr>
                                    <tbody>
                                        <tr>
                                            <td className="border text-center border-slate-600">{commodity.id}</td>
                                            <td className="border text-center border-slate-600">{commodity.customerData.name}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.purchaseAmount}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.saleAmount}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.profitAmount}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.numberOfInstallments}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.dateOfPayment}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.dateOfPaymentHijri.year}-{commodity.commodityData.dateOfPaymentHijri.month.number}-{commodity.commodityData.dateOfPaymentHijri.day}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.paymentExpiryDate}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.paymentExpiryDateHijri.year}-{commodity.commodityData.paymentExpiryDateHijri.month.number}-{commodity.commodityData.paymentExpiryDateHijri.day}</td>
                                            <td onClick={() => {
                                                setInputs({
                                                    _id: commodity._id,
                                                    comment: ""
                                                })
                                                document.getElementById('addNote').showModal()
                                            }} id={commodity._id} className="border text-center border-slate-600">
                                                {commodity.comments}
                                            </td>
                                            <td className="border text-center border-slate-600">
                                                <Link to={"/commodityRevenue/installmentSchedule?id=" + commodity._id} className='btn btn-info'>التفاصيل</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })
                    }
                </div>
            }
            <AddNoteGoodsRevenueRecord inputs={inputs} setInputs={setInputs} />
        </div>
    )
}

export default GoodsRevenueRecord