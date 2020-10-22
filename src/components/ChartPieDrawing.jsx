import { Badge, Tooltip } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import styled from 'styled-components';
import { pieChartColors } from '../assets/constant';
import { getAllDrawingSameValueInOneColumn, mergeUndefined } from '../utils/function';




const ChartPieDrawing = ({ data, openDrawingTable, projectName }) => {

    const { drawingCount, drawingList } = mergeUndefined(getAllDrawingSameValueInOneColumn(data, 'Status'), 'Not Started');
    const dataChart = _.map(drawingCount, (value, name) => ({ name, value }));


    const onClick = (portion) => {
        openDrawingTable(
            projectName,
            'Drawing Status' + portion.name,
            drawingList[portion.name]
        );
    };

    // const [activeIndex, setActiveIndex] = useState(null);
    // const onMouseEnter = (data, index) => {
    //     setActiveIndex(index);
    // };
    // const onMouseLeave = (data, index) => {
    //     setActiveIndex(null);
    // };


    return (
        <>
            <PieChart width={300} height={300} style={{ margin: '0 auto' }}>
                <Pie
                    data={dataChart}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey='value'
                    outerRadius={100}
                    onClick={onClick}
                    // onMouseEnter={onMouseEnter}
                    // onMouseLeave={onMouseLeave}
                >
                    {dataChart.map((entry, index) => (
                        <Cell
                            cursor='pointer'
                            key={`cell-${index}`}
                            fill={pieChartColors[index % pieChartColors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <div style={{ margin: '0 auto', display: 'table' }}>
                {dataChart.map(item => (
                    <div key={item.name}>
                        <StyledBadge
                            size='small'
                            color={pieChartColors[dataChart.indexOf(item)]}
                            text={item.name}
                        />
                    </div>
                ))}
            </div>

            {/* <Modal
                title={'Drawings by ' + statusClicked.name}
                centered
                visible={modalShown}
                onOk={drawingStatusTableOnClose}
                onCancel={drawingStatusTableOnClose}
                width='90%'
                height='90%'
            >
                <p>{statusClicked.name}</p>
                <h2>{Math.round(statusClicked.percent * 100) + '%'}</h2>
                <TableDrawingList data={pickDataToTalbe(drawingByPortions, columnsIndexArray)} />
            </Modal> */}
        </>
    );
};

export default ChartPieDrawing;


const StyledBadge = styled(Badge)`
    .ant-badge-status-dot {
        width: 15px;
        height: 15px;
        border-radius: 0;
    }
`;




const pickDataToTalbe = (drawings, columnsIndexArray) => {

    let dwgArray = [];
    drawings.forEach(dwg => {
        const drawingNumber = dwg[columnsIndexArray['Drawing Number']].value || 'N/A';
        const drawingName = dwg[columnsIndexArray['Drawing Name']].value || 'N/A';
        const drgType = dwg[columnsIndexArray['Drg Type']].value || 'N/A';
        const useFor = dwg[columnsIndexArray['Use For']].value || 'N/A';
        const coordinatorInCharge = dwg[columnsIndexArray['Coordinator In Charge']].value || 'N/A';
        const modeller = dwg[columnsIndexArray['Modeller']].value || 'N/A';
        const rev = dwg[columnsIndexArray['Rev']].value || 'N/A';
        const status = dwg[columnsIndexArray['Status']].value || 'N/A';

        dwgArray.push({
            drawingNumber,
            drawingName,
            drgType,
            useFor,
            coordinatorInCharge,
            modeller,
            rev,
            status
        });
    });

    return dwgArray;
};



const renderCustomizedLabel = (args) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, value } = args
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
            {/* {`${(percent * 100).toFixed(0)}%`} */}
            {value}
        </text>
    );
};




