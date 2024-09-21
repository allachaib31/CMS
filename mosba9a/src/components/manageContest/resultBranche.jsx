import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getBrancheUserIdFetch } from '../../utils/apiFetch';

function ResultBranche() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [usersId, setUsersId] = useState(false);
    const [result, setResult] = useState(false);
    useEffect(() => {
        getBrancheUserIdFetch(queryParams.get('id')).then((res) => {
            setUsersId(res.data.userContestBranche);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
        })
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className="container mx-auto">
                <select onChange={(event) => {
                        setResult(usersId[event.target.value])
                    }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option value="" selected disabled>اختار المشارك</option>
                    {
                        usersId && usersId.map((user, index) => {
                            return (
                                <option value={index}>{user.idUserContest.idUser.name}</option>
                            )
                        })
                    }
                </select>

            </div>
            <div className='mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center'>
                <div className="overflow-x-auto">
                    <table className="table w-[1000px]">
                        <thead className='text-center'>
                            <tr>
                                <th>العدد</th>
                                <th>اسم </th>
                                <th>السؤال</th>
                                <th>اجابات العضو</th>
                                <th>الاجابات الصحيحة</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                result && result.response.map((res) => {
                                    let str = "";
                                    let correctAnswer = ""
                                    if(res.typeQuestion == "عادي"){
                                        str = res.responses;
                                        correctAnswer = res.correctResponse;
                                    }else if (res.typeQuestion == "املأ الفراغ"){
                                        str = res.responses
                                        res.correctResponse.forEach((cor) => {
                                            correctAnswer += cor[0]
                                        })
                                    }else {
                                        str = res.responses
                                        res.correctResponse.forEach((cor) => {
                                            correctAnswer += cor
                                        })
                                    }
                                    return (
                                        <tr>
                                            <th>{result.idUserContest.idUser.id}</th>
                                            <th>{result.idUserContest.idUser.name}</th>
                                            <td>{res.question}</td>
                                            <td>{str}</td>
                                            <td>{correctAnswer}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ResultBranche