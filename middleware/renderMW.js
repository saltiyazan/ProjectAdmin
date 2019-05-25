var moment = require('moment');
module.exports = function (objectRepository, viewName) {
    return function (req,res) {
        res.render(viewName,{moment:moment});
        //res.render(viewNae,res.tpl)
        //console.log(viewName);
        //res.end(viewName);
    };
};