'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var project_routes = require('./routes/project');
const { modelNames } = require('mongoose');

var app = express();

// midd
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas

app.use('/api', project_routes);
/*
app.get('/', (req, res)=>{
    
    res.status(200).send({
        message:"Hola mundo desde el api nodejs"
    });
});

app.post('/test', (req, res)=>{
    console.log(req.body.nombre);
    console.log(req.query.web);
    res.status(200).send({
        message:"Hola mundo desde el api nodejs"
    });
});*/

// export

module.exports = app;
