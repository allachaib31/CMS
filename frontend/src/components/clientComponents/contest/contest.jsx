import React, { useState, useEffect } from 'react';
import { getTimingFetch } from '../../../utils/apiFetch';
import { Link } from 'react-router-dom';

function Contest() {
    const [counter, setCounter] = useState(0); // Set initial countdown value in seconds
    const [contests, setContests] = useState(false);
    useEffect(() => {
        getTimingFetch().then((res) => {
            console.log(res.data)
            setContests(res.data.contest)
            if (res.data.upcomingContests) {
                const contestStartDate = new Date(res.data.upcomingContests.competitionStartDate);
                const currentTime = new Date();
                const timeDifference = Math.floor((contestStartDate - currentTime) / 1000); // Time difference in seconds
                
                if (timeDifference > 0) {
                    setCounter(timeDifference);
                }
            }
        }).catch((err) => {

        });
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
        <div className='px-[1rem] sm:px-0 py-[2rem]'>
            <div className='container mx-auto'>
                <h1 className='text-center font-bold sm:text-[1.5rem]'>موعد بدء المسابقة الجديدة</h1>
                <div className="justify-center grid grid-flow-col gap-5 text-center auto-cols-max">
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
            </div>
            <div className='mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center'>
                {
                    contests && contests.map((contest) => {
                        return (
                            <Link to={"/client/contestStart?id=" + contest._id} className='mb-[1rem] w-full md:w-1/2 flex justify-center items-center'>
                                <div className='bg-primary rounded-[14px] text-center w-full lg:w-[70%] text-white text-[1.1rem] sm:text-[1.5rem] p-[4rem]'>
                                    {contest.name}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Contest;
