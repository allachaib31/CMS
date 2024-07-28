import React, {  useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { enterToContestFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function EnterToContest() {
    const navigate = useNavigate();
    const location = useLocation();
    const [submit, setSubmit] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const [inputs, setInputs] = useState({
        email: "",
        idContest: queryParams.get("id")
    })
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        enterToContestFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            navigate("/client/contestStart/enterToBranches?id=" + queryParams.get("id"))
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    return (
        <div className='flex justify-center items-center pt-[5rem]'>
            <form action="" className='flex flex-col gap-[1rem]'>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <input type="email" onChange={(event) => {
                    setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            email: event.target.value
                        }
                    })
                }} required className='formInput input input-bordered' placeholder='بريد إلكتروني' />
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} className='btn btn-primary'>{submit ? <span className="loading loading-ring loading-lg"></span> : "بسم الله أبدأ"}</button>
            </form>
        </div>
    )
}

export default EnterToContest