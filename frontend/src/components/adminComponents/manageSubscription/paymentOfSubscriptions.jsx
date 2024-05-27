import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function PaymentOfSubscriptions() {
    const location = useLocation();
    console.log(location.pathname)
    const changeTypePayment = (btn1, btn2) => {
        document.getElementById(btn1).classList.add("btn-primary");
        document.getElementById(btn1).classList.remove("bg-transparent");
        document.getElementById(btn2).classList.remove("btn-primary");
    }
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
            دفع الاشتراكات
            </h1>
            <div className='flex'>
                <Link id='monthlySubscription' onClick={() => {
                    changeTypePayment("monthlySubscription","foundationSubscription");
                }} to="/subscription/paymentOfSubscriptions/monthlySubscription" className={`w-1/2 btn ${location.pathname.indexOf("monthlySubscription") > -1 ? "btn-primary" : "bg-transparent"}`}>اشتراك شهري</Link>
                <Link id='foundationSubscription' onClick={() => {
                    changeTypePayment("foundationSubscription","monthlySubscription")
                }} to="/subscription/paymentOfSubscriptions/foundationSubscription" className={`w-1/2 btn ${location.pathname.indexOf("foundationSubscription") > -1 ? "btn-primary" : "bg-transparent"}`}>اشتراك تاسيسي</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default PaymentOfSubscriptions