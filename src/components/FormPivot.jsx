import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { colorType } from '../assets/constant';
import ButtonCapsule from './ui/ButtonCapsule';



const FormPivot = ({ projectName, data }) => {

    const { columnsIndexArray } = data;


    const [pivotArray, setPivotArray] = useState([]);
    const [titleLeft, setTitleLeft] = useState(Object.keys(columnsIndexArray));
    const [value, setValue] = useState('Select an option...');
    const [selected, setSelected] = useState(null);
    const [modalFormatVisible, setModalFormatVisible] = useState(false);
    const [modalDetailTableVisible, setModalDetailTableVisible] = useState(false);


    const onChange = value => {
        setValue('Select an option...');
        setSelected(value);
        if (columnsInDateFormat.includes(value)) {
            setModalFormatVisible(true);
        } else {
            setTitleLeft(titleLeft.filter(title => title !== value));
            setPivotArray([...pivotArray, value]);
        };
    };

    const selectFormat = (e) => {
        const formatType = e.target.textContent;
        setTitleLeft(titleLeft.filter(title => title !== selected));
        setPivotArray([...pivotArray, selected + ' - ' + formatType]);
        setModalFormatVisible(false);
    };

    const onCloseModalType = () => {
        setModalFormatVisible(false);
    };

    const onResetHandle = () => {
        setPivotArray([]);
        setTitleLeft(Object.keys(columnsIndexArray));
    };

    const onCloseModalDetail = () => {
        onResetHandle();
        setModalDetailTableVisible(false);
    };


    return (
        <div style={{ marginTop: '10px', padding: '20px' }}>
            {pivotArray.map(cl => (
                <Button key={cl} disabled={true} style={{ width: '100%', margin: '10px auto', display: 'table' }}>{cl}</Button>
            ))}

            <Select
                value={value}
                showSearch
                style={{ width: '100%', margin: '0 auto', display: 'table' }}
                placeholder='Select a title'
                optionFilterProp='children'
                onChange={onChange}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {titleLeft.map(cl => (
                    <Select.Option value={cl} key={cl}>{cl}</Select.Option>
                ))}
            </Select>
            <div style={{ display: 'flex' }}>
                <Button
                    style={{ background: colorType.grey0, width: '90%', margin: '10px auto' }}
                    onClick={() => setModalDetailTableVisible(true)}
                >Go to sorted table</Button>
                <Button
                    style={{ background: colorType.grey2, width: '90%', margin: '10px auto' }}
                    onClick={onResetHandle}
                >Reset</Button>
            </div>


            <Modal
                title='Select the format'
                visible={modalFormatVisible}
                onCancel={onCloseModalType}
                footer={null}
            >
                <ButtonCapsule btnname='Week' onClick={selectFormat} />
                <ButtonCapsule btnname='Month' onClick={selectFormat} />
                <ButtonCapsule btnname='Year' onClick={selectFormat} />
            </Modal>


            <Modal
                title='Sorted table'
                centered
                visible={modalDetailTableVisible}
                onOk={onCloseModalDetail}
                onCancel={onCloseModalDetail}
            >
                {/* SORTED TABLE SHOWN HERE */}
            </Modal>

        </div>
    );
};

export default FormPivot;


const columnsInDateFormat = [
    'Model Start(T)',
    'Model Start(A)',
    'Model Finish (T)',
    'Model Finish (A)',
    'Drawing Start (T)',
    'Drawing Finish (T)',
    'Drawing Start (A)',
    'Drawing Finish (A)',
    'Drg to Consultant (T)',
    'Drg to Consultant (A)',
    'get Approval (T)',
    'get Approval (A)'
];
