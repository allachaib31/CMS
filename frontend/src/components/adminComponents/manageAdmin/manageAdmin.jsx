import React from 'react'
import { Outlet } from 'react-router-dom'

function ManageAdmin() {
    return (
        <div className="sm:container sm:mx-auto py-[2rem]">
            <Outlet />
        </div>
    )
}

export default ManageAdmin