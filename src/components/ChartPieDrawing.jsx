import { Badge, Modal, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import styled from 'styled-components';
import { colorScheme } from '../assets/constant';
import { getCategoryIndex } from '../utils/function';


const ChartPieDrawing = props => {

    const { project } = props;
    const COLORS = [colorScheme.yellow, colorScheme.green, colorScheme.red, colorScheme.blue, 'black'];

    let categoryIndex = getCategoryIndex([
        'Status',
        'Drawing Number',
        'Drawing Name',
        'Rev',
        'get Approval (A)'
    ], project);

    let AllDrawings = [];
    project.rows.forEach(drawing => {
        if (drawing.cells[categoryIndex['Status']].value !== undefined) {
            AllDrawings = [...AllDrawings, drawing];
        };
    });

    let statusCount = {};
    AllDrawings.forEach(dwg => {
        statusCount[dwg.cells[categoryIndex['Status']].value] = (statusCount[dwg.cells[categoryIndex['Status']].value] || 0) + 1;
    });
    const dataStatusCount = _.map(statusCount, (value, name) => ({ name, value }));



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
        AllDrawings.forEach(dwg => {
            if (dwg.cells[categoryIndex['Status']].value === portion.name) {
                dwgs = [...dwgs, {
                    'key': dwgs.length,
                    'Drawing Number': dwg.cells[categoryIndex['Drawing Number']].value ? dwg.cells[categoryIndex['Drawing Number']].value : 'No data',
                    'Drawing Name': dwg.cells[categoryIndex['Drawing Name']].value ? dwg.cells[categoryIndex['Drawing Name']].value : 'No data',
                    'Rev': dwg.cells[categoryIndex['Rev']].value ? dwg.cells[categoryIndex['Rev']].value : 'No data',
                    'get Approval (A)': dwg.cells[categoryIndex['get Approval (A)']].value ? dwg.cells[categoryIndex['get Approval (A)']].value : 'No data'
                }];
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
                    data={dataStatusCount}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey='value'
                    outerRadius={100}
                    onClick={drawingStatusTableOnOpen}
                    cursor='pointer'
                >
                    {dataStatusCount.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <div style={{ margin: '0 auto', display: 'table' }}>
                {dataStatusCount.map(item => (
                    <div key={item.value}>
                        <StyledBadge size='small' color={COLORS[dataStatusCount.indexOf(item)]} text={item.name} />
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




