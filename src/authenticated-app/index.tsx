import styled from '@emotion/styled'
import { Avatar, Button, Dropdown, Image, Menu, Space } from 'antd'
import React from 'react'
import { useAuth } from '../context/auth_context'
import ProjectList from '../screens/project-list'

export default function AuthenticatedScreen() {
    const { user, logout } = useAuth()
    const items = [
        { label: '个人信息', key: 'item-1' }, // 菜单项务必填写 key
        { label: <a onClick={logout} >退出账号</a>, key: 'item-2' },

    ];
    return (
        <Container>
            <Header>
                <HeaderLeft >
                    <HeaderLeftItem>LOGO</HeaderLeftItem>
                    <HeaderLeftItem>项目</HeaderLeftItem>
                    <HeaderLeftItem>用户</HeaderLeftItem>
                </HeaderLeft>
                <HeaderRight>
                    {/* <button onClick={logout}>退出账号</button> */}
                    <HeaderRightItem>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </HeaderRightItem>
                    <HeaderRightItem>

                        <Dropdown
                            overlay={<Menu items={items} />}
                        >
                            <a onClick={e => e.preventDefault()}>
                                Hi,{user?.name}
                            </a>
                        </Dropdown>

                    </HeaderRightItem>
                </HeaderRight>
            </Header>
            <Main >
                <ProjectList />
            </Main>
        </Container>
    )
}



const Container = styled.div`
    display: flex;
    flex-direction: column;
    
`
const Header = styled.div`
    height: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    box-shadow: 0 0 .5rem 0 rgba(0,0,0,0.1);
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`

const HeaderLeftItem = styled.h3`
    margin-left: 2rem;
`

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2rem;
`
const HeaderRightItem = styled.h3`
    margin-right: 2rem;
`

const Main = styled.div``