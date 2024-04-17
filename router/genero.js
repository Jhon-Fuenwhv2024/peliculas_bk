const { Router } = require('express');
const Genero = require('../models/Genero');
const {validationResult, check } = require('express-validator');

const router = Router();

//  Crear Genero
router.post('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('status', 'El status es requerido').isIn([ 'Activo', 'Inactivo']),
    check('description', 'La descripción es requerida').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

    const existeGenero = await Genero.findOne ({name : req.body.name})

    if (existeGenero) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una Genero con ese nombre'});
    }

    let genero = new Genero();
    genero.name = req.body.name;
    genero.status = req.body.status;
    genero.fechaCreacion = new Date;
    genero.fechaActualizacion = new Date;
    genero.description = req.body.description;

    genero = await genero.save(); // insert  into genero

    res.send(genero);
    console.log(genero);

    }catch (error) {
        console.log(error);
    }

});

// listar generos
router.get('/', async function(req, res){

    try {

        const genero = await Genero.find(); // get genero
        res.send(genero);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al crear un genero"});
    }
    
});

// Actualizar generos
router.put('/:generoId',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('status', 'El status es requerido').isIn([ 'Activo', 'Inactivo']),
    check('description', 'La descripción es requerida').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let genero = await Genero.findById(req.params.generoId);
        if(!genero) {
            return res.status(404).json({
                mensaje: "No se encontró el genero."});
        }

    const existeGenero = await Genero.findOne ({name : req.body.name, _id: { $ne: genero._id} });

    if (existeGenero) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una genero con ese nombre'});
    }

    
    genero.name = req.body.name;
    genero.status = req.body.status;
    genero.fechaActualizacion = new Date;
    genero.description = req.body.description;

    genero = await genero.save(); // insert  into genero

    res.send(genero);
    console.log(genero);

    }catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al actualizar el genero"});
    }

});

// Eliminar genero

router.delete('/:generoId', async function(req, res){

    try {

        let genero = await Genero.findById(req.params.generoId);
        if(!genero) {
            return res.status(404).json({
                mensaje: "No se encontró el genero."});
        }

        genero = await Genero.findByIdAndDelete(req.params.generoId);

        res.send(genero);
        console.log(genero);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al eliminar el Genero"});
    }

});



module.exports = router;