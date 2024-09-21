import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBrancheUserFetch } from '../utils/apiFetch';

function Branches() {
    const navigate = useNavigate();
    const [branches, setBranches] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        getBrancheUserFetch(queryParams.get("id")).then((res) => {
            setBranches(res.data.result);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, []);
    return (
        <div className='container  mx-auto px-[1rem] sm:px-0 py-[2rem]'>
            <div className=' pt-[3rem]'>
                <h1 className='text-[1.3rem] text-white font-bold text-center'>فروع للمسابقة</h1>
            </div>
            <div className='flex justify-center'>
                <div className="my-[2rem] overflow-x-auto">
                    <table className="table backdrop-blur-xl bg-black/40 text-white w-[700px]">
                        {/* head */}
                        <thead className="text-[1rem] text-white text-center">
                            <tr>
                                <th>الفروع</th>
                                <th>عدد الاسئلة</th>
                                <th>النقاط</th>
                                <th>تنبيه</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                branches && branches.map((branche) => {
                                    return (
                                        <tr>
                                            <th><Link to={`/home/start?id=${branche.contestBranche.idContest}&idBranche=${branche.contestBranche._id}`} className='underline'>{branche.contestBranche.name}</Link></th>
                                            <td>{branche.numberOfQuestion}</td>
                                            <td>{branche.points}</td>
                                            <td>تستطيع الدخول مرة واحدة الى الفرع والاجابة على الاسئلة في حالة الخروج بدون اكمال اسئلة سوف تتحصل على صفر و لن تستطيع المشاركة فيه مرة اخرى</td>
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

export default Branches