import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { addAdditionalStockFetch, currentPriceFetch, getIdStockFetch, getStockFetch, sellStockFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function DisplayStocksContributionForm() {
    const navigate = useNavigate();
    const [date, setDate] = useState(hijriDateObject());
    const [yearOptions, setYearOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        month: date[1].number,
        year: date[2],
    });
    const [additionalStock, setAdditionalStock] = useState({
        addFreeStock: 0,
        idStock: ""
    })
    const [currentPrice, setCurrentPrice] = useState({
        idStock: "",
        price: 0
    })
    const [id, setId] = useState("");
    const [idList, setIdList] = useState([]);
    const [stock, setStock] = useState(false);
    const [userStock, setUserStock] = useState(false);
    const generateYear = () => {
        const years = [];
        for (let i = 1415; i <= inputs.year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const [submit, setSubmit] = useState(false);
    useEffect(() => {
        getIdStockFetch(inputs).then((res) => {
            setIdList(res.data.stock);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [inputs])
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addAdditionalStockFetch(additionalStock).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setStock(res.data.stocks);
            //setUserStock(res.data.userStock)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleSell = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        sellStockFetch({
            idStock: id
        }).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setStock(res.data.stocks);
            setUserStock(res.data.userStock)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleCurrentPrice = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        currentPriceFetch(currentPrice).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setStock(res.data.stocks);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleSearch = () => {
        setLoading((e) => !e)
        getStockFetch(id).then((res) => {
            setLoading((e) => !e)
            setStock(res.data.stock);
            setUserStock(res.data.userStock)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }
    useEffect(() => {
        generateYear();
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='sm:container sm:mx-auto'>
                <div>
                    <Link to="/stocks" className="btn btn-sm btn-primary px-[2rem]">
                        <FontAwesomeIcon icon={faRightLong} />
                    </Link>
                </div>
                <h1 className="text-center text-sm font-bold py-[0.5rem]">
                    نموذج المساهمة في شراء الأسهم
                </h1>
                <div className="md:join ">
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
                        setAdditionalStock({
                            buyAdditionalStock: 0,
                            additionalStockCost: 0,
                            idStock: event.target.value
                        })
                        setCurrentPrice({
                            price: 0,
                            idStock: event.target.value
                        })
                    }} className="select select-sm w-[7rem] xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                        <option selected disabled>قم باختيار العدد الخاص بالاسهم</option>
                        {idList && idList.map((list) => (
                            <option value={list._id}>{list.id}</option>
                        ))}
                    </select>
                    <div className="indicator">
                        <button onClick={handleSearch} className="btn btn-sm btn-primary join-item  md:mt-[0rem] mt-[1rem]">ابحث</button>
                    </div>
                </div>
            </div>
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[0.5rem]">
                    {
                        stock && <>
                            <table className="text-xs table table-xs border-separate border-spacing-0 border w-[450px] md:w-[900px] mx-auto">
                                <tr className='text-center text-xs'>
                                    <th className="border text-center border-slate-600" colSpan={6}>بيانات المساهمة</th>
                                </tr>
                                <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        رقم المساهمة
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        اسم الجهة المساهم فيها
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        اسم البنك المساهم عن طريقه
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        عدد الأسهم
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة السهم
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        إجمالي تكلفة الأسهم
                                    </th>
                                </tr>
                                <tbody>
                                    <tr className='text-xs'>
                                        <td className="border text-center border-slate-600">{stock.id}</td>
                                        <td className="border text-center border-slate-600">{stock.nameContributingParty}</td>
                                        <td className="border text-center border-slate-600">{stock.nameContributingBank}</td>
                                        <td className="border text-center border-slate-600">{stock.numberStocks}</td>
                                        <td className="border text-center border-slate-600">{stock.costStocks.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600">{stock.totalCostStocks.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                                <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تاريخ المساهمة بالميلادي
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تاريخ المساهمة بالهجري
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        الاسهم المجانية
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        عدد الاسهم السابقة مع الاسهم المجانية
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة السهم سابقا مع السهم المجاني
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة الاسهم السابقة مع الاسهم المجانية
                                    </th>
                                </tr>
                                <tbody>
                                    <tr className='text-xs'>
                                        <td className="border text-center border-slate-600">{new Date(stock.contributionDateMiladi).getUTCFullYear() + "-" + (new Date(stock.contributionDateMiladi).getUTCMonth() + 1) + "-" + new Date(stock.contributionDateMiladi).getUTCDate()}</td>
                                        <td className="border text-center border-slate-600">{stock.contributionDateHijri && stock.contributionDateHijri.year + "-" + stock.contributionDateHijri.month.number + "-" + stock.contributionDateHijri.day}</td>
                                        <td className="border text-center border-slate-600">{stock.freeStocks}</td>
                                        <td className="border text-center border-slate-600">{stock.numberOfPreviousStockWithFreeStock}</td>
                                        <td className="border text-center border-slate-600">{stock.previousStockCostWithFreeShare.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600">{stock.previousCostOfStockWithFreeStock.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='container mx-auto my-[1rem] flex gap-[0.5rem] pr-[2rem]'>
                                <button className='btn btn-sm btn-primary' onClick={() => document.getElementById('my_modal_1').showModal()}>اضافة اسهم مجانية</button>
                                <button className='btn btn-sm btn-success' onClick={() => {
                                    document.getElementById('sell').showModal()
                                }}>{submit ? <span className="loading loading-ring loading-lg"></span> : "بيع"}</button>
                            </div>
                            <table className="text-xs table table-xs border-separate border-spacing-0 border w-[450px] md:w-[900px] mx-auto">
                            {/*    <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        شراء أسهم إضافية
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة السهم الإضافي
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة الأسهم الإضافية
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة السهم سابقاً مع السهم الإضافي
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تكلفة الاسهم السابقة مع الاسهم الاضافية
                                    </th>
                                    <th colSpan={2} className="border text-center border-slate-600" rowSpan={2}>
                                        إجمالي عدد الأسهم
                                    </th>
                                    <th colSpan={2} className="border text-center border-slate-600" rowSpan={2}>
                                        القيمة الحالية للسهم
                                    </th>
                                </tr>
                                <tbody>
                                    <tr className='text-xs'>
                                        <td className="border text-center border-slate-600">{stock.buyAdditionalStock}</td>
                                        <td className="border text-center border-slate-600">{stock.additionalStockCost.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600">{stock.additionalStocksCost.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600">{stock.previousStockCostWithAdditionalStock.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600">{stock.costPreviousSharesWithAdditionalShares.toFixed(2)}</td>
                                        <td colSpan={2} className="border text-center border-slate-600">{stock.totalNumberOfStock.toFixed(2)}</td>
                                        <td colSpan={2} className="border text-center border-slate-600" onClick={() => {
                                            document.getElementById('currentPrice').showModal()
                                        }}>{stock.currentValueOfStock.toFixed(2)}</td>
                                    </tr>
                                </tbody>*/}
                                <tr className='text-xs'>
                                    <th colSpan={4} className="border text-center border-slate-600" rowSpan={2}>
                                        إجمالي عدد الأسهم
                                    </th>
                                    <th colSpan={4} className="border text-center border-slate-600" rowSpan={2}>
                                        القيمة الحالية للسهم
                                    </th>
                                </tr>
                                <tbody>
                                <td colSpan={4} className="border text-center border-slate-600">{stock.totalNumberOfStock.toFixed(2)}</td>
                                        <td colSpan={4} className="border text-center border-slate-600" onClick={() => {
                                            document.getElementById('currentPrice').showModal()
                                        }}>{stock.currentValueOfStock.toFixed(2)}</td>
                                </tbody>
                                <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        اجمالي تكلفة الاسهم
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        الربح - الخسارة
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        نسبة: الربح - الخسارة
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        قيمة بيع الاسهم
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تاريخ البيع بالميلادي
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        تاريخ البيع بالهجري
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        الربح - الخسارة
                                    </th>
                                    <th className="border text-center border-slate-600" rowSpan={2}>
                                        نسبة: الربح - الخسارة
                                    </th>
                                </tr>
                                <tbody>
                                    {/**stock.additionalStocksCost + stock.previousCostOfStockWithFreeStock => ((stock.totalCostOfStock.toFixed(2) - (0 + 3690.00)) / (0 + 3690.00)) * 100 */}
                                    <tr className='text-xs'>
                                        <td className="border text-center border-slate-600">{stock.totalCostOfStock.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" style={{
                                            color: ((stock.currentValueOfStock * stock.totalNumberOfStock) - (stock.totalCostOfStock)) > 0 ? "green" : "red"
                                        }}>{((stock.currentValueOfStock * stock.totalNumberOfStock) - (stock.totalCostOfStock)).toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" style={{
                                            color: ((stock.currentValueOfStock * stock.totalNumberOfStock) - (stock.totalCostOfStock)) > 0 ? "green" : "red"
                                        }}>{((((stock.currentValueOfStock * stock.totalNumberOfStock) - (stock.totalCostOfStock)) / stock.totalCostOfStock) * 100).toFixed(2)}%</td>
                                        <td className="border text-center border-slate-600">{stock.stockSaleValue}</td>
                                        <td className="border text-center border-slate-600">{stock.dateSaleMiladi && new Date(stock.dateSaleMiladi).getUTCFullYear() + "-" + (new Date(stock.dateSaleMiladi).getUTCMonth() + 1) + "-" + new Date(stock.dateSaleMiladi).getUTCDate()}</td>
                                        <td className="border text-center border-slate-600">{stock.dateSaleHijri && stock.dateSaleHijri.year + "-" + stock.dateSaleHijri.month.number + "-" + stock.dateSaleHijri.day}</td>
                                        <td className="border text-center border-slate-600" style={{
                                            color: (stock.stockSaleValue - (stock.additionalStocksCost + stock.previousCostOfStockWithFreeStock)) > 0 ? "green" : "red"
                                        }}>{stock.stockSaleValue == 0 ? "" : (stock.stockSaleValue - (stock.additionalStocksCost + stock.previousCostOfStockWithFreeStock)).toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" style={{
                                            color: (stock.stockSaleValue - (stock.additionalStocksCost + stock.previousCostOfStockWithFreeStock)) > 0 ? "green" : "red"
                                        }}>{stock.stockSaleValue == 0 ? "" : (((stock.stockSaleValue - (stock.additionalStocksCost + stock.previousCostOfStockWithFreeStock)) / (stock.additionalStocksCost + stock.previousCostOfStockWithFreeStock)) * 100).toFixed(2) + "%"}</td>
                                    </tr>
                                </tbody>
                                <tr className='text-center text-xs'>
                                    <th className="border border-slate-600" colSpan={8}>بيانات العضو المساهم باسم صندوق</th>
                                </tr>
                                <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" colSpan={3}>اسم العضو</th>
                                    <th className="border text-center border-slate-600" colSpan={3}>نسبته من الربح</th>
                                    <th className="border text-center border-slate-600" colSpan={2}>مبلغ نسبته من الربح</th>
                                </tr>
                                <tbody>
                                    <tr className='text-xs'>
                                        <td className="border text-center border-slate-600" colSpan={3}>{stock.memberId.name}</td>
                                        <td className="border text-center border-slate-600" colSpan={3}>{stock.memberPercentage.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" colSpan={2}>{stock.amountPercentage.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                                <tr className='text-center text-xs'>
                                    <th className="border border-slate-600" colSpan={8}>بيانات الصندوق</th>
                                </tr>
                                <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" >الرصيد السابق لصندوق</th>
                                    <th className="border text-center border-slate-600" >مبلغ المساهمة</th>
                                    <th className="border text-center border-slate-600" >نسبة المساهمة</th>
                                    <th className="border text-center border-slate-600" >نسبة: الربح / الخسارة</th>
                                    <th className="border text-center border-slate-600" colSpan={2}>مبلغ: الربح / الخسارة </th>
                                    <th className="border text-center border-slate-600" colSpan={2}>الرصيد بعد البيع </th>
                                </tr>
                                <tbody>
                                    <tr className='text-xs'>
                                        <td className="border text-center border-slate-600" >{stock.previousFundBalance.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" >{stock.contributionAmount.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" >{stock.contributionRate.toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" >{stock.balanceAfterSale && (((stock.balanceAfterSale - stock.previousFundBalance) * 100) / stock.contributionAmount).toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" colSpan={2}>{stock.balanceAfterSale && (stock.balanceAfterSale - stock.previousFundBalance).toFixed(2)}</td>
                                        <td className="border text-center border-slate-600" colSpan={2}>{stock.balanceAfterSale.toFixed(2)}</td>

                                    </tr>
                                </tbody>
                                <tr className='text-center text-xs'>
                                    <th className="border border-slate-600" colSpan={8}>بيانات المساهمين</th>
                                </tr>
                                <tr className='text-xs'>
                                    <th className="border text-center border-slate-600" >اسم العضو</th>
                                    <th className="border text-center border-slate-600" >رصيده السابق</th>
                                    <th className="border text-center border-slate-600" >نسبة المساهمة</th>
                                    <th className="border text-center border-slate-600" >مبلغ المساهمة</th>
                                    <th className="border text-center border-slate-600" >نسبة: الربح / الخسارة</th>
                                    <th className="border text-center border-slate-600" >مبلغ: الربح / الخسارة </th>
                                    <th className="border text-center border-slate-600" >مبلغ نسبته من  الربح </th>
                                    <th className="border text-center border-slate-600" >الرصيد بعد البيع</th>
                                </tr>
                                <tbody>
                                    {
                                        userStock && userStock.map((user) => {
                                            return (
                                                <tr className='text-xs'>
                                                    <td className="border text-center border-slate-600">{user.idUser.name}</td>
                                                    <td className="border text-center border-slate-600">{user.prevBalance.toFixed(2)}</td>
                                                    <td className="border text-center border-slate-600">{user.contributionRate.toFixed(2)}%</td>
                                                    <td className="border text-center border-slate-600">{user.contributionAmount.toFixed(2)}</td>
                                                    <td className="border text-center border-slate-600">{user.rate.toFixed(2)}%</td>
                                                    <td className="border text-center border-slate-600">{user.amount.toFixed(2)}</td>
                                                    <td className="border text-center border-slate-600">{user.amountProfitPercentage != 0 ? stock.amountPercentage.toFixed(2) : 0}</td>
                                                    <td className="border text-center border-slate-600">{user.amountProfitPercentage != 0 ? (user.balanceAfterSale + stock.amountPercentage).toFixed(2) : user.balanceAfterSale.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </div>
            }
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/*<button className="btn mt-[1rem]" onClick={() => document.getElementById('my_modal_1').showModal()}>اضافة المعلومات الناقصة</button>*/}
            <dialog id="sell" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-sm">هل انت متاكد من انك تريد البيع</h3>
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleSell();
                            }} disabled={submit} className='btn btn-sm  text-sm btn-primary'> {submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
                            <button className="btn btn-sm  text-sm">اغلاق</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="currentPrice" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">القيمة الحالية للسهم</h3>
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    <div className="relative w-full mb-[1rem]">
                        <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[0.5rem] right-[1rem]" />
                        <input type="number" step={"any"} onChange={(event) => {
                            setCurrentPrice((prev) => {
                                return {
                                    ...prev,
                                    price: Number(event.target.value)
                                }
                            })
                        }} required className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`القيمة الحالية للسهم`} />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleCurrentPrice();
                            }} disabled={submit} className='btn btn-sm  text-sm btn-primary'> {submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
                            <button className="btn btn-sm  text-sm">اغلاق</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form action="">
                        {showAlert.display ? <Alert msg={showAlert} /> : ""}
                        <div className="relative w-full mb-[1rem]">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[0.5rem] right-[1rem]" />
                            <input type="number" step={"any"} onChange={(event) => {
                                setAdditionalStock((prev) => {
                                    return {
                                        ...prev,
                                        addFreeStock: Number(event.target.value)
                                    }
                                })
                            }} required className="formInput w-full input input-sm pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الاسهم المجانية`} />
                        </div>

                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleSubmit();
                            }} disabled={submit} className='btn btn-sm text-sm btn-primary'> {submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
                            <button className="btn btn-sm  text-sm">اغلاق</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DisplayStocksContributionForm