import { Button, Card } from 'antd'
import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'

export default function UnAuthenticatedScreen() {
    const [isRegister, setIsRegister] = useState(false)

    return (
        <Card style={{ width: '20rem' }}>
            <div>
                {
                    isRegister ? <RegisterScreen /> : <LoginScreen />
                }
                {
                    isRegister
                        ? <a type='primary' onClick={() => setIsRegister(!isRegister)}>已有帐号，去登陆</a>
                        : <a type='primary' onClick={() => setIsRegister(!isRegister)}>还没有账号？点击注册</a>
                }
            </div>
        </Card>
    )
}
