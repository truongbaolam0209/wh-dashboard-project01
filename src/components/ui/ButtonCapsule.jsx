import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ButtonCapsule = props => {
    const { btnname, background } = props;

    return (
        <Container {...props} background={background} >
            {btnname}
        </Container >
    );
};

export default ButtonCapsule;

const Container = styled(Button)`
    &:hover {
        outline: none;
    }
    /* &:focus {
        outline: none;
    } */
    
    span {
        font-size: 12px
    }
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    padding: 5px;
    
    border-radius: 500px;
    background: ${props => props.background};
    
`;
