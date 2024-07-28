import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserResultFetch } from '../../../utils/apiFetch';

function UserResultContest() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [submit, setSubmit] = useState(false);
    const [userContestBranche, setUserContestBranche] = useState(false)
    useEffect(() => {
        getUserResultFetch(queryParams.get("id")).then((res) => {
            console.log(res)
            setUserContestBranche(res.data.userContestBranche)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
            }
        })
    }, [])
    return (
        <div className="px-[1rem] sm:px-0">
            <div className='container mx-auto'>
                <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                    النتائج
                </h1>
                <div className="overflow-x-auto mt-[1rem]">
                    <table className="text-[1rem] table border-separate border-spacing-2 border w-[1000px] mx-auto">
                        <thead className="text-[1rem] text-center">
                            <tr>
                                <th className="border border-slate-600">
                                السؤال
                                </th>
                                <th className="border border-slate-600">
                                الاجابات الصحيحة
                                </th>
                                <th className="border border-slate-600">
                                اجاباتك
                                </th>
                                <th className="border border-slate-600">
                                النقطة
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                userContestBranche && userContestBranche.response.map((res) => {
                                    return (
                                        <tr>
                                            <td className="border border-slate-600">{res.question}</td>
                                            <td className="border border-slate-600">{res.correctResponse}</td>
                                            <td className="border border-slate-600">{res.responses}</td>
                                            <td className="border border-slate-600">{res.point}</td>
                                        </tr>
                                        
                                    )
                                })
                            }
                            {
                                userContestBranche &&                            <tr>
                                <th className="border border-slate-600" colSpan={3}>المجموع</th>
                                <td className="border border-slate-600">{userContestBranche.point}</td>
                            </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserResultContest