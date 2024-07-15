import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getContestFetch } from '../../../utils/apiFetch';

function DisplayContest() {
    const navigate = useNavigate();
    const [contests, setContests] = useState(false);
    useEffect(() => {
        getContestFetch().then((res) => {
            setContests(res.data.contest);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">
                إدارة المسابقة
            </h1>
            <div className='mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center'>
                {
                    contests && contests.map((contest) => {
                        return (
                            <Link to={"/manageContest/controllerContest?id=" + contest._id} className='mb-[1rem] w-full md:w-1/2 flex justify-center items-center'>
                                <div className='bg-primary rounded-[14px] text-center w-full lg:w-[70%] text-white text-[1.5rem] p-[4rem]'>
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

export default DisplayContest