import React, { useContext } from 'react'
import { UserContext } from "../../../screens/adminsScreen/home";
function Welcome() {
    const user = useContext(UserContext);
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh_-_6.034375rem)] '>
            <h1 className='font-bold text-lg'>مرحبًا بك: {user.name.split(" ")[0]} {user.name.split(" ")[1]}! لقد تم دخولك بنجاح.</h1>

        </div>
    )
}

export default Welcome