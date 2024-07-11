import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hijriDateObject } from '../../../../utils/getHijriDate';
import { getFormContributionPurchaseCommodityFetch, getIdCommodityRevenueFetch } from '../../../../utils/apiFetch';

function RecordContributionPurchaseCommodity() {
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
        <Link to="/commodityRevenue/" className="btn btn-primary text-[2rem] px-[2rem]">
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </div>
      <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">
        سجل المساهمين في شراء السلع
      </h1>
      <div className="container mx-auto ">
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
        <select onChange={(event) => {
          setId(event.target.value);
        }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
          <option selected disabled>قم باختيار العدد الخاص بنموذج شراء السلع</option>
          {idList && idList.map((list) => (
            <option value={list._id}>{list.id}</option>
          ))}
        </select>
        <div className="indicator">
          <button onClick={handleSearch} className="btn btn-primary join-item  md:mt-[0rem] mt-[1rem]">ابحث</button>
        </div>
      </div>
      {
        !loading ? <div className="flex justify-center">
          {" "}
          <span className=" loading loading-ring loading-lg"></span>
        </div> : <div className="overflow-x-auto mt-[1rem]">
          {userContribution && <table className="text-[1.1rem] table border-separate border-spacing-2 border w-[1000px]  mx-auto">
            <tr>
              <th className="border text-center border-slate-600" >
                رقم الطلب
              </th>
              <th className="border text-center border-slate-600" >
                اسم العضو
              </th>
              <th className="border text-center border-slate-600" >
                نسبة المساهمة
              </th>
              <th className="border text-center border-slate-600" >
                مبلغ المساهمة
              </th>
              <th className="border text-center border-slate-600" >
                مبلغ الربح
              </th>
            </tr>
            <tbody>
              {
                userContribution && userContribution.map((user) => {
                  return (
                    <tr>
                      <td className="border text-center border-slate-600">{user.idCommodityRevenue.id}</td>
                      <td className="border text-center border-slate-600">{user.idUser.name}</td>
                      <td className="border text-center border-slate-600">{user.contributionPercentage.toFixed(2)}%</td>
                      <td className="border text-center border-slate-600">{user.contributionAmount.toFixed(2)}</td>
                      <td className="border text-center border-slate-600">{user.profitAmount.toFixed(2)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>}
        </div>
      }
    </div>
  )
}

export default RecordContributionPurchaseCommodity