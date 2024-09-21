import React, { useEffect, useState } from 'react'
import { getTimingFetch } from '../utils/apiFetch';
import { Link, useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const [contests, setContests] = useState(false);
    const [contestsClose, setContestsClose] = useState(false);
    useEffect(() => {
        getTimingFetch().then((res) => {
            console.log(res)
            if (res.data.upcomingContests) {
                const contestEndDate = new Date(res.data.upcomingContests.competitionEndDate);
                const currentTime = new Date();
                const timeDifference = Math.floor((contestEndDate - currentTime) / 1000); // Time difference in seconds

                if (timeDifference > 0) {
                    setCounter(timeDifference);
                    setContests(res.data.upcomingContests)
                }
                return;
            }
            setContestsClose(res.data.msg)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => prevCounter > 0 ? prevCounter - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const days = Math.floor(counter / (60 * 60 * 24));
    const hours = Math.floor((counter % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((counter % (60 * 60)) / 60);
    const seconds = counter % 60;
    return (
        <div className='w-full h-screen py-[2rem]'>
            <div className='container pt-[3rem] mx-auto'>
                {contestsClose && <h1 className='text-[1.3rem] text-white font-bold text-center'>{contestsClose}</h1>}
                {
                    contests && <>
                        <h1 className='text-[1.3rem] text-white font-bold text-center'>مرحبا بك {contests.name}</h1>
                        <div className="overflow-y-auto">
                            <div className='h-[80vh] mt-[2rem] flex flex-col gap-[1rem] justify-center items-center'>
                                <div className="text-white justify-center grid grid-flow-col gap-5 text-center auto-cols-max">
                                    <div className="flex flex-col">
                                        <span className="countdown font-mono text-5xl">
                                            <span style={{ "--value": seconds }}></span>
                                        </span>
                                        ثانية
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="countdown font-mono text-5xl">
                                            <span style={{ "--value": minutes }}></span>
                                        </span>
                                        دقيقة
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="countdown font-mono text-5xl">
                                            <span style={{ "--value": hours }}></span>
                                        </span>
                                        ساعات
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="countdown font-mono text-5xl">
                                            <span style={{ "--value": days }}></span>
                                        </span>
                                        أيام
                                    </div>
                                </div>
                                <Link to={"/home/branches?id="+contests._id} className='text-white btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[2rem] sm:p-[4rem] mx-[0.5rem]'>
                                    {contests.name}
                                </Link>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Welcome