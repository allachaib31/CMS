import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function ModifySubscriptionAmount() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/subscription" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                تحديث مبلغ الاشتراكات
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="table w-[600px] mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>النوع</th>
                            <th>المبلغ</th>
                            <th>تعديل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>اشتراك شهري</th>
                            <td><input type="text" placeholder="اكتب المبلغ" className="input input-bordered w-full max-w-xs" /></td>
                            <td><button className="btn btn-warning">تعديل</button></td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>اشتراك تاسيسي</th>
                            <td><input type="text" placeholder="اكتب المبلغ" className="input input-bordered w-full max-w-xs" /></td>
                            <td><button className="btn btn-warning">تعديل</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModifySubscriptionAmount