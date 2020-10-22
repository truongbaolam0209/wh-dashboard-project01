
import { Tooltip } from 'antd';
import React from 'react';
import { Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { colorType } from '../assets/constant';
import CardPanel from './ui/CardPanel';



const ChartBarProductivity = ({ title, color }) => {


    const data = [
        {
            name: 'Handy', uv: 4000, pv: 2400, amt: 2400, xc: 1500
        },
        {
            name: 'Sumang', uv: 3000, pv: 1398, amt: 2210, xc: 1200
        },
    ];


    return (

        <CardPanel
            title={title}
            headColor={color}
            data={data}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' textAnchor='end' angle={-20} interval={0} scale='point' padding={{ left: 50, right: 50 }} />
            <YAxis />
            <Tooltip />

            <Bar dataKey="pv" stackId="a" fill={colorType.red} />
            <Bar dataKey="uv" stackId="a" fill={colorType.orange} />
            <Bar dataKey="amt" stackId="a" fill={colorType.green} />
            <Bar dataKey="xc" stackId="a" fill={colorType.blue} />
        </CardPanel>
    );
};

export default ChartBarProductivity;



