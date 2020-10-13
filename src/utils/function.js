export const getCategoryIndex = (categoryArray, project) => {
    let categoryIndex = {};
    categoryArray.forEach(cate => {
        project.columns.forEach(cl => {
            if (cl.title === cate) categoryIndex[cate] = cl.index;
        });
    });
    return categoryIndex;
};



