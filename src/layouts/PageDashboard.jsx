import { Col, Divider, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { colorScheme, sizeScheme } from '../assets/constant';
import ChartBarDrawing from '../components/ChartBarDrawing';
import ChartBarProject from '../components/ChartBarProject';
import ChartPieDrawing from '../components/ChartPieDrawing';
import ChartProgress from '../components/ChartProgress';
import FormPivot from '../components/FormPivot';
import NavBar from '../components/NavBar';
import CardPanel from '../components/ui/CardPanel';
import Container from '../components/ui/Container';



const PageDashboard = () => {

    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setDeviceWidth(window.innerWidth));
        return () => window.removeEventListener('resize', () => setDeviceWidth(window.innerWidth));
    }, []);


    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(
            'https://bim.wohhup.com/api/smartsheet/get-sheets-dashboard',
            { listSheetId: [8919906142971780, 4758181617395588] }
        ).then(res => {
            setData(res.data);
            setLoading(false);
        });
    }, []);

    const [loading, setLoading] = useState(true);


    console.log(data);

    return (
        <NavBar>
            <div style={{ marginTop: '60px' }}>
                <Container deviceWidth={deviceWidth} style={{ margin: '25px 0 5px 0' }}>
                    <ChartBarProject deviceWidth={deviceWidth} title='No of drawing delay (for construction)' />
                    <ChartBarProject deviceWidth={deviceWidth} title='No of drawing delay (get approval)' />
                    <ChartBarProject deviceWidth={deviceWidth} title='Productivity' />
                </Container>



                {loading
                    ? <SkeletonCard />
                    : (
                        <div style={{ padding: '0 12px' }}>
                            {data && data.map(project => {

                                return (
                                    <CardPanel
                                        title={project.name}
                                        key={project.id}
                                        headColor={colorScheme.grey2}
                                        headTitleColor={'white'}
                                    >
                                        <Container style={{ margin: '20px' }}>
                                            <Col style={{ marginBottom: 10 }} xs={24} lg={12} xl={6}>
                                                <TitleInfo titleInfo='Overdue submissions' />
                                                <ChartProgress />
                                            </Col>
                                            {deviceWidth && deviceWidth <= sizeScheme.lg && <Divider type='horizontal' style={{ padding: '3px 0' }} />}
                                            <Col style={{ marginBottom: 10 }} xs={24} lg={12} xl={6}>
                                                <TitleInfo titleInfo='Approved drawings' />
                                                <ChartPieDrawing project={project} />
                                            </Col>

                                            {deviceWidth && deviceWidth <= sizeScheme.xl && <Divider type='horizontal' style={{ padding: '3px 0' }} />}

                                            <Col style={{ marginBottom: 10 }} xs={24} lg={12} xl={6}>
                                                <TitleInfo titleInfo='Drawing counts by revision' />
                                                <ChartBarDrawing />
                                            </Col>
                                            {deviceWidth && deviceWidth <= sizeScheme.lg && <Divider type='horizontal' style={{ padding: '3px 0' }} />}
                                            <Col style={{ marginBottom: 10 }} xs={24} lg={12} xl={6}>
                                                <TitleInfo titleInfo='Sorted table by category' />
                                                <FormPivot project={project} />
                                            </Col>
                                        </Container>
                                    </CardPanel>
                                )
                            })}
                        </div>
                    )}

            </div>
        </NavBar>
    );
};


const TitleInfo = ({ titleInfo }) => {
    return (
        <div style={{ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' }}>
            {titleInfo}
        </div>
    );
};

const SkeletonCard = () => {
    return (
        <div style={{ padding: '0 12px' }}>
            <CardPanel
                title='Project loading ...'
                headColor={colorScheme.grey2}
                headTitleColor={'white'}
            >
                <div style={{ padding: '20px', marginBottom: '95px' }}><Skeleton /><Skeleton /></div>
            </CardPanel>
            <CardPanel
                title='Project loading ...'
                headColor={colorScheme.grey2}
                headTitleColor={'white'}
            >
                <div style={{ padding: '20px', marginBottom: '95px' }}><Skeleton /><Skeleton /></div>
            </CardPanel>
        </div>
    );
};

export default PageDashboard;
