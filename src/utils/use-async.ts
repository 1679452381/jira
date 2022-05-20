//? 处理 loading error

import { useState } from "react"


interface State<D> {
    data: D | null,
    error: Error | null,
    stat: "idle" | "loading" | "error" | "success"
}

const defaultInitralState: State<null> = {
    data: null,
    error: null,
    stat: 'idle'
}

// *配置参数 是否手动抛出错误
const defaultConfig = {
    throwError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        ...initialConfig
    }
    const [state, setState] = useState({
        ...defaultInitralState,
        ...initialState
    })

    const setDate = (data: D) => setState({
        data,
        error: null,
        stat: 'success'
    })

    const setError = (error: Error) => setState({
        data: null,
        error,
        stat: 'error'
    })

    const [retry, setretry] = useState(() => () => { })

    // *发起异步请求
    const run = (promise: Promise<D>, retryConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setretry(() => () => {
            if (retryConfig?.retry) {
                run(retryConfig?.retry(), retryConfig);
            }
        })
        setState({ ...state, stat: "loading" })
        return promise.then(data => {
            setDate(data)
            return data
        }).catch(error => {

            setError(error)
            if (config.throwError)
                return Promise.reject(error)
            return error
        })
    }

    return {
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        run,
        retry,
        ...state
    }
}