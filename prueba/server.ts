const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api/index');
const express = require('express');
const app = express();

var PORT = process.env.PORT || 8080

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/', apiRouter);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        try{
            res.status(401).send({error : 'Unauthorized :('});
        }

        catch(e){
            res.status(500).send({error : 'Internal Auth Error'});
        }
    }

});

app.listen(PORT, () => {
    console.log("Running on " + PORT);
});