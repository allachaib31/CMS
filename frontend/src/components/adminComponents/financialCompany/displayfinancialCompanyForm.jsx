import { faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { hijriDateObject } from '../../../utils/getHijriDate';
import { Link } from 'react-router-dom';


function DisplayfinancialCompanyForm() {
  const [date, setDate] = useState(hijriDateObject());
  const [yearOptions, setYearOptions] = useState([]);
  const [inputs, setInputs] = useState({
    month: date[1].number,
    year: date[2],
  });
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
  return (
    <div className="sm:p-0 px-[1rem]">
      <div>
        <Link to="/investmentBox" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        نموذج المساهمة في شركة مالية
      </h1>
      <div className="md:join ">
        <select className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
          {yearOptions.map((value) => (
            <option key={value} value={value} selected={inputs.year === value}>
              {value}
            </option>
          ))}
        </select>
        <select className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
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
        <select className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
          <option selected disabled>قم باختيار العدد الخاص نموذج المساهمة في صندوق استثماري</option>
        </select>
        <div className="indicator">
          <button className="btn btn-primary join-item">ابحث</button>
        </div>
      </div>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="text-[1rem] table border-separate border-spacing-2 border w-[2000px] mx-auto">
          <tr className='text-center'>
            <th className="border text-center border-slate-600" colSpan={11}>بيانات المساهمة</th>
          </tr>
          <tr>
            <th className="border text-center border-slate-600" rowSpan={2}>
              رقم المساهمة
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              اسم الشركة المالية
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
            اسم البنك الذي سددت المساهمة عن طريقه
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
            مبلغ المساهمة
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
            مدة المساهمة
            </th>
            <th className="border text-center border-slate-600" colSpan={2}>
              تاريخ بدء المساهمة
            </th>
            <th className="border text-center border-slate-600" colSpan={2}>
              تاريخ انتهاء المساهمة
            </th>
            <th className="border text-center border-slate-600" rowSpan={2}>
              المبلغ بعد انتهاء المساهمة
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
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
            </tr>
          </tbody>
          <tr className='text-center'>
            <th className="border border-slate-600" colSpan={11}>بيانات الصندوق</th>
          </tr>
          <tr>
            <th className="border text-center border-slate-600" colSpan={2}>الرصيد السابق لصندوق</th>
            <th className="border text-center border-slate-600" colSpan={2}>مبلغ المساهمة</th>
            <th className="border text-center border-slate-600" colSpan={2}>نسبة المساهمة</th>
            <th className="border text-center border-slate-600" colSpan={2}>مبلغ المساهمة بعد انتهائها</th>
            <th className="border text-center border-slate-600" >نسبة: الربح / الخسارة</th>
            <th className="border text-center border-slate-600" >مبلغ: الربح / الخسارة </th>
            <th className="border text-center border-slate-600" >الرصيد بعد انتهاء المساهمة</th>
          </tr>
          <tbody>
            <tr>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>

            </tr>
          </tbody>
          <tr className='text-center'>
            <th className="border border-slate-600" colSpan={11}>بيانات المساهمين</th>
          </tr>
          <tr>
            <th className="border text-center border-slate-600" colSpan={2}>اسم العضو</th>
            <th className="border text-center border-slate-600" colSpan={2}>رصيده السابق</th>
            <th className="border text-center border-slate-600" colSpan={2}>نسبة المساهمة</th>
            <th className="border text-center border-slate-600" colSpan={2}>مبلغ المساهمة</th>
            <th className="border text-center border-slate-600" >نسبة: الربح / الخسارة</th>
            <th className="border text-center border-slate-600" >مبلغ: الربح / الخسارة </th>
            <th className="border text-center border-slate-600" >الرصيد بعد انتهاء المساهمة </th>
          </tr>
          <tbody>
            <tr>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600" colSpan={2}></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>
              <td className="border text-center border-slate-600"></td>

            </tr>
          </tbody>
        </table>

      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn mt-[1rem]" onClick={() => document.getElementById('my_modal_1').showModal()}>اضافة المعلومات الناقصة</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form action="">
            <div className="relative w-full">
              <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
              <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`المبلغ بعد انتهاء المساهمة`} />
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-primary'>تاكيد</button>
              <button className="btn">اغلاق</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DisplayfinancialCompanyForm