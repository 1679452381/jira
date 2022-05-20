import { useEffect, useRef, useState } from "react"


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
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {

    const oldTitle = useRef(document.title).current;

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin

/**
 * *  返回组件挂在状态，如果未挂载 或者已卸载则返回fasle
 */
export const useMountRef = () => {
    const mountRef = useRef(false)
    useEffect(() => {
        mountRef.current = true
        return () => { mountRef.current = false }
    })
    return mountRef
}