import {
    AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Button, Drawer, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';


const SidePanel = props => {

    const { children } = props;
    const [visible, setVisible] = useState(true);
    const [collapsed, setCollapsed] = useState(false);


    return (
        <Container>
            <Button type='primary' onClick={() => setVisible(!visible)}>Open</Button>
            <Drawer
                title='Basic Drawer'
                placement='left'
                closable={false}
                onClose={() => setVisible(!visible)}
                visible={visible}
                mask={false}
                width={300}
            >
                <Button 
                    type='primary' 
                    style={{ marginBottom: 16 }}
                    onClick={() => setCollapsed(!collapsed)}
                > 
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='dark'
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key='1' icon={<PieChartOutlined />}>Option 1</Menu.Item>
                    <Menu.Item key='2' icon={<DesktopOutlined />}>Option 2</Menu.Item>
                    <Menu.Item key='3' icon={<ContainerOutlined />}>Option 3</Menu.Item>

                    <Menu.SubMenu key='sub1' icon={<MailOutlined />} title='Navigation One'>
                        <Menu.Item key='5'>Option 5</Menu.Item>
                        <Menu.Item key='6'>Option 6</Menu.Item>
                        <Menu.Item key='7'>Option 7</Menu.Item>
                        <Menu.Item key='8'>Option 8</Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key='sub2' icon={<AppstoreOutlined />} title='Navigation Two'>
                        <Menu.Item key='9'>Option 9</Menu.Item>
                        <Menu.Item key='10'>Option 10</Menu.Item>
                        <Menu.SubMenu key='sub3' title='Submenu'>
                            <Menu.Item key='11'>Option 11</Menu.Item>
                            <Menu.Item key='12'>Option 12</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>

                </Menu>
            </Drawer>

            <Layout>
                {children}
            </Layout>

        </Container>
    );
};


const Container = styled(Layout)`
  min-height: 100vh;
`

export default SidePanel;
