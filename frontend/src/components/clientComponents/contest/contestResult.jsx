import React, { useEffect, useState } from "react";
import { getContestResultFetch } from "../../../utils/apiFetch";
import { useLocation, useNavigate } from "react-router-dom";

function ContestResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [contestResult, setContestResult] = useState(false);
    const [contest, setContest] = useState(false);
    const [players, setPlayers] = useState(false);
    useEffect(() => {
        getContestResultFetch(queryParams.get("id"))
            .then((res) => {
                console.log(res);
                setContestResult(res.data.results);
                setContest(res.data.contest);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/authClient");
                }
            });
    }, []);
    return (
        <div className="px-[1rem] sm:px-0">
            <div className="container mx-auto">
                {contest && (
                    <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                        {contest.name}
                    </h1>
                )}
                <div className="overflow-x-auto mt-[1rem]">
                    <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                        <thead className="text-[1rem] text-center">
                            <tr>
                                <th className="border border-slate-600">الفروع</th>
                                <th className="border border-slate-600">المتسابقون</th>
                                <th className="border border-slate-600">الفائزون</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {contestResult &&
                                contestResult.map((contest) => {
                                    return (
                                        <tr>
                                            <td className="border border-slate-600">
                                                {contest.branche.name}
                                            </td>
                                            <td className="border border-slate-600">
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setPlayers(contest.userContestBranche);
                                                        document.getElementById("my_modal_1").showModal();
                                                    }}
                                                >
                                                    {contest.userContestBranche.length}
                                                </button>
                                            </td>
                                            <td className="border border-slate-600">
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setPlayers(contest.userContestBranche);
                                                        document.getElementById("my_modal_1").showModal();
                                                    }}
                                                >
                                                    {contest.userContestBranche.length > 0
                                                        ? contest.userContestBranche[0].idUserContest.idUser
                                                            .name
                                                        : "لايوجد"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div className="overflow-x-auto mt-[1rem]">
                        <table className="text-[1rem] table border-separate border-spacing-2 border mx-auto">
                            <thead className="text-[1rem] text-center">
                                <tr>
                                    <th className="border border-slate-600">الترتيب</th>
                                    <th className="border border-slate-600">الاسم</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    players && players.map((player,index) => {
                                        return (
                                            <tr>
                                                <td className="border border-slate-600">
                                                    {index + 1}
                                                </td>
                                                <td className="border border-slate-600">
                                                    {player.idUserContest.idUser.name}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ContestResult;
