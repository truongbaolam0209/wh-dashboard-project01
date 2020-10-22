
import { Tooltip } from 'antd';
import React from 'react';
import { Bar, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { colorType } from '../assets/constant';
import { getDrawingLateNow } from '../utils/function';
import CardPanel from './ui/CardPanel';


const ChartBarLateApproval = ({ data, color, title }) => {


    let dataChart = [];
    data && Object.keys(data).forEach(project => {
        const drawingsLateApproval = getDrawingLateNow(data[project], 'getApproval');
        dataChart.push({
            name: project,
            value: drawingsLateApproval.length
        });
    });
    
   
    return (
        <CardPanel
            title={title}
            headColor={color}
            data={dataChart}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' textAnchor='end' angle={-20} interval={0} scale='point' padding={{ left: 50, right: 50 }} />
            <YAxis />
            <Tooltip />
            <Bar
                dataKey='value'
                fill={colorType.red}
                background={{ fill: '#eee', padding: '0 25px' }}
            >
                <LabelList dataKey='value' position='top' />
            </Bar>
        </CardPanel>

    );
};

export default ChartBarLateApproval;
