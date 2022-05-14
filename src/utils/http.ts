import qs from "qs"
// import { useAuth } from "../context/auth_context"
import * as auth from './auth_provider'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    data?: object,
    token?: string,
}

//? 第二个参数 给予 默认值 {} 变成可选参数
export const http = (enpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {

    const config = {
        method: "GET",
        headers: {
            Authorization: token ? token : '',
            'Content-Type': data ? "application/json" : ''
        },
        ...customConfig
    }
    if (config.method.toLocaleUpperCase() === 'GET') {
        enpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data)
    }

    return window.fetch(`${apiUrl}/${enpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                //退出登录
                await auth.logout()
                // 重新加载页面
                window.location.reload()
                return Promise.reject({ 'message': '请重新登陆' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        }
        )
}

//?  每次发起请求 添加 token
export const useHttp = () => {

    // * 从localStorage中获取token
    const token = auth.getToken()

    // return ([enpoint, config]: [string, Config]) => http(enpoint, { ...config, token: token })

    //TODO ts操作符
    //* Parameters<typeof http>   ===  enpoint: string, { data, token, headers, ...customConfig }: Config
    return (...[enpoint, config]: Parameters<typeof http>) => http(enpoint, { ...config, token: token })
}