import { Button, Modal, Select } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { colorScheme } from '../assets/constant';
import ButtonCapsule from './ui/ButtonCapsule';



const FormPivot = props => {

    const { project } = props;


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
        'get Approval (A)',
    ];


    const [pivotArray, setPivotArray] = useState([]);
    const [titleLeft, setTitleLeft] = useState(_.map(project.columns, 'title'));
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
        const formatType = e.target.attributes.getNamedItem('btnname').nodeValue;
        setTitleLeft(titleLeft.filter(title => title !== selected));
        setPivotArray([...pivotArray, selected + ' - ' + formatType]);
        setModalFormatVisible(false);
    };


    const onResetHandle = () => {
        setPivotArray([]);
        setTitleLeft(_.map(project.columns, 'title'));
    };


    return (
        <div style={{ marginTop: '10px', padding: '20px' }}>
            {pivotArray.map(cl => (
                <div key={cl}>
                    <Button disabled={true} style={{ width: '100%', margin: '10px auto', display: 'table' }}>{cl}</Button>
                </div>
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
                    style={{ background: colorScheme.grey2, width: '90%', margin: '10px auto' }}
                    onClick={() => setModalDetailTableVisible(true)}
                >
                    Go to sorted table
                </Button>
                <Button
                    style={{ background: colorScheme.grey, width: '90%', margin: '10px auto' }}
                    onClick={onResetHandle}
                >
                    Reset
                    </Button>
            </div>



            <Modal
                title='Select the format'
                visible={modalFormatVisible}
                footer={null}
            >
                <ButtonCapsule btnname='Week' onClick={selectFormat} />
                <ButtonCapsule btnname='Month' onClick={selectFormat} />
                <ButtonCapsule btnname='Year' onClick={selectFormat} />
            </Modal>


            {/* Modal for detail table & bar chart */}

        </div>
    );
};

export default FormPivot;
