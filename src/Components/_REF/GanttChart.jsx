import { Input, Space, Table } from 'antd';
import React from 'react';



const GanttChart = () => {

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Duration',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Start',
            key: 'address',
            width: '100px',
            render: text => (
                <Space size='middle'>
                    <Input bordered={false} />
                </Space>
            ),
        },
        {
            title: 'Finish',
            key: 'action',
            width: '100px',
            render: text => (
                <Space size='middle'>
                    <Input bordered={false} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];


    return (

        <Table
            columns={columns}
            dataSource={data}
            bordered={true}
        />
    );
};

export default GanttChart;