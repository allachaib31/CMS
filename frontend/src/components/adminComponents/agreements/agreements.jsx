import React from 'react'
import { Outlet } from 'react-router-dom'

function Agreements() {
    return (
        <div className="py-[2rem]">
            <Outlet />
        </div>
    )
}

export default Agreements