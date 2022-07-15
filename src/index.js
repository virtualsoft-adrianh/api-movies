const express = require('express');
const sequelize = require('sequelize');
const app = express();
const morgan = require('morgan');


//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Importamos las rutas
var movies_routes = require('../routes/movies');

// Cargamos las rutas
app.use('/api', movies_routes);


//Iniciando el servidor, escuchando...
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

module.exports = app;