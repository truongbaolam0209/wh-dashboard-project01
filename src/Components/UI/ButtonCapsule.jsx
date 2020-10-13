import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ButtonCapsule = props => {
    const { btnname } = props;
    return (
        <Container {...props}>
            {btnname}
        </Container>
    );
};

export default ButtonCapsule;

const Container = styled(Button)`
    &:hover {
        /* background: yellow */
    }
    
    span {
        font-size: 12px
    }
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    padding: 5px;
    
    border-radius: 500px;
    font-size: 11px;
    background: '#bdc3c7'
`;
