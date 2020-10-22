
import { Tooltip } from 'antd';
import React from 'react';
import { Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { pieChartColors } from '../assets/constant';
import { getAllDrawingSameValueInOneColumn, mergeUndefined } from '../utils/function';
import CardPanel from './ui/CardPanel';


const ChartBarDrawingStatus = ({ data, title, color }) => {

    return (

        <CardPanel
            title={title}
            headColor={color}
            data={convertDataToStackedChart(data).dataChart}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis tickSize={3} dataKey='name' textAnchor='end' angle={-20} interval={0} scale='point' padding={{ left: 50, right: 50 }} />
            <YAxis />
            <Tooltip />
            {convertDataToStackedChart(data).itemArr.map((item, i) => (
                <Bar
                    key={item}
                    dataKey={item}
                    stackId='a'
                    fill={pieChartColors[i]}
                />
            ))}
        </CardPanel>
    );
};

export default ChartBarDrawingStatus;




const convertDataToStackedChart = (data) => {
    let dataChart = [];
    let allKeys = [];
    data && Object.keys(data).forEach(project => {
        const { drawingCount, drawingList } = mergeUndefined(getAllDrawingSameValueInOneColumn(data[project], 'Status'), 'Not Started');
        dataChart.push({ ...drawingCount, name: project });
        allKeys = [...allKeys, ...Object.keys(drawingCount)];
    });
    const itemArr = [...new Set(allKeys)];

    itemArr.forEach(key => {
        dataChart.forEach(projectData => {
            if (key in projectData) return;
            projectData[key] = 0;
        });
    });

    return {
        dataChart,
        itemArr
    };
};





