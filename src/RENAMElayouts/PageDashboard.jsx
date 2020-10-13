import { Col } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChartBarProject from '../components/ChartBarProject';
import ChartPieDrawing from '../components/ChartPieDrawing';
import ChartProgress from '../components/ChartProgress';
import NavBar from '../components/NavBar';
import CardPanel from '../components/RENAMEui/CardPanel';
import Container from '../components/RENAMEui/Container';
import TableDrawing from '../components/TableDrawing';



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
        });
    }, []);


    return (
        <NavBar>
            <div style={{ marginTop: '60px' }}>
                <Container deviceWidth={deviceWidth}>
                    <ChartBarProject deviceWidth={deviceWidth} title='No of drawing delay (for construction)' />
                    <ChartBarProject deviceWidth={deviceWidth} title='No of drawing delay (get approval)' />
                    <ChartBarProject deviceWidth={deviceWidth} title='Productivity' />
                </Container>

                <div style={{ padding: '0 13.33333px' }}>
                {data && data.map(project => {

                    return (
                        <CardPanel title={project.name} key={project.id}>
                            <Container deviceWidth={deviceWidth}>

                                <Col xs={{ span: 24 }} md={{ span: 7 }} style={{ padding: '60px 0 0 50px' }}>
                                    <ChartProgress />
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 7 }}>
                                    <ChartPieDrawing project={project} />
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 10 }}>
                                    <TableDrawing />
                                </Col>

                            </Container>
                        </CardPanel>
                    )
                })}
                </div>

            </div>
        </NavBar>
    );
};

export default PageDashboard;
