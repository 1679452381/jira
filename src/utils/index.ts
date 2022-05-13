import { useEffect, useState } from "react"

const isFalsy = (value: string | number) => value === 0 ? false : !value

export const CleanObj = (object: object) => {
    const result = { ...object }

    Object.keys(result).forEach(key => {

        //@ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}

// ? 自定义hook

// * 在页面加载时 运行一次
export const useMount = (fn: () => void) => {
    useEffect(() => {
        fn()
    }, [])
}


// * 防抖
export const useDebounce = <T>(value: T, delay?: number): any => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        // 每次value变化 就设置一个定时器
        const t = setTimeout(() => { setDebouncedValue(value) }, delay)
        // 清理上次useEffect的定时器
        return () => clearTimeout(t)
    }, [delay, value])

    return debouncedValue
}