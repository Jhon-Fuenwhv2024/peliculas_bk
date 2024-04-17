const { Schema, model} = require('mongoose'); 

const DirectorSchema = Schema({
    names : {type: String, required: true},
    status: {type: String, required: true, enum: ['Activo', 'Inactivo']},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}

});

module.exports = model('Director', DirectorSchema);