const express = require('express');
var cors = require('cors');
class Server {
    constructor() {
        this.app = express(); 
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //middlewares: Funciones que siempre se van a llamar cuando se lance el servidor
        this.middlewares();
        //Application routes
        this.routes(); //SET ROUTES
    }

    middlewares() {
        this.app.use(cors());
        //BODY PARSE
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    lister(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;