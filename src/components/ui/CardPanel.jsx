import { Card, Col } from 'antd';
import React from 'react';
import { sizeType } from '../../assets/constant';



const CardPanel = ({ children, title, headColor }) => {

    const width = window.innerWidth >= sizeType.xl ? (window.innerWidth - 160) / 4 :
        window.innerWidth >= sizeType.md ? (window.innerWidth - 80) / 2 :
            window.innerWidth - 100;


    return (
        <Col style={{ padding: '0 15px' }} xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}>
            <Card
                title={title}
                style={{
                    margin: 0, boxShadow: '5px 15px 24px 5px #d2dae2',
                    border: 'none',
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderRadius: 20, overflow: 'hidden'
                }}
                bodyStyle={{
                    margin: 'auto',
                    padding: 0
                }}
                headStyle={{
                    backgroundColor: headColor,
                    color: 'white',
                    lineHeight: '15px'
                }}
            >
                {children}
            </Card>
        </Col>
    );
};


export default CardPanel;
