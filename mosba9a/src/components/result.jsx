import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserResultFetch } from '../utils/apiFetch';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [points, setPoints] = useState(false);
  const [timing, setTiming] = useState(false);
  useEffect(() => {
    getUserResultFetch(queryParams.get("id")).then((res) => {
      setPoints(res.data.point);
      setTiming(res.data.timing);
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate("/authClient");
      }
    });
  }, [])
  return (
    <div className='container mx-auto min-h-screen flex items-center w-full'>
      <div className='w-full flex flex-col p-[3rem] justify-center items-center backdrop-blur-xl bg-black/40'>
        {
          points && <>
            <h1 className='text-center text-primary font-bold text-3xl'>النقطة النهائية {points} </h1>
            <p className='text-center text-primary font-bold text-3xl'>في {timing} ثانية</p>
          </>
        }
      </div>
    </div>
  )
}

export default Result