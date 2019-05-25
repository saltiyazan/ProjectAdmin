//az adatbázisból betölti a megfelelő Issue-t és elérhetőve teszi az alkalmazás számára
var requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const issueModel = requireOption(objectrepository, 'issueModel');
    return function (req,res,next) {
        issueModel.findOne({
            _id: req.param('issueId')
        }).populate('_parentproject').exec(function (err,result) {
            if(err){
                return next(err);
            }
            res.locals.issue=result;
            return next();
        });
    };
};