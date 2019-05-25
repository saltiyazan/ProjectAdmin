var express = require('express');
var app = express();

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


require('./routes/index')(app);


var server = app.listen(3000, function () {
});