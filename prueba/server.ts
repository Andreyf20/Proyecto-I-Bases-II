const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api/index');
const express = require('express');
const app = express();

var PORT = 8080

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', apiRouter);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error : 'Unauthorized :('});
    }
});

app.listen(PORT, () => {
    console.log("Running on " + PORT);
});