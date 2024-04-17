const { Router } = require('express');
const Tipo = require('../models/Tipo');
const {validationResult, check } = require('express-validator');

const router = Router();

//  Crear Tipo
router.post('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

    const existeTipo = await Tipo.findOne ({name : req.body.name})

    if (existeTipo) {
        return res.status(400).json({ 
            mensaje: 'Ya existe untipo con ese nombre'});
    }

    let tipo = new Tipo();
    tipo.name = req.body.name;
    tipo.fechaCreacion = new Date;
    tipo.fechaActualizacion = new Date;
    tipo.description = req.body.description;

    tipo = await tipo.save(); // insert  into tipo

    res.send(tipo);
    console.log(tipo);

    }catch (error) {
        console.log(error);
    }

});

// listar tipos
router.get('/', async function(req, res){

    try {

        const tipo = await Tipo.find(); // get tipo
        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al crear un tipo"});
    }
    
});

// obtener Tipos por Id

router.get('/:tipoId', async function(req, res){

    try {

        const tipo = await Tipo.findById(req.params.tipoId); // get tipo
        if(!tipo) {
            return res.status(404).json({
                mensaje: "No se encontró el tipo."});
        }

        res.send(tipo);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al crear un tipo"});
    }
    
});

// Actualizar tipos
router.put('/:tipoId',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if(!tipo) {
            return res.status(404).json({
                mensaje: "No se encontró el tipo."});
        }

    const existeTipo = await Tipo.findOne ({name : req.body.name, _id: { $ne: tipo._id} });

    if (existeTipo) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una tipo con ese nombre'});
    }

    
    tipo.name = req.body.name;
    tipo.fechaActualizacion = new Date;
    tipo.description = req.body.description;

    tipo = await tipo.save(); // insert  into tipo

    res.send(tipo);
    console.log(tipo);

    }catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al actualizar el tipo"});
    }

});

// Eliminar tipo

router.delete('/:tipoId', async function(req, res){

    try {

        let tipo = await Tipo.findById(req.params.tipoId);
        if(!tipo) {
            return res.status(404).json({
                mensaje: "No se encontró el tipo."});
        }

        tipo = await Tipo.findByIdAndDelete(req.params.tipoId);

        res.send(tipo);
        console.log(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al eliminar el tipo"});
    }

});



module.exports = router;