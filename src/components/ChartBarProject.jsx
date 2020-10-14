import { Col, Skeleton } from 'antd';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { colorScheme, dataScheme, sizeScheme } from '../assets/constant';
import ButtonCapsule from './ui/ButtonCapsule';
import CardPanel from './ui/CardPanel';



const ChartBarProject = props => {


    useEffect(() => {
        const timer = setTimeout(() => {
            setData(_.sortBy(dataScheme.projectsDummy, e => e.year));
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const { deviceWidth, title } = props;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnActive, setBtnActive] = useState(null);

    const chartWidth = deviceWidth <= sizeScheme.lg ? deviceWidth - 50 : (deviceWidth - 80) / 3;

    const chartScheme = {
        chartType: title === 'Productivity' ? 'productivity' : title === 'No of drawing delay (for construction)' ? 'construction' : 'approval',
        chartColor: title === 'Productivity' ? colorScheme.yellow : title === 'No of drawing delay (for construction)' ? colorScheme.red : colorScheme.green,
        chartData: title === 'Productivity' ? 'productivity' : title === 'No of drawing delay (for construction)' ? 'delayConstruction' : 'delayApproval',
    };


    const labelListType = btnActive !== null && btnActive.includes('productivity') ? 'productivity'
        : btnActive !== null && btnActive.includes('approval') ? 'delayApproval'
            : btnActive !== null && btnActive.includes('construction') ? 'delayConstruction' : 'year';


    return (
        <Col style={{ padding: '0 15px' }} xs={{ span: 24 }} lg={{ span: 8 }}>
            <CardPanel title={title} headColor={chartScheme.chartColor}>

                {loading
                    ? <div style={{ padding: '20px', marginBottom: '82px' }}><Skeleton /><Skeleton /></div>
                    : (
                        <Fragment>
                            <div style={{ padding: '10px 0 0 10px' }}>
                                <div style={{ display: 'flex' }}>
                                    <ButtonCapsule
                                        btnname='Ascending year'
                                        onClick={event => {
                                            setData(_.sortBy(data, dt => dt.year));
                                            setBtnActive(event.target.textContent);
                                        }}
                                        color={btnActive === 'Ascending year' ? chartScheme.chartColor : colorScheme.grey0}
                                    />
                                    <ButtonCapsule
                                        btnname='Descending year'
                                        onClick={event => {
                                            setData(_.sortBy(data, e => -e.year));
                                            setBtnActive(event.target.textContent);
                                        }}
                                        color={btnActive === 'Descending year' ? chartScheme.chartColor : colorScheme.grey0}
                                    />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <ButtonCapsule
                                        btnname={'Ascending ' + chartScheme.chartType}
                                        onClick={event => {
                                            setData(_.sortBy(data, e => e[chartScheme.chartData]));
                                            setBtnActive(event.target.textContent);
                                        }}
                                        color={btnActive === 'Ascending ' + chartScheme.chartType ? chartScheme.chartColor : colorScheme.grey0}
                                    />
                                    <ButtonCapsule
                                        btnname={'Descending ' + chartScheme.chartType}
                                        onClick={event => {
                                            setData(_.sortBy(data, e => -e[chartScheme.chartData]));
                                            setBtnActive(event.target.textContent);
                                        }}
                                        color={btnActive === 'Descending ' + chartScheme.chartType ? chartScheme.chartColor : colorScheme.grey0}
                                    />
                                </div>
                            </div>

                            <BarChart
                                width={chartWidth}
                                height={350}
                                data={data}
                                margin={{ top: 35, right: 30, left: 0, bottom: 80 }}
                                padding={{ top: 10 }}
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
                                >
                                    <LabelList dataKey={labelListType} position='top' />
                                </Bar>
                            </BarChart>

                        </Fragment>
                    )}
            </CardPanel>
        </Col>
    );
};

export default ChartBarProject;