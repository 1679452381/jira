import React, { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../screens/project-list/search_panel'
import * as auth from '../utils/auth_provider'

const AuthContext = createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>
    register: (form: RegisterForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined)
// React DevTools 使用该字符串来确定 context 要显示的内容
AuthContext.displayName = 'AuthContext'

interface AuthForm {
    email: string,
    password: string
}
interface RegisterForm {
    name: string,
    email: string,
    password: string
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: RegisterForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{ user, login, logout, register }} />
}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth只有在AuthProvider下使用')
    }
    return context
}
