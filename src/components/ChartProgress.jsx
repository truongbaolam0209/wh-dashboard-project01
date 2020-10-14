import { Progress } from 'antd';
import React, { Fragment } from 'react';
import { colorScheme } from '../assets/constant';
import { countAllSameData } from '../utils/function';


const ChartProgress = ({ project }) => {

    const countAllDrawingsUnique = countAllSameData(project, 'Drawing Number');
    
    const overdueDummy = [
        { name: `Late for construction 1/${countAllDrawingsUnique.length}`, value: 5 },
        { name: `Overdue date of submissions 49/${countAllDrawingsUnique.length}`, value: 90 },
        { name: `Overdue date of approval 35/${countAllDrawingsUnique.length}`, value: 76 }
    ];

    return (
        <div style={{ width: '80%', margin: '25px auto' }}>
            {overdueDummy.map(item => (
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
