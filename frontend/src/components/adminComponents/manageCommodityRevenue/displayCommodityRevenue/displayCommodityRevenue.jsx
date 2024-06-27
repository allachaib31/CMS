import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getActiveCommodityRevenueFetch, getCommidtyAndInstallmentFetch, payInstallmentScheduleFetch } from '../../../../utils/apiFetch';
import Alert from '../../../alert/alert';
import { hijriDateObject } from '../../../../utils/getHijriDate';
import AddNoteInstallmentSchedule from '../../../modals/addNoteInstallmentSchedule';

function DisplayCommodityRevenue() {
  const navigate = useNavigate();
  const [idList, setIdList] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hijriDate, setHijriDate] = useState(hijriDateObject(date));
  const [id, setId] = useState("");
  const [commodityRevenue, setCommodityRevenue] = useState(false);
  const [installmentSchedule, setInstallmentSchedule] = useState(false);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const [inputs, setInputs] = useState({
    _id: "",
    comment: ""
  })
  useEffect(() => {
    getActiveCommodityRevenueFetch(date).then((res) => {
      setIdList(res.data.commodityRevenue);
      setTotal(res.data.total)
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
    })
  }, [date]);
  useEffect(() => {
    if (id == "") return;
    getCommidtyAndInstallmentFetch(id).then((res) => {
      console.log(res)
      setCommodityRevenue(res.data.commodityRevenue);
      setInstallmentSchedule(res.data.installmentSchedule);
    })

  }, [id]);
  const handleSubmit = (id,index) => {
    setShowAlert({
      display: false,
    });
    payInstallmentScheduleFetch(id).then((res) => {
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      const newInstallment = installmentSchedule;
      newInstallment[index].itPaid = true
      setInstallmentSchedule(newInstallment)
      //document.getElementById(id + "pay").innerHTML = "تم الدفع بنجاح";
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    });
  }
  return (
    <div className="px-[1rem] sm:px-0">
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        إيرادات السلع
      </h1>
      <div className='text-[1.1rem] flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
        <label>إيرادات اقساط السلع لشهر</label>
        <input type="date" onChange={(event) => {
          setDate(event.target.value);
          setHijriDate(hijriDateObject(event.target.value))
          setCommodityRevenue(false);
          setInstallmentSchedule(false);
        }} value={date} className='input input-bordered' />
        <label>
          الموافق لي{" "}
          {hijriDate ? (
            <span>
              {hijriDate[2]}/{hijriDate[1].number}/
              {hijriDate[0]}
            </span>
          ) : (
            ""
          )}
        </label>
      </div>
      <div className='mt-[1rem] flex justify-center gap-[1rem]'>
        <h1 className='text-[1.1rem] font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]'>اجمالي إيرادات السلع لهذا الشهر</h1>
        <span className='text-[1.1rem] font-bold bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]'>{total}</span>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[2500px] mx-auto">
          <thead className="text-[1rem] text-center">
            <tr>
              <th className="border border-slate-600" rowSpan={2}>
                رقم الطلب
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                اسم العميل
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                نوع السلعة
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                رقم القسط
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                مبلغ القسط
              </th>
              <th className="text-center border border-slate-600" colSpan={2}>
                تاريخ الاستحقاق
              </th>
              <th className="text-center border border-slate-600" colSpan={2}>
                تاريخ السداد
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                ملاحظات
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                تفاصيل اكثر
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                دفع
              </th>
            </tr>
            <tr>
              <th className="text-center border border-slate-600">
                الميلادي
              </th>
              <th className="text-center border border-slate-600">
                الهجري
              </th>
              <th className="text-center border border-slate-600">
                الميلادي
              </th>
              <th className="text-center border border-slate-600">
                الهجري
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <th className="border border-slate-600">
                <select onChange={(event) => {
                  setId(event.target.value);
                }} className='select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                  <option selected disabled>قم باختيار رقم الطلب</option>
                  {idList && idList.map((list) => (
                    <option value={list._id}>{list._id}</option>
                  ))}
                </select>
              </th>
              {
                commodityRevenue && <>
                  <td className="border border-slate-600">
                    {commodityRevenue.customerData.name}
                  </td>
                  <td className="border border-slate-600">
                    {commodityRevenue.commodityData.itemType}
                  </td>
                  <td className="border border-slate-600">
                    <select onChange={(event) => {
                      setIndex(event.target.value)
                    }} className='select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                      {
                        installmentSchedule && installmentSchedule.map((installment, index) => (
                          <option value={index} >{index + 1}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].premiumAmount}
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].requiredPaymentDate}
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].requiredPaymentDateHijri.year}-{installmentSchedule[index].requiredPaymentDateHijri.month.number}-{installmentSchedule[index].requiredPaymentDateHijri.day}
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].actualPaymentDate}
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].actualPaymentDateHijri && installmentSchedule[index].actualPaymentDateHijri.year + "-" + installmentSchedule[index].actualPaymentDateHijri.month.number + "-" + installmentSchedule[index].actualPaymentDateHijri.day}
                  </td>
                  <td onClick={() => {
                    setInputs({
                      _id: installmentSchedule[index]._id,
                      comment: "",
                      index: index
                    })
                    document.getElementById('addNote').showModal()
                  }} id={installmentSchedule[index]._id} className="border border-slate-600">
                    {installmentSchedule[index].comments}
                  </td>
                  <td className="border border-slate-600">
                    <Link to={"/commodityRevenue/installmentSchedule?id=" + commodityRevenue._id} className='btn btn-info'>تفاصيل</Link>
                  </td>
                  <td id={installmentSchedule[index]._id + "pay"} className="border border-slate-600">
                    {installmentSchedule[index].itPaid ? "تم الدفع بنجاح" : <button onClick={() => {
                      handleSubmit(installmentSchedule[index]._id,index)
                    }} className='btn btn-success'>دفع</button>
                    }
                  </td>
                </>
              }

            </tr>
          </tbody>
        </table>
      </div>
      <AddNoteInstallmentSchedule inputs={inputs} setInputs={setInputs} installmentSchedule={installmentSchedule} setInstallmentSchedule={setInstallmentSchedule}/>
    </div>
  )
}

export default DisplayCommodityRevenue