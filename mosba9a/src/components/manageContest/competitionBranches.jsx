import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getQuestionsFetch, removeQuestionFetch } from '../../utils/apiFetch';
import Alert from '../alert/alert';

function CompetitionBranches() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [questions, setQuestions] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    useEffect(() => {
        getQuestionsFetch(queryParams.get("idBranche")).then((res) => {
            setQuestions(res.data.results);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
        })
    }, [])
    const handleRemove = (id,index) => {
        removeQuestionFetch(id).then((res) => {
            const newList = questions;
            newList.splice(index, 1);
            setQuestions(newList)
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
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
        <div className="container mx-auto sm:p-0 px-[1rem]">
            <Link to={"/admin/manageContest/competitionBranches/addQuestion?idContest=" + queryParams.get("idContest") + "&idBranche=" + queryParams.get("idBranche")} className='btn btn-primary font-bold text-white'>إضافة سؤال</Link>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto xl:flex xl:justify-center  mt-[2rem]">
                <table className="table w-[1800px]">
                    {/* head */}
                    <thead>
                        <tr className="text-center text-[1rem]">
                            <th>العدد</th>
                            <th>السؤال</th>
                            <th>حدف</th>
                        </tr>
                    </thead>
                    <tbody className="text-[1rem]">
                        {
                            questions && questions.map((question,index) => {
                                return (
                                    <tr className='text-center'>
                                        <th>{question.id}</th>
                                        <td>{question.question}</td>
                                        <td><button onClick={() => {
                                            handleRemove(question._id,index)
                                        }} className='btn btn-error'>حدف</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompetitionBranches