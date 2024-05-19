import React, { useEffect, useState } from 'react';
import { Loading, Login } from '../../components';
import { validationFetch } from '../../utils/apiFetch';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    validationFetch().then((res) => {
      console.log(res)
      navigate("/");
    }).catch((err) => {
      setLoading((e) => !e)
    })
  }, []);
  return (
    <div>
      {
        loading ? <Loading /> : <Login />
      }
    </div>
  )
}

export default Auth