import { Row } from 'antd';
import React from 'react';


const Container = props => {

    const { deviceWidth, children } = props;

    return (
        <div style={{ margin: '20px 0'}}>
            {deviceWidth < 1000
                ? <>{children}</>
                : <Row justify='space-around'>{children}</Row>
            }
        </div>
    );
};

export default Container;
