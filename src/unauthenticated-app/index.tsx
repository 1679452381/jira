import styled from '@emotion/styled'
import { Button, Card, Divider, Typography } from 'antd'
import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'
import { ReactComponent as LogoSvg } from '../assets/svg/logo.svg'



export default function UnAuthenticatedScreen() {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    return (
        <Container>
            <Header >
                <LogoSvg fill='currentColor' color='#fadb14' height={'5.5rem'} />
                <h1>Jira</h1>
            </Header>
            <ShadowCard >
                <Title >{isRegister ? "请注册" : "请登陆"}</Title>
                {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
                {/* {error ? <Alert message={error.message} type="error" /> : null} */}
                {
                    isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
                }
                <Divider />
                <Button type='link' onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已有帐号，去登陆" : "还没有账号？点击注册"}
                </Button>
            </ShadowCard>
        </Container>
    )
}

const Title = styled.h2`
    color: #1f1f1f;
    font-size: 1.7rem;
    text-align: center;
    margin-bottom: 2rem;
`

const Header = styled.div`
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        margin-top: 1rem;
    }

`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 45rem;
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