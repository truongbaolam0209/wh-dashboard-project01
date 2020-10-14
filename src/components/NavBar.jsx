import { DownCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, BackTop, Divider, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';


// https://medium.com/zestgeek/ant-design-navbar-with-responsive-drawer-a8d718e471e0

const NavBar = props => {

    const { children } = props;

    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setDeviceWidth(window.innerWidth));
        return () => window.removeEventListener('resize', () => setDeviceWidth(window.innerWidth));
    }, []);


    return (
        <Layout>
            <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 10px', height: 55 }}>
                <div style={{ paddingTop: 5 }}>


                    <Row style={{ float: 'left' }}>
                        <img width={150} src='./img/logo.png' />
                    </Row>


                    <Row style={{ float: 'right' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ color: 'white', paddingRight: 15 }}>
                                <div style={{ lineHeight: '22px', fontSize: 17, textAlign: 'right' }}>Jonas Shelomoh</div>
                                <div style={{ lineHeight: '20px', fontSize: 13, textAlign: 'right' }}>Project Director</div>
                            </div>
                            <Avatar size={40} icon='user' />
                            <Divider type='vertical' style={{ backgroundColor: '#f9ca24', height: 40, width: 1, margin: '0 15px' }} />
                            <MessageOutlined style={{ color: '#f9ca24', fontSize: 40, marginRight: 10 }} />
                            <DownCircleOutlined style={{ color: '#f9ca24', fontSize: 40, marginRight: 10 }} />
                        </div>
                    </Row>

                </div>



            </Layout.Header>


            <BackTop>
                <div style={{
                    zIndex: 1000,
                    height: 40,
                    width: 40,
                    lineHeight: '40px',
                    borderRadius: 4,
                    backgroundColor: '#1088e9',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 14,
                }}>UP</div>
            </BackTop>

            {children}

        </Layout>
    );
};

export default NavBar;
