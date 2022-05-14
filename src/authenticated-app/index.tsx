import React from 'react'
import { useAuth } from '../context/auth_context'
import ProjectList from '../screens/project-list'

export default function AuthenticatedScreen() {
    const { user, logout } = useAuth()
    return (
        <div>
            <button onClick={logout}>退出账号</button>
            {user?.name}
            <ProjectList />
        </div>
    )
}
