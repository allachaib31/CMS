import { faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { Link, useNavigate } from 'react-router-dom';
import { getFinancialFetch, getIdFinancialFetch, paymentFinancialFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';


function DisplayfinancialCompanyForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState(hijriDateObject());
  const [submit, setSubmit] = useState(false);
  const [yearOptions, setYearOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [financialDone, setFinancialDone] = useState({
    idFinancial: "",
    money: 0
  });
  const [inputs, setInputs] = useState({
    month: date[1].number,
    year: date[2],
  });
  const [id, setId] = useState("");
  const [idList, setIdList] = useState([]);
  const [financialCompany, setFinancialCompany] = useState(false);
  const [userFinancialCompany, setUserFinancialCompany] = useState(false);
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const generateYear = () => {
    const years = [];
    for (let i = 1415; i <= inputs.year; i++) {
      years.push(i);
    }
    setYearOptions(years);
  };
  const handleSubmit = () => {
    setSubmit((e) => !e);
    setShowAlert({
      display: false,
    });
    paymentFinancialFetch(financialDone).then((res) => {
      setSubmit((e) => !e)
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      setFinancialCompany(res.data.financial)
      setUserFinancialCompany(res.data.userFinancial)
    }).catch((err) => {
      setSubmit((e) => !e)
      if (err.response.status == 404 || err.response.status == 422 || err.response.status == 403) {
        setShowAlert({
          display: true,
          status: false,
          text: err.response.data.msg
        });
        return
      } else if (err.response.status == 401) {
        navigate("/auth");
      }
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
      return
    })
  }
  const handleSearch = () => {
    setLoading((e) => !e)
    getFinancialFetch(id).then((res) => {
      setLoading((e) => !e)
      setFinancialCompany(res.data.financialCompany)
      setUserFinancialCompany(res.data.userFinancialCompany)
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
  useEffect(() => {
    getIdFinancialFetch(inputs).then((res) => {
      setIdList(res.data.financial);
      setFinancialCompany(res.data.financialCompany);
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
    })
  }, [inputs])
  return (
    <div className="sm:p-0 px-[1rem]">
      <div className='container mx-auto'>
        <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
          نموذج المساهمة في شركة مالية
        </h1>
        <div className="md:join ">
          <select onChange={(event) => {
            setInputs((prevInput) => {
              return { ...prevInput, year: event.target.value }
            });
          }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
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
            setFinancialDone((prev) => {
              return {
                ...prev,
                idFinancial: event.target.value
              }
            })
            setId(event.target.value);
          }} className="select w-[7rem] xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
            <option selected disabled>قم باختيار العدد الخاص نموذج المساهمة في صندوق استثماري</option>
            {idList && idList.map((list) => (
              <option value={list._id}>{list.id}</option>
            ))}
          </select>
          <div className="indicator">
            <button onClick={handleSearch} className="btn btn-primary join-item">ابحث</button>
          </div>
        </div>
      </div>

      {
        !loading ? <div className="flex justify-center">
          {" "}
          <span className=" loading loading-ring loading-lg"></span>
        </div> : <div className="overflow-x-auto mt-[1rem]">
          {
            financialCompany && <>
              <table className="text-[1rem] table border-separate border-spacing-2 border w-[1600px] mx-auto">
                <tr className='text-center'>
                  <th className="border text-center border-slate-600" colSpan={11}>بيانات المساهمة</th>
                </tr>
                <tr>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    رقم <br />المساهمة
                  </th>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    اسم الشركة <br />المالية
                  </th>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    اسم البنك الذي سددت <br />المساهمة عن طريقه
                  </th>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    مبلغ <br />المساهمة
                  </th>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    مدة <br /> المساهمة
                  </th>
                  <th className="border text-center border-slate-600" colSpan={2}>
                    تاريخ بدء <br /> المساهمة
                  </th>
                  <th className="border text-center border-slate-600" colSpan={2}>
                    تاريخ انتهاء <br />المساهمة
                  </th>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    المبلغ بعد <br /> انتهاء المساهمة
                  </th>
                  <th className="border text-center border-slate-600" rowSpan={2}>
                    الربح / الخسارة
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
                    <td className="border text-center border-slate-600">{financialCompany.id}</td>
                    <td className="border text-center border-slate-600">{financialCompany.nameContributingParty}</td>
                    <td className="border text-center border-slate-600">{financialCompany.nameContributingBank}</td>
                    <td className="border text-center border-slate-600">{financialCompany.amount.toFixed(2)}</td>
                    <td className="border text-center border-slate-600">{financialCompany.duration}</td>
                    <td className="border text-center border-slate-600">{new Date(financialCompany.contributionDateMiladi).getUTCFullYear() + "-" + (new Date(financialCompany.contributionDateMiladi).getUTCMonth() + 1) + "-" + new Date(financialCompany.contributionDateMiladi).getUTCDate()}</td>
                    <td className="border text-center border-slate-600">{financialCompany.contributionDateHijri && financialCompany.contributionDateHijri.year + "-" + financialCompany.contributionDateHijri.month.number + "-" + financialCompany.contributionDateHijri.day}</td>
                    <td className="border text-center border-slate-600">{new Date(financialCompany.contributionEndDateMiladi).getUTCFullYear() + "-" + (new Date(financialCompany.contributionEndDateMiladi).getUTCMonth() + 1) + "-" + new Date(financialCompany.contributionEndDateMiladi).getUTCDate()}</td>
                    <td className="border text-center border-slate-600">{financialCompany.contributionEndDateHijri && financialCompany.contributionEndDateHijri.year + "-" + financialCompany.contributionEndDateHijri.month.number + "-" + financialCompany.contributionEndDateHijri.day}</td>
                    <td className="border text-center border-slate-600">{financialCompany.amountAfterEnd.toFixed(2)}</td>
                    <td className={`border text-center border-slate-600 ${financialCompany.isDone && (financialCompany.amountAfterEnd - financialCompany.amount) > 0 ? "text-green-600" : "text-error"}`}>{financialCompany.isDone && (financialCompany.amountAfterEnd - financialCompany.amount).toFixed(2)}</td>
                  </tr>
                </tbody>
                <tr className='text-center'>
                  <th className="border border-slate-600" colSpan={11}>بيانات الصندوق</th>
                </tr>
                <tr>
                  <th className="border text-center border-slate-600" colSpan={2}>الرصيد السابق <br /> لصندوق</th>
                  <th className="border text-center border-slate-600" colSpan={2}>مبلغ <br />المساهمة</th>
                  <th className="border text-center border-slate-600" colSpan={2}>نسبة <br />المساهمة</th>
                  <th className="border text-center border-slate-600" colSpan={2}>مبلغ المساهمة <br />بعد انتهائها</th>
                  <th className="border text-center border-slate-600" >نسبة: الربح / الخسارة</th>
                  <th className="border text-center border-slate-600" >مبلغ: الربح / الخسارة </th>
                  <th className="border text-center border-slate-600" >الرصيد بعد <br />انتهاء المساهمة</th>
                </tr>
                <tbody>
                  <tr>
                    <td className="border text-center border-slate-600" colSpan={2}>{financialCompany.previousFundBalance.toFixed(2)}</td>
                    <td className="border text-center border-slate-600" colSpan={2}>{financialCompany.contributionAmount.toFixed(2)}</td>
                    <td className="border text-center border-slate-600" colSpan={2}>{financialCompany.contributionRate.toFixed(2)}</td>
                    <td className="border text-center border-slate-600" colSpan={2}>{financialCompany.amountAfterEnd.toFixed(2)}</td>
                    <td className={`border text-center border-slate-600 ${financialCompany.isDone && ((financialCompany.amountAfterEnd - financialCompany.amount) / financialCompany.amount) * 100 > 0 ? "text-green-600" : "text-error"}`}>{financialCompany.isDone && ((financialCompany.amountAfterEnd - financialCompany.amount) / financialCompany.amount) * 100}%</td>
                    <td className={`border text-center border-slate-600 ${financialCompany.isDone && (financialCompany.amountAfterEnd - financialCompany.amount) > 0 ? "text-green-600" : "text-error"}`}>{financialCompany.isDone && (financialCompany.amountAfterEnd - financialCompany.amount).toFixed(2)}</td>
                    <td className={`border text-center border-slate-600 ${financialCompany.isDone && (financialCompany.previousFundBalance + (financialCompany.amountAfterEnd - financialCompany.amount)) > 0 ? "text-green-600" : "text-error"}`}>{financialCompany.isDone && (financialCompany.previousFundBalance + (financialCompany.amountAfterEnd - financialCompany.amount)).toFixed(2)}</td>

                  </tr>
                </tbody>
                <tr className='text-center'>
                  <th className="border border-slate-600" colSpan={11}>بيانات المساهمين</th>
                </tr>
                <tr>
                  <th className="border text-center border-slate-600" colSpan={2}>اسم <br />العضو</th>
                  <th className="border text-center border-slate-600" colSpan={2}>رصيده <br /> السابق</th>
                  <th className="border text-center border-slate-600" colSpan={2}>نسبة <br />المساهمة</th>
                  <th className="border text-center border-slate-600" colSpan={2}>مبلغ <br />المساهمة</th>
                  <th className="border text-center border-slate-600" >نسبة: الربح / الخسارة</th>
                  <th className="border text-center border-slate-600" >مبلغ: الربح / الخسارة </th>
                  <th className="border text-center border-slate-600" >الرصيد بعد <br />انتهاء المساهمة </th>
                </tr>
                <tbody>
                  {
                    userFinancialCompany && userFinancialCompany.map((user) => {
                      return (
                        <tr>
                          <td className="border text-center border-slate-600" colSpan={2}>{user.idUser.name}</td>
                          <td className="border text-center border-slate-600" colSpan={2}>{user.prevBalance.toFixed(2)}</td>
                          <td className="border text-center border-slate-600" colSpan={2}>{user.contributionRate.toFixed(2)}</td>
                          <td className="border text-center border-slate-600" colSpan={2}>{user.contributionAmount.toFixed(2)}</td>
                          <td className={`border text-center border-slate-600 ${financialCompany.isDone && user.rate > 0 ? "text-green-600" : "text-error"}`}>{financialCompany.isDone && user.rate.toFixed(2)}%</td>
                          <td className={`border text-center border-slate-600 ${financialCompany.isDone && (user.amount - user.contributionAmount) > 0 ? "text-green-600" : "text-error"}`}>{financialCompany.isDone && (user.amount - user.contributionAmount).toFixed(2)}</td>
                          <td className={`border text-center border-slate-600`}>{financialCompany.isDone && user.balanceAfterSale.toFixed(2)}</td>

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


      <div className='container mx-auto'>
        <button className="btn mt-[1rem]" onClick={() => document.getElementById('my_modal_1').showModal()}>اضافة المعلومات الناقصة</button>

      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form action="">
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="relative w-full">
              <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
              <input type="number" onChange={(event) => {
                setFinancialDone((prev) => {
                  return {
                    ...prev,
                    money: event.target.value
                  }
                })
              }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`المبلغ بعد انتهاء المساهمة`} />
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                disabled={submit}
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }} className='btn btn-primary'>{submit ? <span className="loading loading-ring loading-lg"></span> : "تاكيد"}</button>
              <button className="btn">اغلاق</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DisplayfinancialCompanyForm