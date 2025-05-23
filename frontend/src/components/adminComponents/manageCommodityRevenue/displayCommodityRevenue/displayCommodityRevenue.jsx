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
      setCommodityRevenue(res.data.commodityRevenue);
      setInstallmentSchedule(res.data.installmentSchedule);
    })

  }, [id]);
  const handleSubmit = (id, index, amount) => {
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
      newInstallment[index].itPaid = true;
      setTotal((prev) => prev + amount)
      setInstallmentSchedule(newInstallment)
      //setIndex(index);
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
      <h1 className="text-center text-sm font-bold py-[0.5rem]">
        إيرادات السلع
      </h1>
      <div className='text-sm flex sm:flex-row flex-col gap-[1rem] items-center justify-center'>
        <label>إيرادات اقساط السلع لشهر</label>
        <input type="date" onChange={(event) => {
          setDate(event.target.value);
          setHijriDate(hijriDateObject(event.target.value))
          setCommodityRevenue(false);
          setInstallmentSchedule(false);
        }} value={date} className='input input-sm input-bordered' />
        <label>
          الموافق {" "}
          {hijriDate ? (
            <span className='text-sm'>
              {hijriDate[2]}/{hijriDate[1].number}/
              {hijriDate[0]}
            </span>
          ) : (
            ""
          )}
        </label>
      </div>
      <div className='mt-[0.5rem] flex justify-center gap-[0.2rem] sm:gap-[1rem]'>
        <h1 className='text-sm w-[70%] sm:w-auto bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]'>إجمالي إيرادات السلع لهذا الشهر</h1>
        <span className='text-sm w-[30%] text-center sm:w-auto bg-primary text-white py-[0.7rem] px-[1.3rem] rounded-[1rem]'>{total.toFixed(2)}</span>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-xs table table-xs border-separate border-spacing-0 border w-[400px] md:w-[1000px] mx-auto">
          <thead className="text-xs text-center">
            <tr className='text-[0.6rem] md:text-xs'>
              <th className="border border-slate-600" rowSpan={2}>
                رقم <br />الطلب
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                اسم <br />العميل
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                نوع <br />السلعة
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                رقم <br />القسط
              </th>
              <th className="border border-slate-600" rowSpan={2}>
                مبلغ <br />القسط
              </th>
              <th className="text-center border border-slate-600" >
               الاستحقاق <br />بالميلادي
              </th>
              <th className="text-center border border-slate-600" >
               الاستحقاق <br />بالهجري
              </th>
              <th className="text-center border border-slate-600">
               السداد <br />بالميلادي
              </th>
              <th className="text-center border border-slate-600">
               السداد <br />بالهجري
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
          </thead>
          <tbody className='text-center'>
            <tr className='text-xs'>
              <th className="border border-slate-600 text-xs">
                <select onChange={(event) => {
                  setId(event.target.value);
                }} className='select select-xs w-[4rem] xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                  <option selected disabled>قم باختيار رقم الطلب</option>
                  {idList && idList.map((list) => (
                    <option value={list._id}>{list.id}</option>
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
                    }} className='select select-xs xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered'>
                      {
                        installmentSchedule && installmentSchedule.map((installment, index) => (
                          <option value={index} >{index + 1}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index]?.premiumAmount?.toFixed(2)}
                  </td>
                  <td className="border border-slate-600">
                    {new Date(installmentSchedule[index].requiredPaymentDate).getUTCFullYear() + "-" + (new Date(installmentSchedule[index].requiredPaymentDate).getUTCMonth() + 1) + "-" + new Date(installmentSchedule[index].requiredPaymentDate).getUTCDate()}
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].requiredPaymentDateHijri.year}-{installmentSchedule[index].requiredPaymentDateHijri.month.number}-{installmentSchedule[index].requiredPaymentDateHijri.day}
                  </td>
                  <td className="border border-slate-600">
                    {installmentSchedule[index].actualPaymentDate && new Date(installmentSchedule[index].actualPaymentDate).getUTCFullYear() + "-" + (new Date(installmentSchedule[index].actualPaymentDate).getUTCMonth() + 1) + "-" + new Date(installmentSchedule[index].actualPaymentDate).getUTCDate()}
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
                    <Link to={"/commodityRevenue/installmentSchedule?id=" + commodityRevenue._id} className='btn btn-xs btn-info'>تفاصيل</Link>
                  </td>
                  <td id={installmentSchedule[index]._id + "pay"} className="border border-slate-600">
                    {installmentSchedule[index].itPaid ? "تم الدفع بنجاح" : <button onClick={() => {
                      if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                        handleSubmit(installmentSchedule[index]._id, index, installmentSchedule[index].premiumAmount)
                      }
                    }} className='btn btn-xs btn-success'>دفع</button>
                    }
                  </td>
                </>
              }

            </tr>
          </tbody>
        </table>
      </div>
      <AddNoteInstallmentSchedule inputs={inputs} setInputs={setInputs} installmentSchedule={installmentSchedule} setInstallmentSchedule={setInstallmentSchedule} />
    </div>
  )
}

export default DisplayCommodityRevenue