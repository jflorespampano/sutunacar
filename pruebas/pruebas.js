// import {personas} from './prueba-json.js'
// console.log(personas)

// const validator = require('validator');
import validator from 'validator'
let sanitizedInput = validator.escape("Redmond';drop table OrdersTable--"); // Escapa caracteres especiales
console.log(sanitizedInput)