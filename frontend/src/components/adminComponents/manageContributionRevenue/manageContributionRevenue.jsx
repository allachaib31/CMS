import React from 'react'
import { Outlet } from 'react-router-dom'

function ManageContributionRevenue() {
    return (
        <div className="sm:container sm:mx-auto py-[2rem]">
            <Outlet />
        </div>
    )
}

export default ManageContributionRevenue