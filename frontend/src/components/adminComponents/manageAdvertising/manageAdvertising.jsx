import React from 'react'
import { Outlet } from 'react-router-dom'

function ManageAdvertising() {
    return (
        <div className="py-[2rem]">
            <Outlet />
        </div>
    )
}

export default ManageAdvertising