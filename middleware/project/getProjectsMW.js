// ennek middleware-nek a feladata a hogy az adatbázisból a memoriába töltse be a projekteket, elérhtővé válnak az alkalmazáson belül
const requireOption = require('../requireOption');
module.exports=function (objectrepository) {
    const projModel= requireOption(objectrepository, 'projModel');
    return function(req,res,next){
        projModel.find({},function (err, results) {
            if(err){
                return next(err);
            }
            res.locals.projects=results;
            return next();
        });

    };
};