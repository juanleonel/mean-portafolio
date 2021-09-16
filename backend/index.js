'use strict'

var _mongo =  require('mongoose');
var app = require('./app');
let port = 3700;


_mongo.Promise = global.Promise;

_mongo.connect('mongodb://localhost:27017/portafolio').then(() => {
    console.log("connexion ok");
        // creacion del servidor
    app.listen(port, ()=>{
        console.log("Servidor ok..");
    });

}).catch((err)=>{
    console.log(err);
});