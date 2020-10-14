import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { colorScheme, sizeScheme } from '../assets/constant';
import { countAllSameData } from '../utils/function';


const ChartBarDrawing = props => {


    const { deviceWidth, project } = props;
    const chartWidth = deviceWidth < sizeScheme.lg ? deviceWidth - 40 : 300;


    const countAllRev = countAllSameData(project, 'Rev').filter(rev => rev.name !== 'undefined' && rev.name !== '-');


    return (
        <div style={{ margin: '0 auto', display: 'table' }}>
            <BarChart
                width={chartWidth}
                height={350}
                data={countAllRev}
                margin={{ top: 35, right: 30, left: 0, bottom: 20 }}
                padding={{ top: 10 }}
                barSize={20}
            >
                <XAxis dataKey='name' textAnchor='end' angle={-45} interval={0} scale='point' padding={{ left: 15, right: 10 }} />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray='3 3' />
                <Bar
                    dataKey='value'
                    fill={colorScheme.grey2}
                    background={{ fill: colorScheme.grey0 }}
                >
                    <LabelList dataKey='value' position='top' />
                </Bar>

            </BarChart>
        </div>

    );
};

export default ChartBarDrawing;


