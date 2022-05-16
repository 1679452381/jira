import { PropsWithChildren, Component } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends Component<PropsWithChildren<{ fallbackRender: FallbackRender }>, any> {
    state = {
        error: null
    }

    static getDerivedStateFromError(error: Error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { error };
    }

    render() {
        const { error } = this.state

        const { fallbackRender, children } = this.props
        if (error) {
            // 你可以自定义降级后的 UI 并渲染
            return fallbackRender({ error })
        }

        return children;
    }
}