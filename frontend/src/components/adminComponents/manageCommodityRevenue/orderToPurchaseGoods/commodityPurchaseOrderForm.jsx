import { faPrint, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../../utils/getHijriDate';
import { getCommodityRevenueFetch, getIdCommodityRevenueFetch } from '../../../../utils/apiFetch';

function CommodityPurchaseOrderForm() {
    const navigate = useNavigate();
    const [date, setDate] = useState(hijriDateObject());
    const [yearOptions, setYearOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        month: date[1].number,
        year: date[2],
    });
    const [id, setId] = useState("");
    const [idList, setIdList] = useState([]);
    const [commodityRevenu, setCommodityRevenu] = useState(false);
    const generateYear = () => {
        const years = [];
        for (let i = 1415; i <= inputs.year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };
    useEffect(() => {
        generateYear();
    }, []);

    useEffect(() => {
        getIdCommodityRevenueFetch(inputs).then((res) => {
            setIdList(res.data.commodityRevenue);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [inputs]);
    const handleSearch = () => {
        setLoading((e) => !e)
        getCommodityRevenueFetch(id).then((res) => {
            setLoading((e) => !e)
            setCommodityRevenu(res.data.commodityRevenue);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/commodityRevenue" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج طلب شراء سلعة
            </h1>
            <div className="md:join ">
                <select onChange={(event) => {
                    setInputs((prevInput) => {
                        return { ...prevInput, year: event.target.value }
                    });
                }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    {yearOptions.map((value) => (
                        <option key={value} value={value} selected={inputs.year === value}>
                            {value}
                        </option>
                    ))}
                </select>
                <select onChange={(event) => {
                    setInputs((prevInput) => {
                        return { ...prevInput, month: event.target.value }
                    });
                }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option value="1" selected={"1" == inputs.month}>محرم</option>
                    <option value="2" selected={"1" == inputs.month}>صفر</option>
                    <option value="3" selected={"3" == inputs.month}>ربيع الاول</option>
                    <option value="4" selected={"4" == inputs.month}>ربيع الثاني</option>
                    <option value="5" selected={"5" == inputs.month}>جمادى الاول</option>
                    <option value="6" selected={"6" == inputs.month}>جمادى الثاني</option>
                    <option value="7" selected={"7" == inputs.month}>رجب</option>
                    <option value="8" selected={"8" == inputs.month}>شعبان</option>
                    <option value="9" selected={"9" == inputs.month}>رمضان</option>
                    <option value="10" selected={"10" == inputs.month}>شوال</option>
                    <option value="11" selected={"11" == inputs.month}>ذو القعدة</option>
                    <option value="12" selected={"12" == inputs.month}>ذو الحجة</option>
                </select>
                <select onChange={(event) => {
                    setId(event.target.value);
                }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option selected disabled>قم باختيار العدد الخاص بنموذج شراء السلع</option>
                    {idList && idList.map((list) => (
                        <option value={list._id}>{list._id}</option>
                    ))}
                </select>
                <div className="indicator">
                    <button onClick={handleSearch} className="btn btn-primary join-item">ابحث</button>
                </div>
            </div>
            {
                commodityRevenu && <div>
                    <Link to={`/print/commodityPurchaseOrderForm?id=` + commodityRevenu._id} target='_blank' className='btn mt-[1rem] btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</Link>
                </div>
            }
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[1rem]">
                    {
                        commodityRevenu && <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
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
            {
                commodityRevenu && <h1 className='mt-[1rem] text-[1.1rem] font-bold'>للذهاب إلى جدول الأقساط <Link to={"/commodityRevenue/installmentSchedule?id=" + commodityRevenu._id} className='text-error'>اضغط هنا</Link></h1>

            }
        </div>
    )
}

export default CommodityPurchaseOrderForm