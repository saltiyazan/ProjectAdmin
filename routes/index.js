const renderMW = require('../middleware/renderMW');
const getProjectsMW = require('../middleware/project/getProjectsMW');
const getProjectMW = require('../middleware/project/getProjectMW');
const saveProjectMw= require('../middleware/project/saveProjectMW');
const deleteProjectMW= require('../middleware/project/delProjectMW');
const  getIssuesMW = require('../middleware/issue/getIssuesMW');
const getIssueMW= require('../middleware/issue/getIssueMW');
const saveIssueMW= require('../middleware/issue/saveIssueMW');
const delIssueMW= require('../middleware/issue/delIssueMW');

const projModel= require('../models/project');
const issueModel = require('../models/issue');

module.exports=function (app) {
    const objRepo={
        projModel: projModel,
        issueModel: issueModel
    };

    app.use('/project/new',
            saveProjectMw(objRepo),
            renderMW(objRepo,"newProject"));
    app.use('/project/edit/:projectId',
            getProjectMW(objRepo),
            getIssuesMW(objRepo),
            saveProjectMw(objRepo),
            saveIssueMW(objRepo),
            renderMW(objRepo,"editProject"));
    app.get('/project/del/:projectId',
            getProjectMW(objRepo),
            deleteProjectMW(objRepo),
            renderMW(objRepo,"index"));


    app.use('/issue/:projectId/new',
        getProjectMW(objRepo),
        saveIssueMW(objRepo),
        renderMW(objRepo,"newIssue"));
    app.get('/',
        getProjectsMW(objRepo),
        renderMW(objRepo,"index"));

    app.use('/issue/:projectId/edit/:issueId',
            getProjectMW(objRepo),
            getIssueMW(objRepo),
            saveIssueMW(objRepo),
            renderMW(objRepo,"newIssue"));

    app.get('/issue/:projectId/del/:issueId',
        getProjectMW(objRepo),
        getIssueMW(objRepo),
        delIssueMW(objRepo),
        renderMW(objRepo,"editProject")
    );


};
