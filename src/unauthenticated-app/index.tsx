import styled from '@emotion/styled'
import { Button, Card, Divider } from 'antd'
import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'

export default function UnAuthenticatedScreen() {
    const [isRegister, setIsRegister] = useState(false)

    return (
        <Container>
            <Header />
            <ShadowCard >
                <Title >{isRegister ? "请注册" : "请登陆"}</Title>
                {
                    isRegister ? <RegisterScreen /> : <LoginScreen />
                }
                <Divider />
                <a type='primary' onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已有帐号，去登陆" : "还没有账号？点击注册"}
                </a>
            </ShadowCard>
        </Container>
    )
}

const Title = styled.h2`
    color: #1f1f1f;
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 2rem;
`

const Header = styled.div`
    height: 1rem;
`

const ShadowCard = styled(Card)`
    width: 26 rem;
    min-height: 33rem;
    box-sizing: border-box;
    border-radius: 0.1rem;
    padding: 3.2rem 4rem;
    :hover{
        box-shadow:rgba(0,0,0,0.1) 0 0 1.4rem ;
    }
    text-align: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    min-height: 100vh;
`