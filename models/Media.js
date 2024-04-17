const { Schema, model} = require('mongoose'); 

const MediaSchema = Schema({
    serial : {type: String, required: true, unique: true},
    titulo: {type: String, required: true},
    sinopsis: {type: String, required: true},
    url: {type: String, required: true, unique: true},
    imagen: {type: String, required: true},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true},
    año: {type: String, required: true},
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: false
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productoraPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'tipo',
        required: true
    }


}, );//{ strictPopulate: false}//);

module.exports = model('Media', MediaSchema);