import { Row } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { colorScheme } from '../assets/constant';
import ButtonCapsule from './ui/ButtonCapsule';
import CardPanel from './ui/CardPanel';

const ChartBarProject = props => {

    const dummy = [
        { name: 'Sumang', year: 2012, delayConstruction: 4000, delayApproval: 4800, productivity: 0.75 },
        { name: 'Garden', year: 2013, delayConstruction: 4700, delayApproval: 5900, productivity: 0.55 },
        { name: 'Jokoon', year: 2014, delayConstruction: 3500, delayApproval: 3750, productivity: 0.4 },
        { name: 'Kembangan', year: 2015, delayConstruction: 4150, delayApproval: 3300, productivity: 0.6 },
        { name: 'KCDE', year: 2016, delayConstruction: 3500, delayApproval: 2210, productivity: 0.75 },
        { name: 'Handy', year: 2017, delayConstruction: 2100, delayApproval: 2800, productivity: 0.95 },
        { name: 'Funan', year: 2018, delayConstruction: 2780, delayApproval: 1850, productivity: 0.7 },
        { name: 'Gul Circle', year: 2019, delayConstruction: 1890, delayApproval: 2160, productivity: 0.2 },
        { name: 'Changi T5', year: 2020, delayConstruction: 2390, delayApproval: 2650, productivity: 0.4 },
        { name: 'Dleedon', year: 2021, delayConstruction: 3490, delayApproval: 2170, productivity: 0.75 },
    ];

    const { deviceWidth, title } = props;

    const [data, setData] = useState(_.sortBy(dummy, e => e.year));
    
    const chartWidth = deviceWidth <= 1000 ? deviceWidth : (deviceWidth - 80) / 3;

    const chartScheme = {
        chartType: title === 'Productivity' ? 'productivity' : title === 'No of drawing delay (for construction)' ? 'construction' : 'approval',
        chartColor: title === 'Productivity' ? colorScheme.yellow : title === 'No of drawing delay (for construction)' ? colorScheme.red : colorScheme.green,
        chartData: title === 'Productivity' ? 'productivity' : title === 'No of drawing delay (for construction)' ? 'delayConstruction' : 'delayApproval',
    };
    
    console.log(chartWidth);

    return (
        <CardPanel title={title} headColor={chartScheme.chartColor}>

            <div style={{padding: '10px 0 0 10px'}}>
                <Row>
                    <ButtonCapsule btnname='Ascending year' onClick={() => setData(_.sortBy(dummy, e => e.year))} />
                    <ButtonCapsule btnname='Descending year' onClick={() => setData(_.sortBy(dummy, e => -e.year))} />
                </Row>
                <Row>
                    <ButtonCapsule
                        btnname={'Ascending ' + chartScheme.chartType}
                        onClick={() => setData(_.sortBy(dummy, e => e[chartScheme.chartData]))}
                    />
                    <ButtonCapsule
                        btnname={'Descending ' + chartScheme.chartType}
                        onClick={() => setData(_.sortBy(dummy, e => -e[chartScheme.chartData]))}
                    />
                </Row>
            </div>

            <BarChart
                width={chartWidth}
                height={320}
                data={data}
                margin={{ top: 35, right: 30, left: 0, bottom: 50 }}
                padding={{top: 10 }}
                barSize={20}
            >
                <XAxis dataKey='name' textAnchor='end' angle={-45} interval={0} scale='point' padding={{ left: 15, right: 10 }} />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray='3 3' />
                <Bar
                    dataKey={chartScheme.chartData}
                    fill={chartScheme.chartColor}
                    background={{ fill: '#eee' }}
                />
            </BarChart>

        </CardPanel>
    );
};

export default ChartBarProject;

// const StyledBarChart = styled(BarChart)`
//     .recharts-cartesian-axis-tick-value {
//         transform: rotate(0);
//     }
// `;

