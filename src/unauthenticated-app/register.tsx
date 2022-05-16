import { Button, Form, Input } from 'antd'
import React from 'react'
import { useAuth } from '../context/auth_context'
import {
    UserOutlined, LockOutlined, MailOutlined
} from '@ant-design/icons';


export default function RegisterScreen() {

    const { register } = useAuth()


    const handleSubmit = (vaules: { name: string, email: string, password: string }) => {
        register(vaules)
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'name'} rules={[{ required: true, message: '请输入用户名' }]}>
                <Input prefix={<UserOutlined />} placeholder='用户名' />
            </Form.Item>
            <Form.Item name={'email'} rules={[{ required: true, message: '请输入邮箱' }]}>
                <Input prefix={<MailOutlined />} placeholder='email' />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder='password' />
            </Form.Item>
            <Form.Item >
                <Button style={{ width: "100%" }} type='primary' htmlType='submit' >注册</Button>
            </Form.Item>
        </Form>
    )
}
