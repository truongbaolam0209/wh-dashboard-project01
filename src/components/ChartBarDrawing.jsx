import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { colorScheme, sizeScheme } from '../assets/constant';




const ChartBarDrawing = props => {

    const data = [
        { name: 'Rev 0', nos: 350 },
        { name: 'Rev A', nos: 211 },
        { name: 'Rev B', nos: 256 },
        { name: 'Rev C', nos: 58 },
        { name: 'Rev D', nos: 42 }
    ];

    const { deviceWidth } = props;
    const chartWidth = deviceWidth < sizeScheme.lg ? deviceWidth - 40 : 300;

    return (
        <div style={{ margin: '0 auto', display: 'table' }}>
            <BarChart
                width={chartWidth}
                height={350}
                data={data}
                margin={{ top: 35, right: 30, left: 0, bottom: 20 }}
                padding={{ top: 10 }}
                barSize={20}
            >
                <XAxis dataKey='name' textAnchor='end' angle={-45} interval={0} scale='point' padding={{ left: 15, right: 10 }} />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray='3 3' />
                <Bar
                    dataKey='nos'
                    fill={colorScheme.grey2}
                    background={{ fill: colorScheme.grey }}
                >
                    <LabelList dataKey='nos' position='insideTop' />
                </Bar>
                
            </BarChart>
        </div>

    );
};

export default ChartBarDrawing;


