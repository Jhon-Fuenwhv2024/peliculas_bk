const { Schema, model} = require('mongoose'); 

const TipoSchema = Schema({
    name : {type: String, required: true},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true},
    description : {type: String, required: true}
});

module.exports = model('Tipo', TipoSchema);