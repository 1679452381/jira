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

export const useAsync = <D>(initialState?: State<D>) => {
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

    // *发起异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setState({ ...state, stat: "loading" })
        return promise.then(data => {
            setDate(data)
            return data
        }).catch(error => {
            setError(error)
            return error
        })
    }

    return {
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        run,
        ...state
    }
}