var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Project = db.model('Project',{
    name: String,
    description: String,
    estimated_time: Number
});

module.exports=Project;