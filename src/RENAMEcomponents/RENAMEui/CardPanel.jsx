import { Card } from 'antd';
import React from 'react';

const CardPanel = ({ children, title, headColor }) => {



    return (
        <Card
            title={title}
            style={{
                margin: 0, boxShadow: '5px 15px 24px 5px #d2dae2',
                border: 'none',
                paddingBottom: 20,
                borderRadius: 20, overflow: 'hidden'
            }}
            bodyStyle={{
                margin: 'auto',
                padding: 0
            }}
            headStyle={{
                backgroundColor: headColor,
                lineHeight: '15px'

            }}
        >
            {children}
        </Card>
    );
};

export default CardPanel;
