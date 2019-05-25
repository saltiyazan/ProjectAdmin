// ennek middleware-nek a feladata a hogy az adatbázisból a memoriába töltse be a projekteket, elérhtővé válnak az alkalmazáson belül
const requireOption = require('../requireOption');
module.exports=function (objectrepository) {
    const issueModel= requireOption(objectrepository, 'issueModel');
    return function(req,res,next){
        issueModel.find({
            _parentproject: req.param('projectId')
        }).populate('_parentproject').exec(function (err, results) {
            if(err){
                return next(err);
            }
            res.locals.issues=results;
            return next();
        });

    };
};