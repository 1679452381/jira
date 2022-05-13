
const authLocalStorageKey = '__AUTH_TOKEN__'

export const getItem = () => window.localStorage.getItem(authLocalStorageKey)

interface Response {
    accessToken: string,
    user: {
        email: string
        id: number
    }
}

export const handleUserResponse = (response: Response) => {
    window.localStorage.setItem(authLocalStorageKey, response.accessToken || '')
    return response
}

const apiUrl = process.env.REACT_APP_API_URL


export const login = (data: { email: string, password: string }) => {
    fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(
        async response => {
            if (response.ok) {
                handleUserResponse(await response.json())
            }
        })
}

export const logout = () => window.localStorage.removeItem(authLocalStorageKey)


export const register = (data: { name: string, email: string, password: string }) => {
    fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(
        async response => {
            if (response.ok) {
                handleUserResponse(await response.json())
            }
        })
}

