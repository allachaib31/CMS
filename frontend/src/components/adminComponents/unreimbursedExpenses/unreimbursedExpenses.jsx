import React from 'react'
import { Outlet } from 'react-router-dom'

function UnreimbursedExpenses() {
    return (
        <div className="py-[2rem]">
            <Outlet />
        </div>
    )
}

export default UnreimbursedExpenses