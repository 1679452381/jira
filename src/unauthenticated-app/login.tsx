import { Button, Form, Input } from 'antd'
import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth_context'
import {
    UserOutlined, LockOutlined
} from '@ant-design/icons';


export default function LoginScreen() {

    const { user, login } = useAuth()

    // const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    //     //阻止默认事件
    //     evt.preventDefault()

    //     const email = (evt.currentTarget.elements[0] as HTMLFormElement).value
    //     const password = (evt.currentTarget.elements[1] as HTMLFormElement).value

    //     login({ email, password })

    // }

    const handleSubmit = (values: { email: string, password: string }) => {
        login(values)
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name={'email'}
                rules={[{ required: true, message: '请输入邮箱' }]}  >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder='请输入邮箱' />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[{ required: true, message: '请输入密码' }]} >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder='请输入密码'

                />
            </Form.Item>
            <Form.Item  >
                <Button style={{ width: "100%" }} type='primary' htmlType='submit' >登录</Button>
            </Form.Item>
        </Form>
    )
}
