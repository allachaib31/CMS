import { faBoxOpen, faBuildingColumns, faClock, faLandmark, faMoneyBill, faPercent, faPercentage, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function ContributionForm() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/investmentBox" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج المساهمة في صندوق استثماري
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                <div className='flex flex-col gap-[1rem]'>
                    <h1>بيانات المساهمة</h1>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faBoxOpen} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم الصندوق`} pattern="^.{3,1024}$" />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faBuildingColumns} className="absolute top-[1rem] right-[1rem]" />
                            <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="اسم البنك الذي سددت المساهمة عن طريقه" pattern="^.{3,1024}$" />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`مبلغ المساهمة`} />
                        </div>
                        <div className="relative sm:w-1/2">
                            <FontAwesomeIcon icon={faClock} className="absolute top-[1rem] right-[1rem]" />
                            <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مدة المساهمة" />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                            <label>تاريخ بدء المساهمة  (الميلادي)</label>
                            <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                        </div>
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                            <label>تاريخ بدء المساهمة  (الهجري)</label>
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-[1rem]">
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                            <label>تاريخ انتهاء المساهمة  (الميلادي)</label>
                            <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                        </div>
                        <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                            <label>تاريخ انتهاء المساهمة  (الهجري)</label>
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

export default ContributionForm