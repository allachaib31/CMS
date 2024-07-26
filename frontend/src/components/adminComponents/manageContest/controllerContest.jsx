import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../alert/alert';
import { addBrancheFetch, getBrancheFetch } from '../../../utils/apiFetch';

function ControllerContest() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [contestBranches, setContestBranches] = useState(false);
    const [inputs, setInputs] = useState({
        idContest: queryParams.get('id'),
        name: ""
    });
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addBrancheFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setContestBranches((prev) => {
                return [res.data.contestBranche,...prev]
            })
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    useEffect(() => {
        getBrancheFetch(queryParams.get('id')).then((res) => {
            setContestBranches(res.data.contestBranche);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    return (
        <div className='container mx-auto'>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <form action="" className='flex'>
                <input type="text" onChange={(event) => {
                    setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            name: event.target.value
                        }
                    })
                }} required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`اسم الفرع`} />
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} disabled={submit} className='btn btn-primary text-xl font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
            </form>
            <h1 className='text-4xl font-bold text-center mt-[2rem]'>فروع المسابقة</h1>
            <div className='mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center'>
                {
                    contestBranches && contestBranches.map((contest) => {
                        return (
                            <Link to={"/manageContest/competitionBranches?idContest=" + queryParams.get('id') + "&idBranche=" + contest._id} className='mb-[1rem] w-full md:w-1/2 flex justify-center items-center'>
                                <div className='bg-primary rounded-[14px] text-center w-full lg:w-[70%] text-white text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                                    {contest.name}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ControllerContest