import React, { useEffect, useState } from 'react'
import { getClientAdvertisingFetch } from '../../../utils/apiFetch'
import { useNavigate } from 'react-router-dom';

function AdvertisingClient() {
    const navigate = useNavigate();
    const [advertising, setAdverttising] = useState(false);
    useEffect(() => {
        getClientAdvertisingFetch().then((res) => {
            setAdverttising(res.data.advertising)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        });
    }, [])
    return (
        <div className="px-[1rem] sm:px-0 py-[2rem]">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                {" "}
                الاعلانات
            </h1>
            <div className='container mx-auto'>
                {
                    advertising && advertising.map((ad) => {
                        const parser = new DOMParser();
                        const dom = parser.parseFromString(
                            ad.text,
                            "text/html"
                        );
                        return (
                            <div className='bg-base-200' dangerouslySetInnerHTML={{ __html: dom.body.innerHTML }}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdvertisingClient