import { Col, Skeleton } from 'antd';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { colorScheme, dataScheme, sizeScheme } from '../assets/constant';
import ButtonCapsule from './ui/ButtonCapsule';
import CardPanel from './ui/CardPanel';



const ChartBarProject = props => {


    useEffect(() => {
        const timer = setTimeout(() => {
            setData(_.sortBy(dataScheme.projectsDummy, e => e.year));
            setLoading(false);
        }, 1500);
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


    const getBtnText = (event, att) => event.target.attributes.getNamedItem(att).nodeValue;

    console.log(btnActive);

    return (
        <Col style={{ padding: '0 15px' }} xs={{ span: 24 }} lg={{ span: 8 }}>
            <CardPanel title={title} headColor={chartScheme.chartColor}>

                {loading
                    ? <div style={{ padding: '20px', marginBottom: '95px' }}><Skeleton /><Skeleton /></div>
                    : (
                        <Fragment>
                            <div style={{ padding: '10px 0 0 10px' }}>
                                <div style={{ display: 'flex' }}>
                                    <ButtonCapsule
                                        btnname='Ascending year'
                                        onClick={event => {
                                            setData(_.sortBy(data, dt => dt.year));
                                            setBtnActive(getBtnText(event, 'btnname'));
                                        }}
                                        background={btnActive === 'Ascending year' ? chartScheme.chartColor : 'white'}
                                    />
                                    <ButtonCapsule
                                        btnname='Descending year'
                                        onClick={event => {
                                            setData(_.sortBy(data, e => -e.year));
                                            setBtnActive(getBtnText(event, 'btnname'));
                                        }}
                                        background={btnActive === 'Descending year' ? chartScheme.chartColor : 'white'}
                                    />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <ButtonCapsule
                                        btnname={'Ascending ' + chartScheme.chartType}
                                        onClick={event => {
                                            setData(_.sortBy(data, e => e[chartScheme.chartData]));
                                            setBtnActive(getBtnText(event, 'btnname'));
                                        }}
                                        background={btnActive === 'Ascending ' + chartScheme.chartType ? chartScheme.chartColor : 'white'}
                                    />
                                    <ButtonCapsule
                                        btnname={'Descending ' + chartScheme.chartType}
                                        onClick={event => {
                                            setData(_.sortBy(data, e => -e[chartScheme.chartData]));
                                            setBtnActive(getBtnText(event, 'btnname'));
                                        }}
                                        background={btnActive === 'Descending ' + chartScheme.chartType ? chartScheme.chartColor : 'white'}
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
                                />
                            </BarChart>

                        </Fragment>
                    )}
            </CardPanel>
        </Col>
    );
};

export default ChartBarProject;

// const StyledBarChart = styled(BarChart)`
//     .recharts-cartesian-axis-tick-value {
//         transform: rotate(0);
//     }
// `;

