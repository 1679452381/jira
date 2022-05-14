import { User } from "../screens/project-list/search_panel"

const authLocalStorageKey = '__AUTH_TOKEN__'

export const getItem = () => window.localStorage.getItem(authLocalStorageKey)

interface Response {
    accessToken: string,
    user: User
}

export const handleUserResponse = (response: Response) => {
    window.localStorage.setItem(authLocalStorageKey, response.accessToken || '')
    return response.user
}

const apiUrl = process.env.REACT_APP_API_URL


export const login = (data: { email: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(
        async response => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            } else {
                return Promise.reject(data)
            }
        })
}

export const logout = async () => window.localStorage.removeItem(authLocalStorageKey)



export const register = (data: { name: string, email: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(
        async response => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            } else {
                return Promise.reject(data)
            }
        })
}
