import bodyParser = require('body-parser');
import morgan = require('morgan');
import apiRouter = require('./api/index');
import express = require('express');

const app: express.Application = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', apiRouter);

app.listen(process.env.PORT || 3000);