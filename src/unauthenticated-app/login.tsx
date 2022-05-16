import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useAuth } from '../context/auth_context'
import {
    UserOutlined, LockOutlined
} from '@ant-design/icons';
import { useAsync } from '../utils/use-async';

const loginResult = {
    'Cannot find user': '该用户不存在',
    'Incorrect password': '密码错误',
    'Email format is invalid': "请输入有效邮箱"
}
export default function LoginScreen({ onError }: { onError: (error: Error) => void }) {

    const { login } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwError: true })

    const handleSubmit = async (values: { email: string, password: string }) => {

        // ! try catch 不能直接捕获到异步函数 Promise 抛出的错误 要加 async await
        // login(values).catch(err => onError(new Error(err)))
        // run(login(values)).catch(err => onError(new Error(err)))
        try {
            await run(login(values))
            message.success('登录成功')
        } catch (error: any) {
            // * unkonw 不能赋值给其他类型
            onError(new Error(error))
        }

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
                <Button loading={isLoading} style={{ width: "100%" }} type='primary' htmlType='submit' >登录</Button>
            </Form.Item>
        </Form>
    )
}
