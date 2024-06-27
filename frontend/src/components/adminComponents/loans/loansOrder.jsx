import { faIdCard, faMoneyBill, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function LoansOrder() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/loans" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج طلب قرض
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
                        <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`رقم الهوية`} pattern="^.{3,1024}$" />
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                        <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مبلغ القرض " />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faIdCard} className="absolute top-[1rem] right-[1rem]" />
                        <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`عدد الأقساط`} />
                    </div>
                    <div className="relative sm:w-1/2">
                        <FontAwesomeIcon icon={faMoneyBill} className="absolute top-[1rem] right-[1rem]" />
                        <input type="number" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder="مبلغ القسط " />
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                    <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label>تاريخ استلام القرض  (الميلادي)</label>
                        <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                    </div>
                    <div className="flex gap-[1rem] items-center relative sm:w-1/2">
                        <label>تاريخ استلام القرض  (الهجري)</label>
                    </div>
                </div>
                <button className='btn text-white font-bold text-[20px] btn-primary'>
                    تاكيد
                </button>
            </form>
        </div>
    )
}

export default LoansOrder