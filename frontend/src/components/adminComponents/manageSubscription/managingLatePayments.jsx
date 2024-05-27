import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hijriDateObject } from "../../../utils/getHijriDate";
import { getOverdueSubscriptionsFetch, updateInvoiceOverdueFetch } from "../../../utils/apiFetch";
import Alert from "../../alert/alert";

function ManagingLatePayments() {
  const navigate = useNavigate();
  const [date, setDate] = useState(hijriDateObject());
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [inputs, setInputs] = useState({
    month: date[1].number,
    year: date[2],
  });
  const [month, setMonth] = useState(inputs.month);
  const [year, setYear] = useState(inputs.year);
  const [yearOptions, setYearOptions] = useState([]);
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
  const getOverdueSubscriptions = () => {
    setLoading((e) => !e);
    //  alert(inputs.month)
    getOverdueSubscriptionsFetch(inputs)
      .then((res) => {
        console.log(res);
        setLoading((e) => !e);
        setSubscriptions(res.data.subscriptions);
        setMonth(inputs.month);
        setYear(inputs.year);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/auth");
        }
        setLoading((e) => !e);
        setSubscriptions([]);
      });
  };
  const updateInvoiceOverdue = (input) => {
    setShowAlert({
      display: false,
    });
    updateInvoiceOverdueFetch(input).then((res) => {
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      document.getElementById(input.id).innerText = "تم اعتبارها من المتاخرات"
    }).catch((err) =>{
      if (err.response && err.response.status === 401) {
        navigate("/auth");
      }
      setShowAlert({
        display: true,
        status: false,
        text: err.response.data.msg
      });
    })
  }
  useEffect(() => {
    generateYear();
    getOverdueSubscriptions();
  }, []);
  return (
    <div className="sm:p-0 px-[1rem]">
      <div>
        <Link
          to="/subscription"
          className="btn btn-primary text-[2rem] px-[2rem]"
        >
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
        ادارة المتاخرات
      </h1>
      <div className="join">
        <select
          onChange={(event) => {
            setInputs((input) => {
              return { ...input, year: event.target.value.trim() };
            });
          }}
          className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item"
        >
          {yearOptions.map((value) => (
            <option key={value} value={value} selected={inputs.year === value}>
              {value}
            </option>
          ))}
        </select>
        <select
          onChange={(event) => {
            setInputs((input) => {
              return { ...input, month: event.target.value.trim() };
            });
          }}
          className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item"
        >
          <option value="1" selected={"1" == inputs.month}>
            محرم
          </option>
          <option value="2" selected={"1" == inputs.month}>
            صفر
          </option>
          <option value="3" selected={"3" == inputs.month}>
            ربيع الاول
          </option>
          <option value="4" selected={"4" == inputs.month}>
            ربيع الثاني
          </option>
          <option value="5" selected={"5" == inputs.month}>
            جمادى الاول
          </option>
          <option value="6" selected={"6" == inputs.month}>
            جمادى الثاني
          </option>
          <option value="7" selected={"7" == inputs.month}>
            رجب
          </option>
          <option value="8" selected={"8" == inputs.month}>
            شعبان
          </option>
          <option value="9" selected={"9" == inputs.month}>
            رمضان
          </option>
          <option value="10" selected={"10" == inputs.month}>
            شوال
          </option>
          <option value="11" selected={"11" == inputs.month}>
            ذو القعدة
          </option>
          <option value="12" selected={"12" == inputs.month}>
            ذو الحجة
          </option>
        </select>
        <div className="indicator">
          <button
            onClick={getOverdueSubscriptions}
            className="btn btn-primary join-item"
          >
            ابحث
          </button>
        </div>
      </div>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[1rem]">
        {!loading ? (
          <div className="flex justify-center">
            {" "}
            <span className=" loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <table className="text-[1rem] table border-separate border-spacing-2 border w-[1200px] mx-auto">
            <thead className="text-[1rem]">
              <tr>
                <th className="border border-slate-600" rowSpan={2}>
                  اسم العضو
                </th>
                <th className="border border-slate-600" rowSpan={2}>
                  نوع المبلغ
                </th>
                <th className="text-center border border-slate-600">
                  تاريخ الاستحقاق
                </th>
                <th className="text-center border border-slate-600" rowSpan={2}>تنبيه</th>
                <th className="text-center border border-slate-600" rowSpan={2}>اضافة</th>
              </tr>
              <tr>
                <th className="text-center border border-slate-600">الهجري</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions &&
                subscriptions.map((subscription) => {
                  return (
                    <tr>
                      <th className="border border-slate-600">
                        {subscription.idUser.name}
                      </th>
                      <td className="border border-slate-600">اشتراك شهري</td>
                      <td className="border border-slate-600">
                        01/0{month}/{year}
                      </td>
                      <td className="border border-slate-600">
                        <button className="btn w-full btn-warning">تنبيه</button>
                      </td>
                      <td id={subscription._id} className="border border-slate-600">
                        {
                          !subscription.months[month].isInvoiceOverdue ? <button onClick={() => {
                            updateInvoiceOverdue({
                              id: subscription._id,
                              month: month
                            })
                          }} className="btn w-full btn-error">تسجيلها ضمن المتأخرات</button> : "تم اعتبارها من المتاخرات"
                        }
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManagingLatePayments;
