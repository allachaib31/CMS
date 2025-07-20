import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import profileImage from "../../images/profileImage.png";
import logo from "../../images/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faBuilding, faUser, faChartSimple, faFileInvoiceDollar, faSackDollar, faUserTie, faHandHoldingDollar, faGift, faRecycle, faArrowTrendUp, faShapes, faCheckToSlot, faGamepad, faMicrophone, faListCheck, faTree, faHandHoldingDroplet, faUpload, faGauge, faVault } from "@fortawesome/free-solid-svg-icons";
import { getClientAdsFetch, uploadImageFetch, validationFetch } from "../../utils/apiFetch";
import { Alert, Loading } from "../../components";
import Cookies from "cookies-js";
import Marquee from "react-fast-marquee";

export const UserContext = React.createContext();

function Home() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [ads, setAds] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [theme, setTheme] = useState(
    !window.localStorage.getItem("theme")
      ? "lofi"
      : window.localStorage.getItem("theme")
  );
  const [inputs, setInputs] = useState({
    image: ""
  });
  const [showAlert, setShowAlert] = useState({
    display: false,
  });
  const handleLogout = () => {
    Cookies.expire("token");
    navigate("/auth");
  }
  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setInputs((prevInput) => {
        return {
          ...prevInput,
          image: file
        }
      })
    }
  };
  useEffect(() => {
    getClientAdsFetch().then((res) => {
      setAds(res.data.ads)
    }).catch((err) => {
      navigate("/auth");
    });
  }, [])
  const handleSubmit = () => {
    setShowAlert({
      display: false,
    });
    setSubmit((e) => !e);
    const form = new FormData();
    form.append("image", inputs.image);
    uploadImageFetch(form).then((res) => {
      setSubmit((e) => !e);
      setShowAlert({
        display: true,
        status: true,
        text: res.data.msg
      });
      setUser((prev) => {
        return {
          ...prev,
          profileImage: res.data.profileImage
        }
      });
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
  useEffect(() => {
    try {
      const screen = document.getElementById("fullScreen");
      screen.setAttribute("data-theme", theme);
    } catch (error) { }
  }, [theme]);
  useEffect(() => {
    validationFetch().then((res) => {
      setUser(res.user);
      setLoading((e) => !e);
    }).catch((err) => {
      navigate("/auth");
    })
  }, []);
  return (
    <div>
      {
        loading ? <Loading /> : <UserContext.Provider value={user}>
          <header className="flex items-center bg-base-300 p-[0.5rem]">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-base-300 btn-circle swap swap-rotate drawer-button"
                >
                  <input type="checkbox" />

                  {/* hamburger icon */}
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* close icon */}
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              </div>
              <div className="drawer-side z-[999]">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-[17rem] sm:w-80 min-h-full bg-base-200 text-base-content">
                  <div className="flex justify-center mb-[2rem]">
                    <img src={logo} alt="" className="w-48 h-48"/>
                  </div>
                  <li className="space-y-1">
                    <Link to="/admin/dashboard">
                      <FontAwesomeIcon icon={faGauge} /> الإحصائيات
                    </Link>
                    {/*<Link to="/admin/advetising">
                      <FontAwesomeIcon icon={faMicrophone} /> الإعلانات
                    </Link>*/}
                    <Link to="/admin/election">
                      <FontAwesomeIcon icon={faCheckToSlot} /> التصويتات
                    </Link>
                    <Link to="/admin">
                      <FontAwesomeIcon icon={faUserTie} /> إدارة المسؤولين
                    </Link>
                    <Link to="/user">
                      <FontAwesomeIcon icon={faUser} /> إدارة الأعضاء
                    </Link>
                    <details>
                      <summary>
                        {/*<Link to="/subscription">*/}
                        <FontAwesomeIcon icon={faFileInvoiceDollar} /> الاشتراكات
                        {/*</Link>*/}
                      </summary>
                      <ul>
                        <li>
                          <Link
                            to="/subscription/modifySubscriptionAmount"
                            className=""
                          >
                            مبلغ الاشتراكات
                          </Link></li>
                        <li>
                          <Link
                            to="/subscription/paymentOfSubscriptions"
                            className=""
                          >
                            مبلغ التأسيس
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/payMonthlySubscriptions"
                            className=""
                          >
                            الاشتراكات الشهرية
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/subscriptionHistory"
                            className=""
                          >
                            سجل الاشتراكات
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/annualSubscriptionRecord"
                            className=""
                          >
                            الاشتراكات السنوية
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/registerMemberFinancialData"
                            className=""
                          >
                            سجل البيانات المالية 
                          </Link>
                        </li>
                        <li>
                          <Link to="/contributionRevenue/consolidatedRecordRevenues" className=""
                          >السجل الموحد للإيرادات
                          </Link></li>
                        <li>
                          <Link
                            to="/subscription/withdrawMemberBalance"
                            className=""
                          >
                            تصفية رصيد العضو
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/managingLatePayments"
                            className=""
                          >
                            المتأخرات
                          </Link>
                        </li>
                      </ul>
                    </details>

                    <details>
                      <summary>
                        {/*<Link to="/loans">*/}
                        <FontAwesomeIcon icon={faHandHoldingDollar} /> القروض
                        {/*</Link>*/}
                      </summary>
                      <ul>
                        <li><Link to="/loans/order">طلب قرض</Link></li>
                        <li><Link to="/loans">بيانات القرض</Link></li>
                        <li><Link to="/loans/history">سجل القروض</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        {/*<Link to="/commodityRevenue">*/}
                        <FontAwesomeIcon icon={faChartPie} /> السلع
                        {/*</Link>*/}
                      </summary>
                      <ul>
                        <li><Link to="/commodityRevenue/orderToPurchaseGoods" className="">طلب شراء سلعة</Link></li>
                        <li><Link to="/commodityRevenue/commodityPurchaseOrderForm" className="">نموذج شراء سلعة</Link></li>
                        <li><Link to="/commodityRevenue/formContributionPurchaseCommodity" className="">نموذج مساهمة</Link></li>
                        <li><Link to="/commodityRevenue/recordContributionPurchaseCommodity" className="">سجل المساهمين</Link></li>
                        <li><Link to="/commodityRevenue" className="">إيرادات السلع</Link></li>
                        <li><Link to="/commodityRevenue/goodsRevenueRecord" className="">سجل السلع</Link></li>
                        <li><Link to="/commodityRevenue/contractsRegister" className="">سجل العقود</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <FontAwesomeIcon icon={faArrowTrendUp} /> الأسهم
                      </summary>
                      <ul>
                        <li><Link to="/stocks/contributionForm" className="">طلب مساهمة</Link></li>
                        <li><Link to="/stocks/displayContributionForm" className="">نموذج مساهمة</Link></li>
                        <li><Link to="/stocks/registerShareholdersShares" className="">سجل المساهمين</Link></li>
                        <li><Link to="/stocks/stockRevenue" className="">إيرادات الأسهم</Link></li>
                        <li><Link to="/stocks" className="">سجل المساهمات</Link></li>
                      </ul>
                    </details>


                    <details>
                      <summary>
                      <FontAwesomeIcon icon={faBuilding} /> الشركات المالية
                      </summary>
                      <ul>
                        <li><Link to="/financialCompany/" className="">طلب مساهمة</Link></li>
                        <li><Link to="/financialCompany/displayContributionForm" className="">نموذج مساهمة</Link></li>
                        <li><Link to="/financialCompany/contributionData" className="">سجل المساهمين</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                      <FontAwesomeIcon icon={faVault} /> الصناديق الاستثمارية
                      </summary>
                      <ul>
                        <li><Link to="/investmentBox/" className="">طلب مساهمة</Link></li>
                        <li><Link to="/investmentBox/displayContributionForm" className="">نموذج مساهمة</Link></li>
                        <li><Link to="/investmentBox/contributionData" className="">سجل المساهمين</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        {/*<Link to="/unreimbursedExpenses">*/}
                        <FontAwesomeIcon icon={faGift} /> المصروفات
                        {/*</Link>*/}
                      </summary>
                      <ul>
                        <li>
                          <Link to="/unreimbursedExpenses/expenseRequest">طلب مصروف</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses/paymentExpenses">تسديد مصروف نقدي</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses">نموذج المصروفات</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses/displayRecord">سجل المصروفات</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses/addExpenseType">إضافة نوع مصروف</Link>
                        </li>
                      </ul>
                    </details>
                    {
                      /*<details>
                        <summary>
                          <Link to="/reimbusedExpenses">
                            <FontAwesomeIcon icon={faRecycle} /> المصروفات المستردة
                          </Link>
                        </summary>
                        <ul>
                          <li>
                            <Link to="/reimbusedExpenses/expenseRequest">طلب مصروف</Link>
                          </li>
                          <li>
                            <Link to="/reimbusedExpenses/displayRecord">سجل المصروفات</Link>
                          </li>
                          <li>
                            <Link to="/reimbusedExpenses/addExpenseType">إضافة نوع مصروف</Link>
                          </li>
                        </ul>
                      </details>*/
                    }
                    {/*<details>
                      <summary>
                        <h1>
                          <FontAwesomeIcon icon={faHandHoldingDroplet} /> الدية المستردة
                        </h1>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/bloodMoney">طلب صرف  </Link>
                        </li>
                        <li>
                          <Link to="/bloodMoney/payment">تسديد مبلغ  </Link>
                        </li>
                        <li>
                          <Link to="/bloodMoney/record">سجل الديات </Link>
                        </li>
                      </ul>
                    </details>*/}
                    {/*<details>
                      <summary>
                        <Link to="/contributionRevenue">
                          <FontAwesomeIcon icon={faChartSimple} /> إيرادات المساهمات
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/contributionRevenue/recordContributions" className="sm:text-[1rem]">سجل المساهمات</Link></li>
                        <li>                <Link to="/contributionRevenue/consolidatedRecordRevenues" className="sm:text-[1rem]">السجل الموحد للإيرادات</Link></li>
                      </ul>
                    </details>*/}
                    {/*<details>
                      <summary>
                        <Link to="/manageContest/"><FontAwesomeIcon icon={faGamepad} /> إدارة المسابقة</Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/manageContest/addContest">إضافة مسابقة</Link>
                        </li>
                      </ul>
                    </details>*/}
                    <details>
                      <summary>
                        <p><FontAwesomeIcon icon={faCheckToSlot} />إدارة التصويت</p>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/manageVote/addVote">إضافة تصويت</Link>
                        </li>
                        <li>
                          <Link to="/manageVote/">سجل التصويتات</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <p><FontAwesomeIcon icon={faMicrophone} /> ادارة الاعلانات</p>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/manageAdvertising/slideShow">إضافة إعلان</Link>
                        </li>
                        {/*<li>
                          <Link to="/manageAdvertising/addAd">اضافة نص متحرك</Link>
                        </li>*/}
                        <li>
                          <Link to="/manageAdvertising/">سجل الإعلانات</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <p><FontAwesomeIcon icon={faListCheck} />اتفاقيات العائلة</p>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/agreementsFamily/add">إضافة اتفاقية </Link>
                        </li>
                        <li>
                          <Link to="/agreementsFamily/">سجل الاتفاقيات</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <p><FontAwesomeIcon icon={faListCheck} />اتفاقيات الصندوق</p>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/agreements/add">إضافة اتفاقية </Link>
                        </li>
                        <li>
                          <Link to="/agreements/">سجل الاتفاقيات</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <p><FontAwesomeIcon icon={faListCheck} />فتاوى الصندوق</p>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/fatwa/add">إضافة فتوى جديدة</Link>
                        </li>
                        <li>
                          <Link to="/fatwa/">الفتاوى السابقة</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/familyTree"><FontAwesomeIcon icon={faTree} /> شجرة العائلة</Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/familyTree/manage">التحكم فيها</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
            <label className="btn btn-sm rounded-full p-[0.5rem] m-[0.5rem] swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                checked={theme == "lofi" ? true : false}
                onChange={(e) => {
                  window.localStorage.setItem(
                    "theme",
                    theme == "dark" ? "lofi" : "dark"
                  );
                  setTheme((value) => (value == "dark" ? "lofi" : "dark"));
                }}
                type="checkbox"
              />

              {/* sun icon */}
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="relative bg-white rounded-full z-[999]">
              <img
                onClick={() => {
                  const listMenu = document.getElementById("listMenu");
                  listMenu.classList.toggle("hidden");
                }}
                src={user && user.profileImage ? "/api/v1.0/users/getProfileImage/" + user.profileImage : profileImage}
                className="cursor-pointer w-[70px] h-[70px] object-cover rounded-full"
                alt=""
              />
              <div
                id="listMenu"
                className="absolute left-5 hidden bg-white shadow-lg w-[150px]"
              >
                <ul>
                  <li>
                    <button onClick={() => document.getElementById('my_modal_ImageProfile').showModal()} className="btn w-full rounded-none">
                      رفع صورة جديدة
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn w-full rounded-none">
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <div dir="ltr">
          <Marquee direction="right" speed={150} gradient={true}>
            {ads &&
              ads.reverse().map((ad, index) => (
                    <h1 className="mx-[30px]">{ad.text}</h1>
              ))}
          </Marquee>

          </div>

          <dialog id="my_modal_ImageProfile" className="modal">
            <div className="modal-box ">
              {showAlert.display ? <Alert msg={showAlert} /> : ""}
              <h3 className="font-bold ">رفع صورة جديدة</h3>
              <button className='btn btn-sm btn-info max-w-sm' type="button" onClick={handleFileClick}>
                <FontAwesomeIcon icon={faUpload} /> تحميل صورة
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/png, image/gif, image/jpeg"
              />
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">اغلاق</button>
                  <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }} disabled={submit} className='btn btn-success font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                </form>
              </div>
            </div>
          </dialog>
          <Outlet />
        </UserContext.Provider>
      }
    </div>
  );
}

export default Home;
