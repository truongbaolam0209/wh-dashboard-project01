import { Progress } from 'antd';
import React, { Fragment } from 'react';
import { colorScheme } from '../assets/constant';


const ChartProgress = () => {

    const data = [
        { name: 'Late for construction 1/51', value: 5 },
        { name: 'Overdue date of submissions 49/51', value: 90 },
        { name: 'Overdue date of approval 35/51', value: 76 }
    ];

    return (
        <div style={{ width: '80%', margin: '25px auto' }}>
            {data.map(item => (
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
