import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { delteVoteFetch, getVoteFetch } from "../../../utils/apiFetch";

function DisplayVote() {
    const navigate = useNavigate();
    const [votes, setVotes] = useState([]);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
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
    const handleDelete = (id, index) => {
        setShowAlert({
            display: false,
        });
        delteVoteFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            const newList = [...votes];
            newList.splice(index, 1);
            setVotes(newList)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        });
    }
    return (
        <div className="px-[1rem] sm:px-0">
            <h1 className="text-center font-bold py-[0.5rem]">
                سجل التصويتات
            </h1>
            <div className="overflow-x-auto mt-[0.5rem]">
                <table className="table table-xs border-separate border-spacing-0 border w-[400px] md:w-[700px] mx-auto">
                    <thead className="text-xs text-center">
                        <tr>
                            <th className="border border-slate-600">رقم <br />الانتخابات</th>
                            <th className="border border-slate-600">
                                الموضوع
                            </th>
                            <th className="border border-slate-600">
                                تفاصيل
                            </th>
                            <th className="border border-slate-600">حدف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            votes && votes.map((vote, index) => {
                                return (
                                    <tr className="text-center">
                                        <td className="border border-slate-600">{vote.id}</td>
                                        <td className="border border-slate-600">{vote.subject}</td>
                                        <td className="border border-slate-600"><Link to={"/manageVote/voteDetails?id=" + vote._id} className="btn btn-xs btn-info">تفاصيل</Link></td>
                                        <td className="border border-slate-600"><button className='btn btn-xs btn-error' onClick={() => {
                                            if (window.confirm("هل انت متاكد من انك تريد القيام به العملية")) {
                                                handleDelete(vote._id, index)
                                            }
                                        }}>حدف</button></td>
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
