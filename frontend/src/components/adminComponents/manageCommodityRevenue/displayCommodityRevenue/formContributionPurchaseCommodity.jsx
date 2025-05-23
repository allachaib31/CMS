import { faPrint, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../../utils/getHijriDate';
import { getCommodityRevenueFetch, getFormContributionPurchaseCommodityFetch, getIdCommodityRevenueFetch } from '../../../../utils/apiFetch';

function FormContributionPurchaseCommodity() {
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
    const [userContribution, setUserContribution] = useState(false);
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
        getFormContributionPurchaseCommodityFetch(id).then((res) => {
            setLoading((e) => !e)
            setCommodityRevenu(res.data.commodityRevenue);
            setUserContribution(res.data.userContribution);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/commodityRevenue/" className="btn btn-sm btn-primary text-sm px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-sm font-bold py-[1rem]">
                نموذج المساهمة في شراء سلعة
            </h1>
            <div className=" container mx-auto ">
                <select onChange={(event) => {
                    setInputs((prevInput) => {
                        return { ...prevInput, year: event.target.value }
                    });
                }} className="select select-sm xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    {yearOptions.map((value) => (
                        <option key={value} value={value} selected={inputs.year == value}>
                            {value}
                        </option>
                    ))}
                </select>
                <select onChange={(event) => {
                    setInputs((prevInput) => {
                        return { ...prevInput, month: event.target.value }
                    });
                }} className="select select-sm xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option value="1" selected={"1" == inputs.month}>محرم</option>
                    <option value="2" selected={"2" == inputs.month}>صفر</option>
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
                }} className="select select-sm w-[8rem] xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option selected disabled>قم باختيار العدد الخاص بنموذج شراء السلع</option>
                    {idList && idList.map((list) => (
                        <option value={list._id}>{list.id}</option>
                    ))}
                </select>
                <div className="indicator">
                    <button onClick={handleSearch} className="btn btn-sm text-sm btn-primary join-item md:mt-[0rem] mt-[1rem]">ابحث</button>
                </div>
            </div>
            {
                commodityRevenu && <div className='container mx-auto'>
                    <Link to={`/print/formContribution?id=` + commodityRevenu._id} target='_blank' className='btn btn-sm mt-[0.5rem] btn-info font-bold'><FontAwesomeIcon icon={faPrint} /> طباعة</Link></div>
            }
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[0.5rem]">
                    {
                        commodityRevenu && <table className="text-xs table table-xs border-separate border-spacing-0 border w-[500px] md:w-[800px]  mx-auto">
                            <tr className='text-center text-xs'>
                                <th className="border text-center border-slate-600" colSpan={7}>البيانات: العميل \ سلعة \ الكفيل</th>
                            </tr>
                            <tr className='text-xs'>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    رقم <br/>الطلب
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    اسم <br/>العميل
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    نوع<br/> السلعة
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    مبلغ <br/>الشراء
                                </th>
                                <th className="border text-center border-slate-600" rowSpan={2}>
                                    مبلغ <br/>البيع
                                </th>
                                <th className="border text-center border-slate-600" colSpan={2}>
                                    تاريخ <br/>البيع
                                </th>
                            </tr>
                            <tr className='text-xs'>
                                <th className="border text-center border-slate-600">الميلادي</th>
                                <th className="border text-center border-slate-600">الهجري</th>
                            </tr>
                            <tbody>
                                <tr className='text-xs'>
                                    <td className="border text-center border-slate-600">{commodityRevenu.id}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.customerData.name}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.itemType}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.purchaseAmount.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.saleAmount.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{new Date(commodityRevenu.commodityData.saleDate).getUTCFullYear() + "-" + (new Date(commodityRevenu.commodityData.saleDate).getUTCMonth() + 1) + "-" + new Date(commodityRevenu.commodityData.saleDate).getUTCDate()}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.saleDateHijri.year}-{commodityRevenu.commodityData.saleDateHijri.month.number}-{commodityRevenu.commodityData.saleDateHijri.day}</td>
                                </tr>
                            </tbody>
                            <tr className='text-xs'>
                                <th className="border text-center border-slate-600" colSpan={3}>
                                    اسم <br/>الكفيل
                                </th>
                                <th className="border text-center border-slate-600" colSpan={2}>
                                    نسبة<br/> الكفيل
                                </th>
                                <th className="border text-center border-slate-600" colSpan={2}>
                                    مبلغ<br/> نسبته
                                </th>
                            </tr>
                            <tbody>
                                <tr className='text-xs'>
                                    <td className="border text-center border-slate-600" colSpan={3}>{commodityRevenu.sponsorData.name}</td>
                                    <td className="border text-center border-slate-600" colSpan={2}>{commodityRevenu.sponsorData.sponsorRatio}%</td>
                                    <td className="border text-center border-slate-600" colSpan={2}>{commodityRevenu.sponsorData.amount.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            <tr className='text-center text-xs'>
                                <th className="border border-slate-600" colSpan={7}>بيانات الصندوق</th>
                            </tr>
                            <tr className='text-xs'>
                                <th className="border text-center border-slate-600">الرصيد السابق<br/> لصندوق</th>
                                <th className="border text-center border-slate-600">مبلغ <br/>المساهمة</th>
                                <th className="border text-center border-slate-600">نسبة <br/>المساهمة</th>
                                <th className="border text-center border-slate-600">نسبة <br/>الربح</th>
                                <th className="border text-center border-slate-600">مبلغ <br/>الربح</th>
                                <th className="border text-center border-slate-600" colSpan={2}>الرصيد</th>
                            </tr>
                            <tbody>
                                <tr className='text-xs'>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.currentBalanceFund.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.contributionAmount.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.contributionPercentage.toFixed(2)}%</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.profitRatio.toFixed(2)}%</td>
                                    <td className="border text-center border-slate-600">{commodityRevenu.commodityData.profitAmount.toFixed(2)}</td>
                                    <td className="border text-center border-slate-600" colSpan={3}>{commodityRevenu.commodityData.balance.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            <tr className='text-center text-xs'>
                                <th className="border border-slate-600" colSpan={7}>بيانات المساهمين</th>
                            </tr>
                            <tr className='text-xs'>
                                <th className="border text-center border-slate-600">اسم <br/>العضو</th>
                                <th className="border text-center border-slate-600">رصيده<br/> السابق</th>
                                <th className="border text-center border-slate-600">نسبة <br/>المساهمة</th>
                                <th className="border text-center border-slate-600">مبلغ<br/> المساهمة</th>
                                <th className="border text-center border-slate-600">مبلغ <br/>الربح</th>
                                <th className="border text-center border-slate-600" colSpan={2}>الرصيد</th>
                            </tr>
                            <tbody>
                                {
                                    userContribution && userContribution.map((user) => {
                                        return (
                                            <tr className='text-xs'>
                                                <td className="border text-center border-slate-600">{user.idUser.name}</td>
                                                <td className="border text-center border-slate-600">{user.previousBalance.toFixed(2)}</td>
                                                <td className="border text-center border-slate-600">{user.contributionPercentage.toFixed(2)}%</td>
                                                <td className="border text-center border-slate-600">{user.contributionAmount.toFixed(2)}</td>
                                                <td className="border text-center border-slate-600">{user.profitAmount.toFixed(2)}</td>
                                                <td className="border text-center border-slate-600" colSpan={3}>{(user.profitAmount + user.previousBalance).toFixed(2)}</td>
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

export default FormContributionPurchaseCommodity