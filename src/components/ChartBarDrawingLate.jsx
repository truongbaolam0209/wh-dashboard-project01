
import { Badge, Tooltip } from 'antd';
import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { chartWidth, colorType, sizeType } from '../assets/constant';
import { getDrawingLateNow } from '../utils/function';
import CardPanel from './ui/CardPanel';



const ChartBarDrawingLate = ({ data, title }) => {


    let dataChart = [];
    data && Object.keys(data).forEach(project => {
        const drawingsLateApproval = getDrawingLateNow(data[project], 'getApproval');
        dataChart.push({
            name: project,
            value: drawingsLateApproval.length
        });
    });


    const dummyLateConstruction = [
        { name: 'Sumang', value: 15 },
        { name: 'Handy', value: 6 },
    ];

    const inputData = title === 'No Of Drawing Late Construction' ? dummyLateConstruction
        : title === 'No Of Drawing Late Approval' ? dataChart : null

    return (

        <CardPanel
            title={title}
            headColor={colorType.red}
        >
            <BarChart
                data={inputData}
                width={chartWidth}
                height={320}
                margin={{ top: 35, right: 20, left: 15, bottom: 30 }}
                padding={{ top: 10 }}
                barSize={30}
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
            </BarChart>

            <div style={{ paddingLeft: 50, height: window.innerWidth >= sizeType.xl && 180 }}>
                {inputData && inputData.map(item => (
                    <div key={item.name} style={{ display: 'flex' }}>
                        <StyledBadge
                            size='small'
                            color={colorType.red}
                            text={item.name}
                        />
                        <span style={{ paddingLeft: 5 }}>{`- (${item.value})`}</span>
                    </div>
                ))}
            </div>

        </CardPanel>
    );
};

export default ChartBarDrawingLate;



const StyledBadge = styled(Badge)`
    .ant-badge-status-dot {
        width: 15px;
        height: 15px;
        border-radius: 0;
    }
`;