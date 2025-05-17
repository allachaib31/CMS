import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hijriDateObject } from "../../../utils/getHijriDate";
import { addMonthlySubscriptionsFetch, getOverdueSubscriptionsFetch, updateInvoiceOverdueFetch } from "../../../utils/apiFetch";
import Alert from "../../alert/alert";
//import moment from "moment-hijri";

function ManagingLatePayments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const getOverdueSubscriptions = () => {
    setLoading((e) => !e);
    //  alert(inputs.month)
    getOverdueSubscriptionsFetch()
      .then((res) => {
        console.log(res);
        setLoading((e) => !e);
        setSubscriptions(res.data.subscriptions);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/auth");
        }
        setLoading((e) => !e);
        setSubscriptions([]);
      });
  };
  const handleSubmit = (data) => {
    setShowAlert({
        display: false,
    });
    addMonthlySubscriptionsFetch(data).then((res) => {
        setShowAlert({
            display: true,
            status: true,
            text: res.data.msg
        });
        document.getElementById(data.idUser).innerHTML = "تم الدفع بنجاح" ;
    }).catch((err) => {
        if (err.response.status == 401) {
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
    getOverdueSubscriptions();
  }, []);
  return (
    <div className="sm:p-0 px-[1rem]">
      <div className="container mx-auto">
        <Link
          to="/subscription"
          className="btn btn-sm btn-primary text-sm px-[2rem]"
        >
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-sm font-bold py-[0.5rem]">
        إدارة المتأخرات
      </h1>
      {showAlert.display ? <Alert msg={showAlert} /> : ""}
      <div className="overflow-x-auto mt-[0.5rem]">
        {!loading ? (
          <div className="flex justify-center">
            {" "}
            <span className=" loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <table className="table table-sm border-separate border-spacing-2 border w-[600px] mx-auto">
            <thead className="text-center">
              <tr className="text-xs">
                <th className="border border-slate-600" rowSpan={2}>
                  اسم العضو
                </th>
                <th className="border border-slate-600" rowSpan={2}>
                  نوع المبلغ
                </th>
                <th className="text-center border border-slate-600" colSpan={2}>
                  تاريخ الاستحقاق
                </th>
                <th className="text-center border border-slate-600" rowSpan={2}>دفع</th>
              </tr>
              <tr className="text-xs">
                <th className="text-center border border-slate-600">الميلادي</th>
                <th className="text-center border border-slate-600">الهجري</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {subscriptions &&
                subscriptions.map((subscription) => {
                  const dateHijri = subscription.dueDateHijri.year + "-" + subscription.dueDateHijri.month.number + "-" + subscription.dueDateHijri.day;
                  return (
                    <tr className="text-xs">
                      <th className="border border-slate-600">
                        {subscription.name}
                      </th>
                      <td className="border border-slate-600">اشتراك شهري</td>
                      <td className="border border-slate-600">{subscription.dueDate}</td>
                      <td className="border border-slate-600">
                        {dateHijri}
                      </td>
                      <td id={subscription.idUser._id} className="border border-slate-600">
                        <button onClick={() => {
                          handleSubmit({
                            idUser: subscription.idUser._id,
                            amount: subscription.amount,
                            month: subscription.month,
                            dueDateHijri: subscription.dueDateHijri,
                            dueDate: subscription.dueDate,
                            year: subscription.dueDateHijri.year,
                          })
                        }} className="btn btn-sm text-xs btn-success">دفع</button>
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
