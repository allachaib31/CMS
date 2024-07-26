import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getUserComptetionInformationFetch } from '../../../utils/apiFetch';

function ContestStart() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        getUserComptetionInformationFetch(queryParams.get("id")).then((res) => {
            console.log(res)
            navigate("/client/contestStart/enterToBranches?id="+queryParams.get("id"))
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            if (err.response && err.response.status === 404){
                navigate("/client/contestStart/enterToCompetiton?id="+queryParams.get("id"))
            } else{
                navigate("/client/contest")
            }
        })
    }, [])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ContestStart