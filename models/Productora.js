const { Schema, model} = require('mongoose'); 

const ProductoraSchema = Schema({
    name : {type: String, required: true},
    status: {type: String, required: true, enum: ['Activo', 'Inactivo']},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true},
    slogan : {type: String, required: true},
    descripcion : {type: String, required: true}

});

module.exports = model('Productora', ProductoraSchema);