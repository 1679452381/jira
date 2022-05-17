import styled from "@emotion/styled"
import { Spin, Typography } from "antd"


export const FullLoadingPage = () => {
    return (
        <Fullpage >
            <Spin />
        </Fullpage>
    )
}

const Fullpage = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
    return (
        <Fullpage>
            {/* <Typography.Text type="danger">{error?.message}</Typography.Text> */}
            <ErrorBox error={error}></ErrorBox>
        </Fullpage>
    );
};

//类型守卫
const isError = (error: any): error is Error => error.meseage


const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error?.message}</Typography.Text>
    }
    return null
}