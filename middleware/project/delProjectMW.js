//ProjectId paraméter alapján kitörli a projektet az adatbázisból

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.locals.project==='undefined'){
            return next();
        }
        res.locals.project.remove(function (err) {
            if (err) {
                return next(err);
            }
        res.redirect('/');
        });
    };
};