import { Progress } from 'antd';
import React, { Fragment } from 'react';
import { colorScheme, dataScheme } from '../assets/constant';


const ChartProgress = () => {

    return (
        <div style={{ width: '80%', margin: '25px auto' }}>
            {dataScheme.overdueDummy.map(item => (
                <Fragment key={item.name}>
                    <div>{item.name}</div>
                    <Progress
                        trailColor='#eee'
                        strokeColor={colorScheme.grey2}
                        percent={item.value}
                        style={{ paddingBottom: 29 }}
                    />
                </Fragment>
            ))}

        </div>
    );
};

export default ChartProgress;
