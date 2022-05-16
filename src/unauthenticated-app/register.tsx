import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useAuth } from '../context/auth_context'
import {
    UserOutlined, LockOutlined, MailOutlined
} from '@ant-design/icons';
import { useAsync } from '../utils/use-async';


export default function RegisterScreen({ onError }: { onError: (error: Error) => void }) {

    const { register } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwError: true })


    const handleSubmit = async ({ cpassword, ...values }: { cpassword: string, name: string, email: string, password: string }) => {
        if (cpassword !== values.password) {
            return onError(new Error('两次密码不相同'))
        }
        // run(register(values)).catch(err => onError(new Error(err)))

        try {
            run(register(values))
            message.success('注册成功')
        } catch (error: any) {
            onError(new Error(error))
        }
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
            <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder='password' />
            </Form.Item>
            <Form.Item >
                <Button loading={isLoading} style={{ width: "100%" }} type='primary' htmlType='submit' >注册</Button>
            </Form.Item>
        </Form>
    )
}
