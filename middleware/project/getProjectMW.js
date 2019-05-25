//betölti projectId paraméter alapján a projektet az adatbázisból és elérhetővé teszi az alkalmazás számára
var requireOption = require('../requireOption');

module.exports=function (objectrepository) {
    const projModel = requireOption(objectrepository, 'projModel');
    return function (req,res,next) {
        projModel.findOne({
            _id: req.param('projectId')
        },function (err,result) {
            if(err){
                return next(err);
            }
            res.locals.project=result;
            return next();
        });
    };
};