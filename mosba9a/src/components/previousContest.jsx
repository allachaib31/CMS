import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getLastContestFetch } from '../utils/apiFetch';

function PreviousContest() {
    const navigate = useNavigate();
    const [contests, setContests] = useState(false);
    useEffect(() => {
        getLastContestFetch()
            .then((res) => {
                setContests(res.data.contest);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/auth");
                }
            });
    }, []);
    return (
        <div className="w-full h-screen py-[2rem]">
            <h1 className="text-[1.3rem]  pt-[3rem] text-white font-bold text-center">
                المسابقات السابقة
            </h1>
            <div className='flex justify-center'>
                <div className="my-[2rem] overflow-x-auto">
                    <table className="table backdrop-blur-xl bg-black/40 text-white w-[1000px]">
                        <thead className="text-[1rem] text-white text-center">
                            <tr>
                                <th>اسم المسابقة</th>
                                {/*<th>عدد الجوائز</th>
                                <th>الجوائز</th>*/}
                                <th>تاريخ البدء</th>
                                <th>تاريخ النهاية</th>
                                <th>المتسابقون</th>
                                <th>الفائزون</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                        {contests &&
                                contests.map((contest, index) => {
                                    const startDate = new Date(contest.competitionStartDate);
                                    const endDate = new Date(contest.competitionEndDate);
                                    return (
                                        <tr key={contest._id}>
                                            <td><Link className="underline" to={"/home/userResult?id=" + contest._id}>{contest.name}</Link></td>
                                            {/*<td>{contest.numberOfAwards}</td>
                                            <td>
                                                <select className="input input-bordered text-black">
                                                    {
                                                        contest.awards.map((award) => {
                                                            return (
                                                                <option>{award}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>*/}
                                            <td>
                                                {startDate.getUTCFullYear() + "-" + (startDate.getUTCMonth() + 1) + "-" + startDate.getUTCDate()}
                                            </td>
                                            <td>
                                                {endDate.getUTCFullYear() + "-" + (endDate.getUTCMonth() + 1) + "-" + endDate.getUTCDate()}
                                            </td>
                                            <td>                                                
                                                <select className="input input-bordered text-black">
                                                {
                                                    contest.contestants.map((contestant) => {
                                                        return (
                                                            <option>{contestant}</option>
                                                        )
                                                    })
                                                }
                                            </select></td>
                                            <td>                                                
                                                <select className="input input-bordered text-black">
                                                {
                                                    contest.winners.map((winner) => {
                                                        return (
                                                            <option>{winner.name} {winner.point} نقطة في {winner.timing}  ثانية</option>
                                                        )
                                                    })
                                                }
                                            </select></td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PreviousContest