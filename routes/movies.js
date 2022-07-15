'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var MovieController = require('../controllers/movies');

// Llamamos al router
var api = express.Router();

// Creamos una ruta de tipo GET
api.get('/populars', MovieController.populars);

// Exportamos la configuración
module.exports = api;
