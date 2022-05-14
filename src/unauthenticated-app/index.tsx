import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'

export default function UnAuthenticatedScreen() {
    const [isRegister, setIsRegister] = useState(false)

    return (
        <div>
            {
                isRegister ? <RegisterScreen /> : <LoginScreen />
            }
            {
                isRegister
                    ? <button onClick={() => setIsRegister(!isRegister)}>已有帐号，去登陆</button>
                    : <button onClick={() => setIsRegister(!isRegister)}>还没有账号？点击注册</button>
            }
        </div>
    )
}
