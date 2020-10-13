import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';




const ChartBarDrawing = props => {

    const data = [
        {
            name: 'Total Drawing', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Late For Construction', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Overdue Date Of Submission', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Overdue Date Of Approval', uv: 2780, pv: 3908, amt: 2000,
        }
    ];

    const { deviceWidth } = props;
    const chartWidth = deviceWidth < 1000 ? deviceWidth - 40 : 300;

    return (

        <BarChart
            width={chartWidth}
            height={320}
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='pv' fill='#8884d8' />
        </BarChart>

    );
};

export default ChartBarDrawing;


