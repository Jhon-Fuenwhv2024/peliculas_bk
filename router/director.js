const { Router } = require('express');
const Director = require('../models/Director');
const {validationResult, check } = require('express-validator');

const router = Router();

//  Crear Director
router.post('/',[
    check('names', 'El nombre es requerido').not().isEmpty(),
    check('status', 'El status es requerido').isIn([ 'Activo', 'Inactivo'])
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                mensaje: 'Error al crear Director'});
        }

    const existeDirector = await Director.findOne ({names : req.body.names})

    if (existeDirector) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una Director con ese nombre'});
    }

    let director = new Director();
    director.names = req.body.names;
    director.status = req.body.status;
    director.fechaCreacion = new Date;
    director.fechaActualizacion = new Date;

    director = await director.save(); // insert  into director

    res.send(director);
    console.log(director);

    }catch (error) {
        console.log(error);
    }

});

// listar Directores
router.get('/', async function(req, res){

    try {

        const director = await Director.find(); // get director
        res.send(director);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al listar Directores"});
    }
    
});

// Actualizar director
router.put('/:directorId',[
    check('names', 'El nombre es requerido').not().isEmpty(),
    check('status', 'El status es requerido').isIn([ 'Activo', 'Inactivo'])
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let director = await Director.findById(req.params.directorId);
        if(!director) {
            return res.status(404).json({
                mensaje: "No se encontró el director."});
        }

    const existeDirector = await Director.findOne ({names : req.body.names, _id: { $ne: director._id} });

    if (existeDirector) {
        return res.status(400).json({ 
            mensaje: 'Ya existe un Director con ese nombre'});
    }

    
    director.names = req.body.names;
    director.status = req.body.status;
    director.fechaActualizacion = new Date;

    director = await director.save(); // insert  into director

    res.send(director);
    console.log(director);

    }catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al actualizar el director"});
    }

});

// Eliminar director

router.delete('/:directorId', async function(req, res){

    try {

        let director = await Director.findById(req.params.directorId);
        if(!director) {
            return res.status(404).json({
                mensaje: "No se encontró el director."});
        }

        director = await Director.findByIdAndDelete(req.params.directorId);

        res.send(director);
        console.log(director);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al eliminar el Director"});
    }

});



module.exports = router;