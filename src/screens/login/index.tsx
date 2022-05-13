import React, { FormEvent } from 'react'
import { login, register } from '../../utils/auth_provider'


const apiUrl = process.env.REACT_APP_API_URL

export default function LoginScreens() {



    // --middlewares _json_server_mock_/middleware.js 
    // --c _json_server_mock_/json_sever_config.json
    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const email = (evt.currentTarget.elements[0] as HTMLFormElement).value
        const password = (evt.currentTarget.elements[1] as HTMLFormElement).value
        login({ email, password })
        console.log({ email, password });

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">
                    <span>账号</span>
                    <input type="text" placeholder='账号' />
                </label>
            </div>
            <div>
                <label htmlFor="">
                    <span>密码</span>
                    <input type="password" placeholder='密码' />
                </label>
            </div>
            <div>
                <button type="submit">登录</button>
            </div>
        </form>
    )
}
