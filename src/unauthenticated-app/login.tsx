import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth_context'



export default function LoginScreen() {

    const { user, login } = useAuth()


    // --middlewares _json_server_mock_/middleware.js 
    // --c _json_server_mock_/json_sever_config.json
    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        //阻止默认事件
        evt.preventDefault()

        const email = (evt.currentTarget.elements[0] as HTMLFormElement).value
        const password = (evt.currentTarget.elements[1] as HTMLFormElement).value

        login({ email, password })

    }

    return (
        <form onSubmit={handleSubmit}>
            {
                user ? <div>{user.name}</div> : ''
            }
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
