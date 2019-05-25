
let requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const issueModel = requireOption(objectrepository, 'issueModel');

    return function (req, res, next) {

        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.description === 'undefined')||
        (typeof req.body.start_date === 'undefined')||
        (typeof req.body.end_date === 'undefined')) {
            return next();
        }

        let issue = undefined;
        if (typeof res.locals.issue !== 'undefined') {
            issue = res.locals.issue;
        } else {
            issue = new issueModel();
        }
        issue.name = req.body.name;
        issue.description = req.body.description;
        issue.start_date = req.body.start_date;
        issue.end_date = req.body.end_date;

        issue._parentproject=res.locals.project.id;

        issue.save(function (err, result) {
            if (err) {
                return next(err);
            }
            console.log("saved");
            return res.redirect('/project/edit/' + res.locals.project.id);
        });
    };

};
