const { Router } = require('express');
const Productora = require('../models/Productora');
const {validationResult, check } = require('express-validator');

const router = Router();

//  Crear productora
router.post('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('status', 'El status es requerido').isIn([ 'Activo', 'Inactivo']),
    check('slogan', 'El slogan es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

    const existeProductora = await Productora.findOne ({name : req.body.name})

    if (existeProductora) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una productora con ese nombre'});
    }

    let productora = new Productora();
    productora.name = req.body.name;
    productora.status = req.body.status;
    productora.fechaCreacion = new Date;
    productora.fechaActualizacion = new Date;
    productora.slogan = req.body.slogan;
    productora.descripcion = req.body.descripcion;

    productora = await productora.save(); // insert  into productora

    res.send(productora);
    console.log(productora);

    }catch (error) {
        console.log(error);
    }

});

// listar productora
router.get('/', async function(req, res){

    try {

        const productora = await Productora.find(); // get productora
        res.send(productora);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al crear productora"});
    }
    
});

// Actualizar productora
router.put('/:productoraId',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('status', 'El status es requerido').isIn([ 'Activo', 'Inactivo']),
    check('slogan', 'El slogan es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let productora = await Productora.findById(req.params.productoraId);
        if(!productora) {
            return res.status(404).json({
                mensaje: "No se encontró el productora."});
        }

    const existeProductora = await Productora.findOne ({name : req.body.name, _id: { $ne: productora._id} });

    if (existeProductora) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una productora con ese nombre'});
    }

    
    productora.name = req.body.name;
    productora.status = req.body.status;
    productora.fechaActualizacion = new Date;
    productora.slogan = req.body.slogan;
    productora.descripcion = req.body.descripcion;

    productora = await productora.save(); // insert  into productora

    res.send(productora);
    console.log(productora);

    }catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al actualizar productora"});
    }

});

// Eliminar productora

router.delete('/:productoraId', async function(req, res){

    try {

        let productora = await Productora.findById(req.params.productoraId);
        if(!productora) {
            return res.status(404).json({
                mensaje: "No se encontró el productora."});
        }

        productora = await Productora.findByIdAndDelete(req.params.productoraId);

        res.send(productora);
        console.log(productora);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al eliminar productora"});
    }

});



module.exports = router;