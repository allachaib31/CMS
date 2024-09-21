import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getBrancheIdFetch, getUserResultBranche } from '../utils/apiFetch';

function UserResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [brancheId, setBrancheId] = useState(false);
    const [result, setResult] = useState(false);
    useEffect(() => {
        getBrancheIdFetch(queryParams.get("id"))
            .then((res) => {
                setBrancheId(res.data.brancheId);
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
                الاطلاع على الاجوبة
            </h1>
            <div className="container mx-auto">
                <select onChange={(event) => {
                    //setResult(usersId[event.target.value])
                    getUserResultBranche(event.target.value, queryParams.get("id")).then((res) => {
                        console.log(res.data)
                        setResult(res.data.userContestBranche)
                    }).catch((err) => {
                        if (err.response && err.response.status === 401) {
                            navigate("/auth");
                        }
                    });
                }} className="select xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                    <option value="" selected disabled>اختار المشارك</option>
                    {
                        brancheId && brancheId.map((branche, index) => {
                            return (
                                <option value={branche._id}>{branche.name}</option>
                            )
                        })
                    }
                </select>

            </div>
            <div className='mt-[2rem] container mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center'>
                <div className="overflow-x-auto">
                    <table className="table backdrop-blur-xl bg-black/40 text-white w-[1000px]">
                        <thead className='text-[1rem] text-white text-center'>
                            <tr>
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

export default UserResult