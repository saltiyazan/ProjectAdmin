var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Issue = db.model('Issue',{
    name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    _parentproject:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports=Issue;