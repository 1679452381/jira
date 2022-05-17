import React from 'react'
import { Route, Routes, Link, Navigate } from 'react-router-dom'
import EpicScreen from '../Epic'
import KanBanScreen from '../KanBan'

export default function ProjectScreen() {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path='kanban' element={< KanBanScreen />} />
                <Route path='epic' element={< EpicScreen />} />
                <Route index element={< Navigate to={'kanban'} replace={false} />} />
            </Routes>
        </div >
    )
}
