import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVoteFetch } from "../../../utils/apiFetch";

function DisplayVote() {
    const navigate = useNavigate();
    const [votes, setVotes] = useState([]);
    useEffect(() => {
        getVoteFetch().then((res) => {
            console.log(res)
            setVotes(res.data.vote);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                إدارة تصويت الأعضاء
            </h1>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[700px] mx-auto">
                    <thead className="text-[1rem] text-center">
                        <tr>
                            <th className="border border-slate-600">رقم الانتخابات</th>
                            <th className="border border-slate-600">
                                الموضوع
                            </th>
                            <th className="border border-slate-600">
                                تفاصيل
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            votes && votes.map((vote) => {
                                return (
                                    <tr className="text-center">
                                        <td className="border border-slate-600">{vote.id}</td>
                                        <td className="border border-slate-600">{vote.subject}</td>
                                        <td className="border border-slate-600"><Link to={"/manageVote/voteDetails?id=" + vote._id} className="btn btn-info">تفاصيل</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DisplayVote;
