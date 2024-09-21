import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../alert/alert';
import { addBrancheFetch, getBrancheFetch, removeBrancheFetch } from '../../utils/apiFetch';

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
                return [...prev,res.data.contestBranche]
            })
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleRemove = (id, index) => {
        setShowAlert({
            display: false,
        });
        removeBrancheFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            let arr = contestBranches;
            arr.splice(index, 1);
            setContestBranches(arr)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
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
                navigate("/authAdmin");
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
                <div className="overflow-x-auto">
                    <table className="table w-[1000px]">
                        <thead className='text-center'>
                            <tr>
                                <th>العدد</th>
                                <th>اسم الفرع</th>
                                <th>المتسابقون</th>
                                <th>الفائزون</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                contestBranches && contestBranches.map((contest, index) => {
                                    return (
                                        <tr key={contest._id}>
                                            <th>{contest.id}</th>
                                            <td><Link className="underline" to={contest.idContest.open ? "/admin/manageContest/competitionBranches?idContest=" + queryParams.get('id') + "&idBranche=" + contest._id : "/admin/manageContest/resultBranche?id=" + contest._id} >{contest.name}</Link></td>
                                            <td>                                                
                                                <select className="input input-bordered">
                                                {
                                                    contest.contestants.map((contestant) => {
                                                        return (
                                                            <option>{contestant}</option>
                                                        )
                                                    })
                                                }
                                            </select></td>
                                            <td>                                                
                                                <select className="input input-bordered">
                                                {
                                                    contest.winners.map((winner) => {
                                                        return (
                                                            <option>{winner.name} {winner.point} نقطة في {winner.timing}  ثانية</option>
                                                        )
                                                    })
                                                }
                                            </select></td>
                                            <td><button onClick={() => {
                                                handleRemove(contest._id, index)
                                            }}  className="btn btn-error">حذف</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ControllerContest