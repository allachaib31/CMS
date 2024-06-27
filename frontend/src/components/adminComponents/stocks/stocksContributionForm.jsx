import { faArrowTrendUp, faArrowUpWideShort, faBuildingColumns, faLandmark, faMoneyBill, faPercent, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function StocksContributionForm() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/stocks" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج المساهمة في شراء الأسهم
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                <div className='flex flex-col gap-[1rem]'>
                    <h1>بيانات المساهمة</h1>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faArrowTrendUp} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`سم الجهة المساهم فيها`} pattern="^.{3,1024}$" />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faBuildingColumns} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم البنك المساهم عن طريقه" pattern="^.{3,1024}$" />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faArrowUpWideShort} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأسهم المشتراة 1`} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faArrowUpWideShort} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأسهم المشتراة 2`} />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`قيمة السهم`} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`جمالي تكلفة الشراء`} />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                            <label> تاريخ الشراء  (الميلادي)</label>
                            <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                        </div>
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                            <label> تاريخ الشراء  (الهجري)</label>
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`القيمة الحالية للسهم`} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`القيمة السوقية للأسهم`} />
                        </div>
                    </div>
                    <h1>بيانات العضو المساهم باسم الصندوق</h1>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <select className="select select-bordered w-full">
                                <option disabled selected>اختر رقم الهوية</option>
                            </select>
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faPercent} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" disabled required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="نسبته من الربح  " title="نسبته من الربح  " />
                        </div>
                    </div>
                    <h1>بيانات الصندوق</h1>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faLandmark} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" disabled className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`الرصيد الحالي صندوق`} title={`الرصيد الحالي صندوق`} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" disabled required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مبلغ المساهمة " title="مبلغ المساهمة " />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative w-full">
                            <FontAwesomeIcon icon={faPercent} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" disabled className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`نسبة المساهمة`} title={`نسبة المساهمة`} />
                        </div>
                    </div>
                </div>
                <button className='btn text-white font-bold text-[20px] btn-primary'>
                    تاكيد
                </button>
            </form>
        </div>
    )
}

export default StocksContributionForm