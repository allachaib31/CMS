import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getContestFetch, removeContestFetch } from "../../utils/apiFetch";
import Alert from "../alert/alert";

function DisplayContest() {
    const navigate = useNavigate();
    const [contests, setContests] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getContestFetch()
            .then((res) => {
                setContests(res.data.contest);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/authAdmin");
                }
            });
    }, []);
    const handleRemove = (id, index) => {
        setShowAlert({
            display: false,
        });
        removeContestFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            let arr = contests;
            arr.splice(index, 1);
            setContests(arr)
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
    return (
        <div className="sm:p-0 px-[1rem]">
            <h1 className="text-center text-[1.3rem] sm:text-[1.5rem] font-bold py-[1rem]">
            المسابقات السابقة
            </h1>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center">
                <div className="overflow-x-auto">
                    <table className="table w-[1000px]">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>العدد</th>
                                <th>اسم المسابقة</th>
                                {/*<th>عدد الجوائز</th>*/}
                                {/*<th>الجوائز</th>*/}
                                <th>تاريخ البدء</th>
                                <th>تاريخ النهاية</th>
                                <th>المتسابقون</th>
                                <th>الفائزون</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests &&
                                contests.map((contest, index) => {
                                    const startDate = new Date(contest.competitionStartDate);
                                    const endDate = new Date(contest.competitionEndDate);
                                    return (
                                        <tr key={contest._id}>
                                            <th>{contest.id}</th>
                                            <td><Link className="underline" to={"/admin/manageContest/controllerContest?id=" + contest._id}>{contest.name}</Link></td>
                                            {/*<td>{contest.numberOfAwards}</td>
                                            <td>
                                                <select className="input input-bordered">
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
                                            }} className="btn btn-error">حذف</button></td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DisplayContest;
