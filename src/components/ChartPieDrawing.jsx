import { Badge, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import styled from 'styled-components';
import { pieChartColors } from '../assets/constant';
import { countAllSameData, getColumnsIndexAndDrawings } from '../utils/function';



const ChartPieDrawing = props => {

    const { project } = props;

    let { columnsIndexArray, allDrawings } = getColumnsIndexAndDrawings(project);

    const countAllStatus = countAllSameData(project, 'Status');



    const [modalShown, setModalShown] = useState(false);
    const [portionClick, setPortionClick] = useState(false);
    const [drawingByPortions, setDrawingByPortions] = useState([]);


    const drawingStatusTableOnClose = () => {
        setModalShown(false);
        setDrawingByPortions([]);
    };

    const drawingStatusTableOnOpen = (portion) => {
        setModalShown(true);
        setPortionClick(portion);

        let dwgs = [];
        allDrawings.forEach(dwg => {
            if (dwg.cells[columnsIndexArray['Status']].value === portion.name) {
                dwgs.push(dwg);
            };
        });
        setDrawingByPortions(dwgs);
    };


    // DRAWINGS BY PERCENTAGE HERE
    // console.log(drawingByPortions);

    return (
        <div>
            <PieChart width={300} height={300} style={{ margin: '0 auto' }}>
                <Pie
                    data={countAllStatus}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey='value'
                    outerRadius={100}
                    onClick={drawingStatusTableOnOpen}
                    cursor='pointer'
                >
                    {countAllStatus.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={pieChartColors[index % pieChartColors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <div style={{ margin: '0 auto', display: 'table' }}>
                {countAllStatus.map(item => (
                    <div key={item.name}>
                        <StyledBadge size='small' color={pieChartColors[countAllStatus.indexOf(item)]} text={item.name} />
                    </div>
                ))}
            </div>

            <Modal
                title={'Drawings by ' + portionClick.name}
                centered
                visible={modalShown}
                onOk={drawingStatusTableOnClose}
                onCancel={drawingStatusTableOnClose}
            >
                <p>{portionClick.name}</p>
                <p>{drawingByPortions.length}</p>
                <h2>{Math.round(portionClick.percent * 100) + '%'}</h2>
                {/* SORTED TABLE SHOWN HERE */}
            </Modal>
        </div>
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







const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};




