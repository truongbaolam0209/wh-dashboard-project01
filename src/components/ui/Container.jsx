import { Row } from 'antd';
import React from 'react';
// import { sizeScheme } from '../../assets/constant';

const Container = props => {

    const { deviceWidth, children, style } = props;

    return (
        <div style={style}>
            <Row justify='space-around'>{children}</Row>
            {/* {deviceWidth && deviceWidth < sizeScheme.lg
                ? <>{children}</>
                : <Row justify='space-around'>{children}</Row>
            } */}
        </div>
    );
};

export default Container;
