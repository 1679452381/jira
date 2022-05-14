import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth_context'



export default function LoginScreens() {

    const { user, register } = useAuth()

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        //阻止默认事件
        evt.preventDefault()

        const email = (evt.currentTarget.elements[0] as HTMLFormElement).value
        const password = (evt.currentTarget.elements[1] as HTMLFormElement).value
        const name = (evt.currentTarget.elements[0] as HTMLFormElement).value

        register({ name, email, password })

    }

    return (
        <form onSubmit={handleSubmit}>
            {
                user ? <div>{user.name}</div> : ''
            }
            <div>
                <label htmlFor="">
                    <span>账号</span>
                    <input type="text" placeholder='请输入邮箱' />
                </label>
            </div>
            <div>
                <label htmlFor="">
                    <span>密码</span>
                    <input type="password" placeholder='请输入密码' />
                </label>
            </div>
            <div>
                <label htmlFor="">
                    <span>用户名</span>
                    <input type="text" placeholder='请输入用户名' />
                </label>
            </div>
            <div>
                <button type="submit">注册</button>
            </div>
        </form>
    )
}
