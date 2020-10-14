import _ from 'lodash';


export const getColumnsIndexAndDrawings = (project) => {
    const categoryArray = _.map(project.columns, 'title');
    let columnsIndexArray = {};
    categoryArray.forEach(cate => {
        project.columns.forEach(cl => {
            if (cl.title === cate) columnsIndexArray[cate] = cl.index;
        });
    });

    let allDrawings = [];
    project.rows.forEach(drawing => {
        if (drawing.cells[columnsIndexArray['Status']].value !== undefined) {
            allDrawings.push(drawing);
        };
    });
    return { columnsIndexArray, allDrawings };
};



export const countAllSameData = (project, category) => {

    const { allDrawings, columnsIndexArray } = getColumnsIndexAndDrawings(project);

    let statusCount = {};
    allDrawings.forEach(dwg => {
        statusCount[dwg.cells[columnsIndexArray[category]].value] = (statusCount[dwg.cells[columnsIndexArray[category]].value] || 0) + 1;
    });
    return _.map(statusCount, (value, name) => ({ name, value }));
};

