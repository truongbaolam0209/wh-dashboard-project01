
import { Tooltip } from 'antd';
import React from 'react';
import { Bar, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { colorType } from '../assets/constant';
import CardPanel from './ui/CardPanel';


const ChartBarLateConstruction = ({ title, color }) => {


    const dataDummy = [
        { name: 'Sumang', count: 15 },
        { name: 'Handy', count: 6 },
    ];


    return (
        <CardPanel
            title={title}
            headColor={color}
            data={dataDummy}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' textAnchor='end' angle={-20} interval={0} scale='point' padding={{ left: 50, right: 50 }} />
            <YAxis />
            <Tooltip />
            <Bar
                dataKey='count'
                fill={colorType.red}
                background={{ fill: '#eee', padding: '0 25px' }}
            >
                <LabelList dataKey='count' position='top' />
            </Bar>
        </CardPanel>
    );
};

export default ChartBarLateConstruction;