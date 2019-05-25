//A Form bemeneti mezőiről érkező adatokat fogja a megfelelő módon a hozzátartozó projekthez(új is lehet) elmenteni az adatbázisba
const requireOption = require('../requireOption');
module.exports = function (objectrepository) {
    const projModel= requireOption(objectrepository,'projModel');

    return function (req, res, next) {
            if ((typeof req.body.name === 'undefined') ||
                (typeof req.body.description === 'undefined') ||
                (typeof req.body.estimated_time === 'undefined')) {
                return next();
            }
            let project= undefined;
            if(typeof res.locals.project !== 'undefined'){
                project=res.locals.project;
            }else{
                project= new projModel();
            }
            project.name=req.body.name;
            project.description = req.body.description;
            project.estimated_time = req.body.estimated_time;

            project.save(function (err,result) {
                if(err){
                    return next(err);
                }
                return res.redirect('/');
            });
    };
};