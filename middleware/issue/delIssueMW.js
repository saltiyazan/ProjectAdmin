//ProjectId paraméter alapján kitörli a projektet az adatbázisból

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.locals.issue==='undefined'){
            return next();
        }
        res.locals.issue.remove(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/project/edit/'+res.locals.project.id);
        });
    };
};