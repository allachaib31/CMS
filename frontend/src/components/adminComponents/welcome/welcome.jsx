import React, { useContext } from 'react'
import { UserContext } from "../../../screens/adminsScreen/home";
function Welcome() {
    const user = useContext(UserContext);
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh_-_6.034375rem)] '>
            <h1 className='font-bold text-[1.3rem]'>مرحبًا بك، {user.name}! لقد قمت بتسجيل الدخول كمسؤول.</h1>
        </div>
    )
}

export default Welcome