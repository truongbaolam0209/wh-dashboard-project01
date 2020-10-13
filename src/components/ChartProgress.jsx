import { Progress } from 'antd';
import React, { Fragment } from 'react';


const ChartProgress = () => {

    const data = [
        { name: 'Late for construction 1/51', value: 2 },
        { name: 'Overdue date of submissions 49/51', value: 90 },
        { name: 'Overdue date of approval 35/51', value: 76 }
    ];

    return (
        <div style={{width: '80%'}}>
            {data.map(item => (
                <Fragment key={item.name}>
                    <div>{item.name}</div>
                    <Progress percent={item.value} style={{paddingBottom: 29}} />
                </Fragment>
            ))}

        </div>
    );
};

export default ChartProgress;
