import styled from '@emotion/styled'
import { Avatar, Button, Dropdown, Menu, Modal } from 'antd'
import React, { useState } from 'react'
import { useAuth } from '../context/auth_context'
import ProjectList from '../screens/project-list'
import { ReactComponent as LogoSvg } from '../assets/svg/logo.svg'


export default function AuthenticatedScreen() {
    const { user, logout } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        logout()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const items = [
        { label: <Button type='link'  >个人信息</Button>, key: 'userInfo' }, // 菜单项务必填写 key
        {
            label: <>
                <Button type='link' onClick={showModal} >退出账号</Button>
                <Modal
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width={"30rem"}
                >
                    <h3>确定退出吗？宝 🤪</h3>
                </Modal>
            </>, key: 'logout'
        },

    ];
    return (
        <Container>
            <Header>
                <HeaderLeft >
                    <LogoSvg fill='currentColor' color='#fadb14' height={'4.5rem'} />
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
                            <Button type='link' onClick={e => e.preventDefault()}>
                                Hi,{user?.name}
                            </Button>
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
    margin-left: 2rem;
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