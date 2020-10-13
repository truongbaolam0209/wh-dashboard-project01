import { Modal, Table } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';


const TableDrawing = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Nos of drawing',
            dataIndex: 'noOfDrawing',
            sorter: {
                compare: (a, b) => a.noOfDrawing - b.noOfDrawing,
                multiple: 3,
            },
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: {
                compare: (a, b) => a.duration - b.duration,
                multiple: 2,
            },
        },
        {
            title: 'Productivity',
            dataIndex: 'productivity',
            sorter: {
                compare: (a, b) => a.productivity - b.productivity,
                multiple: 1,
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            noOfDrawing: 50,
            duration: '15 weeks',
            productivity: '70%',
        },
        {
            key: '2',
            name: 'Jim Green',
            noOfDrawing: 44,
            duration: '12 weeks',
            productivity: '85%',
        },
        {
            key: '3',
            name: 'Joe Black',
            noOfDrawing: 80,
            duration: '13 weeks',
            productivity: '60%',
        },
        {
            key: '4',
            name: 'Jim Red',
            noOfDrawing: 65,
            duration: '17 weeks',
            productivity: '78%',
        },
        {
            key: '5',
            name: 'Jonas Lim',
            noOfDrawing: 65,
            duration: '12 weeks',
            productivity: '44%',
        },
        {
            key: '6',
            name: 'Monas Lim',
            noOfDrawing: 65,
            duration: '12 weeks',
            productivity: '44%',
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };


    const [modalShown, setModalShown] = useState(false);
    const [drawingByPerson, setDrawingByPerson] = useState(false);

    const openDrawingTable = (staffName) => {
        setModalShown(true);
        setDrawingByPerson(staffName);
    };


    return (
        <div>
            <TableContainer
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{ total: data.length, pageSize: 5 }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: e => { openDrawingTable(e.target.parentElement.firstChild.innerHTML) }
                    };
                }}
            />
            <Modal
                title={'Drawings by ' + drawingByPerson}
                centered
                visible={modalShown}
                onOk={() => setModalShown(false)}
                onCancel={() => setModalShown(false)}
                width='75%'
            >
                <p>{drawingByPerson}</p>
            </Modal>
        </div>
    );
};


export default TableDrawing;

const TableContainer = styled(Table)`

    .ant-table-row .ant-table-cell:hover {
        cursor: pointer;
    }

`;

