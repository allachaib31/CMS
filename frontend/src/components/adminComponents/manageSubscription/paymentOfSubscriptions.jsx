import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import FoundationSubscription from './foundationSubscription'

function PaymentOfSubscriptions() {

    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
            دفع اشتراك التاسيس
            </h1>
            <FoundationSubscription />
        </div>
    )
}

export default PaymentOfSubscriptions