import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loading, LoginClient } from '../../components';
import { validationClientFetch } from '../../utils/apiFetch';


function AuthClient() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        validationClientFetch().then((res) => {
            console.log(res)
            navigate("/client");
        }).catch((err) => {
            setLoading((e) => !e)
        })
    }, []);
    return (
        <div>
            {
                loading ? <Loading /> : <LoginClient />
            }
        </div>
    )
}

export default AuthClient