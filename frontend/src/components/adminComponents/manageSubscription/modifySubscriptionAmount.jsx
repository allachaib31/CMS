import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getTypeSubscriptionFetch, updateTypeSubscriptionFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function ModifySubscriptionAmount() {
    const navigate = useNavigate();
    const [monthlySubmit, setMonthlySubmit] = useState(false);
    const [foundationSubmit, setFoundationSubmit] = useState(false);
    const [monthlyInput, setMonthlyInput] = useState(false);
    const [foundationInput, setFoundationInput] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getTypeSubscriptionFetch().then((res) => {
            setMonthlyInput({
                id: res.data.typeSubscription[0]._id,
                name: res.data.typeSubscription[0].name,
                amount: res.data.typeSubscription[0].amount
            })
            setFoundationInput({
                id: res.data.typeSubscription[1]._id,
                name: res.data.typeSubscription[1].name,
                amount: res.data.typeSubscription[1].amount
            })
        }).catch((err) => {
            if (err.response.status == 401) {
                navigate("/auth");
            }
        })
    }, []);
    const handleUpdate = (input, setSubmit) => {
        setSubmit((e) => !e);
        setShowAlert({
            display: false,
        });
        updateTypeSubscriptionFetch(input).then((res) => {
            console.log(res);
            setSubmit((e) => !e)
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            if (err.response.status == 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e)
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    return (
        <div className="container mx-auto sm:p-0 px-[1rem]">
            <div>
                <Link to="/subscription" className="btn btn-sm btn-primary px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center font-bold py-[0.5rem]">
            إضافة مبلغ الاشتراكات
            </h1>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            {
                (monthlyInput && foundationInput) && <div className="overflow-x-auto">
                    <table className="table w-[400px] mx-auto">
                        {/* head */}
                        <thead>
                            <tr className='text-center text-sm'>
                                <th>النوع</th>
                                <th>المبلغ</th>
                                <th>تعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className='text-center text-sm'>
                                <th>إشتراك شهري</th>
                                <td><input type="number" placeholder="اكتب المبلغ" onChange={(event) => {
                                    setMonthlyInput((prevInput) => {
                                        return { ...prevInput, amount: event.target.value };
                                    })
                                }} value={monthlyInput.amount} required className="formInput input input-sm input-bordered w-full max-w-[5rem]" /></td>
                                <td><button onClick={() => {
                                    handleUpdate(monthlyInput, setMonthlySubmit);
                                }} className="btn btn-sm btn-warning">{monthlySubmit ? <span className="loading loading-ring loading-lg"></span> : "تعديل"}</button></td>
                            </tr>
                            {/* row 2 */}
                            <tr className='text-center text-sm'>
                                <th>إشتراك التأسيس</th>
                                <td><input type="number" placeholder="اكتب المبلغ" onChange={(event) => {
                                    setFoundationInput((prevInput) => {
                                        return { ...prevInput, amount: event.target.value };
                                    })
                                }} value={foundationInput.amount} required className="formInput input input-sm input-bordered w-full max-w-[5rem]" /></td>
                                <td><button onClick={() => {
                                    handleUpdate(foundationInput, setFoundationSubmit);
                                }} className="btn btn-sm btn-warning">{foundationSubmit ? <span className="loading loading-ring loading-lg"></span> : "تعديل"}</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default ModifySubscriptionAmount