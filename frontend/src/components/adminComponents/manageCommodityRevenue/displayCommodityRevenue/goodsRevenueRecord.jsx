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
                <Link to="/commodityRevenue/" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-sm font-bold py-[0.5rem]">
                سجل السلع
            </h1>
            {
                !loading ? "" : <div className="mt-[0.5rem] flex sm:flex-row flex-col gap-[0.5rem] justify-center">
                    <div className="flex sm:flex-col items-center justify-center gap-[0.5rem]">
                        <h1 className="text-xs w-[70%] sm:w-auto  font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي مبالغ إيرادات السلع</h1>
                        <h1 className="text-xs text-center w-[30%] sm:w-auto font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{saleAmount && saleAmount.toFixed(2)}</h1>
                    </div>
                    <div className="flex sm:flex-col items-center justify-center gap-[0.5rem]">
                        <h1 className="text-xs w-[70%] sm:w-auto font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">إجمالي الارباح</h1>
                        <h1 className="text-xs text-center w-[30%] sm:w-auto font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{profitAmount && profitAmount.toFixed(2)}</h1>
                    </div>
                    <div className="flex sm:flex-col items-center justify-center gap-[0.5rem]">
                        <h1 className="text-xs w-[70%] sm:w-auto font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">عدد المستفيدين</h1>
                        <h1 className="text-xs text-center w-[30%] sm:w-auto font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">{numberOfBeneficiaries && numberOfBeneficiaries.toFixed(2)}</h1>
                    </div>
                </div>
            }
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[0.5rem]">
                    <table className="text-xs table table-xs border-separate border-spacing-0 border w-[450px] md:w-[900px] mx-auto">
                        <tr className='text-[0.6rem] md:text-xs'>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                رقم <br/>الطلب
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                اسم <br/>العميل
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                مبلغ <br/>الشراء
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                مبلغ <br/>البيع
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                مبلغ <br/> الربح
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                عدد <br/>الاقساط
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
                                تفاصيل <br/>اكثر
                            </th>
                        </tr>
                        <tr className='text-[0.6rem] md:text-xs'>
                            <th className="border text-center border-slate-600">الميلادي</th>
                            <th className="border text-center border-slate-600">الهجري</th>
                            <th className="border text-center border-slate-600">الميلادي</th>
                            <th className="border text-center border-slate-600">الهجري</th>
                        </tr>
                        {
                            commodityRevenue && commodityRevenue.map((commodity) => {
                                const d = new Date(commodity.commodityData.dateOfPayment);
                                const d2 = new Date(commodity.commodityData.paymentExpiryDate);
                                return (
                                    <tbody>
                                        <tr className='text-xs'>
                                            <td className="border text-center border-slate-600">{commodity.id}</td>
                                            <td className="border text-center border-slate-600">{commodity.customerData.name}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.purchaseAmount}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.saleAmount}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.profitAmount}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.numberOfInstallments}</td>
                                            <td className="border text-center border-slate-600">{d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate()}</td>
                                            <td className="border text-center border-slate-600">{commodity.commodityData.dateOfPaymentHijri.year}-{commodity.commodityData.dateOfPaymentHijri.month.number}-{commodity.commodityData.dateOfPaymentHijri.day}</td>
                                            <td className="border text-center border-slate-600">{d2.getUTCFullYear() + "-" + (d2.getUTCMonth() + 1) + "-" + d2.getDate()}</td>
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
                                                <Link to={"/commodityRevenue/installmentSchedule?id=" + commodity._id} className='btn btn-xs btn-info'>التفاصيل</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>
            }
            <AddNoteGoodsRevenueRecord inputs={inputs} setInputs={setInputs} />
        </div>
    )
}

export default GoodsRevenueRecord