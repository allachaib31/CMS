import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import FoundationSubscription from './foundationSubscription'

function PaymentOfSubscriptions() {

    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='container mx-auto'>
                <Link to="/subscription" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center  font-bold py-[0.5rem]">
            تسديد اشتراك التأسيس
            </h1>
            <FoundationSubscription />
        </div>
    )
}

export default PaymentOfSubscriptions