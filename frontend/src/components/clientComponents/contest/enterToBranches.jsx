import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBrancheForUserFetch } from '../../../utils/apiFetch';

function EnterToBranches() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [contestBranches, setContestBranches] = useState(false);
    useEffect(() => {
        getBrancheForUserFetch(queryParams.get("id")).then((res) => {
            setContestBranches(res.data.contestBranche);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
            }
            console.log(err)
        })
    }, []);
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font-bold text-center mt-[2rem]'>فروع المسابقة</h1>
            <div className='mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center'>
                {
                    contestBranches && contestBranches.map((contest) => {
                        return (
                            <Link to={"/client/contestStart/startResponse?id=" + queryParams.get('id') + "&idBranche=" + contest._id} className='mb-[1rem] w-full md:w-1/2 flex justify-center items-center'>
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

export default EnterToBranches