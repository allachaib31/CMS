import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCommodityRevenueFetch } from '../../../../utils/apiFetch';

function ContractsRegister() {
    const navigate = useNavigate();
    const [commodityRevenue, setCommodityRevenue] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading((e) => !e)
        getAllCommodityRevenueFetch().then((res) => {
            setLoading((e) => !e)
            setCommodityRevenue(res.data.commodityRevenue);
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
                سجل عقود السلع
            </h1>
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[1rem]">
                    <table className="text-[1rem] table border-separate border-spacing-2 border w-[1300px] mx-auto">
                        <tr>
                            <th className="border text-center border-slate-600" rowSpan={2}>
                                رقم  <br />العقد
                            </th>
                            <th className="border text-center border-slate-600" rowSpan={2}>اسم الطرف <br />الثاني</th>
                            <th className="border text-center border-slate-600">مبلغ العقد</th>
                            <th className="border text-center border-slate-600">نوع السلعة</th>
                            <th className="border text-center border-slate-600">انتهاء السداد بالميلادي</th>
                            <th className="border text-center border-slate-600">انتهاء السداد بالهجري</th>
                            <th className="border text-center border-slate-600">تفاصيل <br/> اكثر</th>
                        </tr>
                        <tbody>
                        {commodityRevenue && commodityRevenue.map((commodity) => {
                            const d = new Date(commodity.commodityData.paymentExpiryDate);
                            return (
                                <tr>
                                    <td className="border text-center border-slate-600">{commodity.id}</td>
                                    <td className="border text-center border-slate-600">{commodity.sponsorData.name}</td>
                                    <td className="border text-center border-slate-600">{commodity.commodityData.purchaseAmount}</td>
                                    <td className="border text-center border-slate-600">{commodity.commodityData.itemType}</td>
                                    <td className="border text-center border-slate-600">{d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate()}</td>
                                    <td className="border text-center border-slate-600">{commodity.commodityData.paymentExpiryDateHijri.year}-{commodity.commodityData.paymentExpiryDateHijri.month.number}-{commodity.commodityData.paymentExpiryDateHijri.day}</td>
                                    <td className="border text-center border-slate-600"><Link target='_blank' to={"/print/goodsPurchaseContract?id=" + commodity._id} className='btn btn-info'>تفاصيل <br/>اكثر </Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default ContractsRegister