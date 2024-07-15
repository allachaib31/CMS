import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function CompetitionBranches() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return (
        <div className="container mx-auto sm:p-0 px-[1rem]">
            <Link to={"/manageContest/competitionBranches/addQuestion?id=" + queryParams.get("id")} className='btn btn-primary font-bold text-white'>إضافة سؤال</Link>
            <div className="overflow-x-auto xl:flex xl:justify-center  mt-[2rem]">
                <table className="table w-[1800px]">
                    {/* head */}
                    <thead>
                        <tr className="text-center text-[1rem]">
                            <th>العدد</th>
                            <th>السؤال</th>
                            <th>تعديل</th>
                            <th>حدف</th>
                        </tr>
                    </thead>
                    <tbody className="text-[1rem]">
                        <tr className='text-center'>
                            <th>1</th>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, sequi. Numquam repudiandae, tempora veniam quaerat aliquam laudantium repellendus porro nam culpa magni ipsa quo soluta accusantium a amet, sed quas.</td>
                            <td><button className='btn btn-warning'>تعديل</button></td>
                            <td><button className='btn btn-error'>حدف</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompetitionBranches