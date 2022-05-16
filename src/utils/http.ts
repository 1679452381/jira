import qs from "qs"
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

    //* TS Utility Types (联合类型)
    //* TS中 typeof 在静态环境运行
    //* Parameters<typeof http>  读出函数类型的参数
    //* Partial<T> 将 T中属性都转为可选属性
    //* Omit<A, 'age'> 将A中的age属性删掉  Omit<A, 'age'|'name'>  将A中的age,name属性删掉
    //* Pick<T,any> 从T挑选一些属性组成新的类型
    //* (操作联合类型)Exclude<T,any> 从T中过滤掉一些属性 返回一个新的类型  操作联合类型
    return (...[enpoint, config]: Parameters<typeof http>) => http(enpoint, { ...config, token: token })
}


// interface A {
//     name: string,
//     age: string
// }
// const xiaoli: Partial<A> = { name: 'zxc' }

// const xiaoming: Omit<A, 'age'> = { name: 'zxc' }
// const xiaoming: Omit<A, 'age' | 'name'> = {}

//Partial实现
// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }