import { Col, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { colorType } from '../assets/constant';
import ChartBarDrawing from '../components/ChartBarDrawing';
import ChartBarDrawingStatus from '../components/ChartBarDrawingStatus';
import ChartBarLateApproval from '../components/ChartBarLateApproval';
import ChartBarLateConstruction from '../components/ChartBarLateConstruction';
import ChartBarProductivity from '../components/ChartBarProductivity';
import ChartPieDrawing from '../components/ChartPieDrawing';
import ChartProgress from '../components/ChartProgress';
import FormPivot from '../components/FormPivot';
import NavBar from '../components/NavBar';
import TableDrawingList from '../components/TableDrawingList';
import CardPanel from '../components/ui/CardPanel';
import CardPanelProject from '../components/ui/CardPanelProject';
import { getDataConverted } from '../utils/function';



const PageDashboard = () => {

    const deviceWidth = window.innerWidth;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const loadData = async () => {
            setLoading(true);
            try {
                // const result = await Axios.post(
                //     'https://bim.wohhup.com/api/smartsheet/get-sheets-dashboard',
                //     { listSheetId: [8919906142971780, 4758181617395588] }
                // );
                // console.log(result.data);
                // setData(getDataConverted(result.data));
                // setLoading(false);

                setTimeout(() => {
                    const result = JSON.parse(localStorage.getItem('wh'));
                    console.log('-----------------------------------------', 'DATA FETCHED');
                    setData(getDataConverted(result));
                    setLoading(false);
                }, 100);
                // localStorage.setItem('wh', JSON.stringify(result.data));
            } catch (err) {
                console.log(err);
                setLoading(false);
            };
        };
        loadData();
    }, []);

    // console.log(data);


    const openDrawingTable = (projectName, title, drawings) => {
        console.log(projectName, title, drawings);
    };

    return (
        <NavBar>
            <div style={{ marginTop: '60px' }}>
                <Row justify='space-around' style={{ margin: '25px 0 5px 0' }}>
                    <ChartBarLateConstruction
                        title='No Of Drawing Late Construction'
                        color={colorType.red}
                    />
                    <ChartBarLateApproval
                        title='No Of Drawing Late Approval'
                        color={colorType.red}
                        data={data}
                    />
                    <ChartBarDrawingStatus
                        title='Drawing Status'
                        color={colorType.orange}
                        data={data}
                    />
                    <ChartBarProductivity
                        title='Productivity'
                        color={colorType.orange}
                    />
                </Row>

                {!loading && data ? (
                    <div style={{ padding: '0 12px' }}>
                        {Object.keys(data).map(projectName => {
                            return (
                                <CardPanelProject
                                    title={projectName.toUpperCase()}
                                    key={projectName}
                                    headColor={colorType.grey2}
                                    headTitleColor='white'
                                >


                                    <ChartPanel titleInfo='Overdue submissions'>
                                        <ChartProgress
                                            data={data[projectName]}
                                            openDrawingTable={openDrawingTable}
                                            projectName={projectName}
                                        />
                                    </ChartPanel>

                                    {/* {deviceWidth && deviceWidth >= sizeType.md && <Divider type='horizontal' style={{ padding: '3px 0' }} />} */}

                                    <ChartPanel titleInfo='Drawing Status'>
                                        <ChartPieDrawing
                                            data={data[projectName]}
                                            openDrawingTable={openDrawingTable}
                                            projectName={projectName}
                                        />
                                    </ChartPanel>

                                    {/* {deviceWidth && deviceWidth >= sizeType.xl && <Divider type='horizontal' style={{ padding: '3px 0' }} />} */}

                                    <ChartPanel titleInfo='Drawing counts by revision'>
                                        <ChartBarDrawing
                                            data={data[projectName]}
                                            openDrawingTable={openDrawingTable}
                                            projectName={projectName}
                                        />
                                    </ChartPanel>

                                    {/* {deviceWidth && deviceWidth >= sizeType.md && <Divider type='horizontal' style={{ padding: '3px 0' }} />} */}

                                    <ChartPanel titleInfo='Sorted table by category'>
                                        <FormPivot
                                            data={data[projectName]}
                                            openDrawingTable={openDrawingTable}
                                            projectName={projectName}
                                        />
                                    </ChartPanel>

                                </CardPanelProject>
                            )
                        })}
                    </div>
                ) : <SkeletonCard />}

                <TableDrawingList />
            </div>
        </NavBar>
    );
};

export default PageDashboard;





const ChartPanel = ({ titleInfo, children }) => {
    return (
        <Col style={{ marginBottom: 10 }} xs={24} md={12} xl={6}>
            <div style={{ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' }}>{titleInfo}</div>
            {children}
        </Col>
    );
};


const SkeletonCard = () => {
    return (
        <div style={{ padding: '0 12px' }}>
            <CardPanel
                title='Project loading ...'
                headColor={colorType.grey2}
                headTitleColor={'white'}
            >
                <div style={{ padding: '20px', marginBottom: '95px' }}><Skeleton /><Skeleton /></div>
            </CardPanel>
            <CardPanel
                title='Project loading ...'
                headColor={colorType.grey2}
                headTitleColor={'white'}
            >
                <div style={{ padding: '20px', marginBottom: '95px' }}><Skeleton /><Skeleton /></div>
            </CardPanel>
        </div>
    );
};


