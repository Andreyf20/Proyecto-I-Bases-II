var bodyParser = require('body-parser');
var morgan = require('morgan');
var apiRouter = require('./api/index.ts');
var express = require('express');
var app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', apiRouter);

app.listen(process.env.PORT || 8080);