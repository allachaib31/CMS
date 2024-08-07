import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import profileImage from "../../images/profileImage.png";
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faBuilding, faUser, faChartSimple, faFileInvoiceDollar, faSackDollar, faUserTie, faHandHoldingDollar, faGift, faRecycle, faArrowTrendUp, faShapes, faCheckToSlot, faGamepad, faMicrophone, faListCheck, faTree } from "@fortawesome/free-solid-svg-icons";
import { validationFetch } from "../../utils/apiFetch";
import { Loading } from "../../components";
import Cookies from "cookies-js";

export const UserContext = React.createContext();

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [theme, setTheme] = useState(
    !window.localStorage.getItem("theme")
      ? "lofi"
      : window.localStorage.getItem("theme")
  );
  const handleLogout = () => {
    Cookies.expire("token");
    navigate("/auth");
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
          <header className="flex items-center bg-base-300 p-[1rem]">
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
                    <img src={logo} alt="" />
                  </div>
                  <li className="text-[1.3rem] space-y-1">
                    <Link to="/admin">
                      <FontAwesomeIcon icon={faUserTie} /> إدارة المسؤولين
                    </Link>
                    <Link to="/user">
                      <FontAwesomeIcon icon={faUser} /> إدارة الاعضاء
                    </Link>
                    <details>
                      <summary>
                        <Link to="/subscription">
                          <FontAwesomeIcon icon={faFileInvoiceDollar} /> ادارة الاشتراكات
                        </Link>
                      </summary>
                      <ul>
                        <li>
                          <Link
                            to="/subscription/modifySubscriptionAmount"
                            className="text-[1rem]"
                          >
                            تعديل مبلغ الاشتراكات
                          </Link></li>
                        <li>
                          <Link
                            to="/subscription/annualSubscriptionRecord"
                            className="text-[1rem]"
                          >
                            سجل الاشتراكات السنوي
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/registerMemberFinancialData"
                            className="text-[1rem]"
                          >
                            سجل بيانات العضو المالية
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/subscriptionHistory"
                            className="text-[1rem]"
                          >
                            سجل الاشتراكات
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/payMonthlySubscriptions"
                            className="text-[1rem]"
                          >
                            دفع اشتراك الشهري
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/paymentOfSubscriptions"
                            className="text-[1rem]"
                          >
                            دفع اشتراك التاسيس
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/subscription/managingLatePayments"
                            className="text-[1rem]"
                          >
                            ادارة المدفوعات المتاخرة
                          </Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/commodityRevenue">
                          <FontAwesomeIcon icon={faChartPie} /> ايرادات السلع
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/commodityRevenue/goodsRevenueRecord" className="text-[1rem]">سجل ايرادات السلع</Link></li>
                        <li><Link to="/commodityRevenue/formContributionPurchaseCommodity" className="text-[1rem]">نموذج المساهمة في شراء سلعة</Link></li>
                        <li><Link to="/commodityRevenue/recordContributionPurchaseCommodity" className="text-[1rem]">سجل المساهمين في شراء سلعة</Link></li>
                        <li><Link to="/commodityRevenue/orderToPurchaseGoods" className="text-[1rem]">طلب شراء السلع</Link></li>
                        <li><Link to="/commodityRevenue/commodityPurchaseOrderForm" className="text-[1rem]">نموذج طلب شراء سلعة</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/contributionRevenue">
                          <FontAwesomeIcon icon={faChartSimple} /> ايرادات المساهمة
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/contributionRevenue/recordContributions" className="text-[1rem]">سجل المساهمات</Link></li>
                        <li>                <Link to="/contributionRevenue/consolidatedRecordRevenues" className="text-[1rem]">سجل الموحد للإيرادات</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/stocks">
                          <FontAwesomeIcon icon={faArrowTrendUp} /> الأسهم
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/stocks/contributionForm" className="text-[1rem]">طلب المساهمة</Link></li>
                        <li><Link to="/stocks/displayContributionForm" className="text-[1rem]">نموذج المساهمة</Link></li>
                      </ul>
                    </details>
                    {
                      /**
                       *                     <details>
                      <summary>
                        <Link to="/investmentBox">
                          <FontAwesomeIcon icon={faSackDollar} /> صندوق الاستثماري
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/investmentBox/contributionForm" className="text-[1rem]">طلب المساهمة</Link></li>
                        <li><Link to="/investmentBox/displayContributionForm" className="text-[1rem]">نموذج المساهمة</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/financialCompany">
                          <FontAwesomeIcon icon={faBuilding} /> شركة مالية
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/financialCompany/contributionForm" className="text-[1rem]">طلب المساهمة</Link></li>
                        <li><Link to="/financialCompany/displayContributionForm" className="text-[1rem]">نموذج المساهمة</Link></li>
                      </ul>
                    </details>
                       */
                    }
                    <details>
                      <summary>
                        <Link to="/loans">
                          <FontAwesomeIcon icon={faHandHoldingDollar} /> القروض
                        </Link>
                      </summary>
                      <ul>
                        <li><Link to="/loans/history">سجل القروض</Link></li>
                        <li><Link to="/loans/order">طلب قرض</Link></li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/unreimbursedExpenses">
                          <FontAwesomeIcon icon={faGift} /> المصروفات الغير مستردة
                        </Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/unreimbursedExpenses/displayRecord">سجل المصروفات</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses/expenseRequest">طلب مصروف</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses/paymentExpenses">دفع المصروفات</Link>
                        </li>
                        <li>
                          <Link to="/unreimbursedExpenses/addExpenseType">اضافة نوع مصروف</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/reimbusedExpenses">
                          <FontAwesomeIcon icon={faRecycle} /> المصروفات مستردة
                        </Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/reimbusedExpenses/displayRecord">سجل المصروفات</Link>
                        </li>
                        <li>
                          <Link to="/reimbusedExpenses/expenseRequest">تسجيل المصروفات</Link>
                        </li>
                        <li>
                          <Link to="/reimbusedExpenses/addExpenseType">اضافة نوع مصروف</Link>
                        </li>
                      </ul>
                    </details>
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
                        <Link to="/manageVote/"><FontAwesomeIcon icon={faCheckToSlot} /> إدارة تصويت الأعضاء</Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/manageVote/addVote">إضافة تصويت</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/manageAdvertising/"><FontAwesomeIcon icon={faMicrophone} /> ادارة الاعلانات</Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/manageAdvertising/addAd">إضافة اعلان</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/agreements/"><FontAwesomeIcon icon={faListCheck} /> إدارة البنود اتفاقيات الصندوق</Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/agreements/add">اضافة اتفاقيات</Link>
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        <Link to="/familyTree"><FontAwesomeIcon icon={faTree} /> شجرة العائلة</Link>
                      </summary>
                      <ul>
                        <li>
                          <Link to="/familyTree/manage">تحكم فيها</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
            <label className="btn rounded-full mx-[1rem] swap swap-rotate">
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
            <div className="relative bg-white rounded-full">
              <img
                onClick={() => {
                  const listMenu = document.getElementById("listMenu");
                  listMenu.classList.toggle("hidden");
                }}
                src={profileImage}
                className="cursor-pointer"
                alt=""
              />
              <div
                id="listMenu"
                className="absolute left-5 hidden bg-white shadow-lg w-[150px]"
              >
                <ul>
                  <li>
                    <button onClick={handleLogout} className="btn w-full rounded-none">
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <Outlet />
        </UserContext.Provider>
      }
    </div>
  );
}

export default Home;
