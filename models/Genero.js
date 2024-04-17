const { Schema, model} = require('mongoose'); 

const GeneroSchema = Schema({
    name: {
        type: String
    },
    status: {
        type: String
    },
    fechaCreacion:{
        type: Date
    },
    fechaActualizacion:{
        type: Date
    },
    description:{
        type: String
    }});

module.exports = model('Genero', GeneroSchema);