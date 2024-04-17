const { Router } = require('express');
const Media = require('../models/Media');
const {validationResult, check } = require('express-validator');

const router = Router();

    //  Crear Media
router.post('/', [
    check('serial', 'serial requerido').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    check('sinopsis', 'El sinopsis es requerido').not().isEmpty(),
    check('url', 'El url es requerido').not().isEmpty(),
    check('imagen', 'imagen es requerido').not().isEmpty(),
    check('año', 'El año de extreno').not().isEmpty(),

    check('generoPrincipal', 'generoPrincipal es requerido').not().isEmpty(),
    check('tipoPrincipal', 'tipoPrincipal es requerido').not().isEmpty(),
    check('directorPrincipal', 'directorPrincipal es requerido').not().isEmpty(),
    check('productoraPrincipal', 'productoraPrincipal es requerido').not().isEmpty()

],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

    const existeMediaPorSerial = await Media.findOne ({serial : req.body.serial})

    if (existeMediaPorSerial) {
        return res.status(400).json({ 
            mensaje: 'existe una serial con esa nomenclatura'});
    }

    let media = new Media();
    media.serial = req.body.serial;
    media.titulo = req.body.titulo;
    media.sinopsis = req.body.sinopsis;
    media.url = req.body.url;
    media.imagen = req.body.imagen;
    media.fechaCreacion = new Date;
    media.fechaActualizacion = new Date;
    media.año = req.body.año;
    media.generoPrincipal = req.body.generoPrincipal._id;
    media.tipoPrincipal = req.body.tipoPrincipal._id;
    media.directorPrincipal = req.body.directorPrincipal._id;
    media.productoraPrincipal = req.body.productoraPrincipal._id;
    media.descripcion = req.body.descripcion;


    media = await media.save(); // insert  into media

    res.send(media);
    console.log(media);

    }catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error "});
    }

});

// listar media
router.get('/', async function(req, res){

    try {
            
        const medias = await Media.find().populate([
            {
                path: 'generoPrincipal',
                model: 'Genero',
                select: 'name status description'
            },
            {
                path: 'tipoPrincipal',
                model: 'Tipo',
                select: 'name description'
            },
            {
                path: 'directorPrincipal',
                model: 'Director',
                select: 'names status description'

            },
            {
                path: 'productoraPrincipal',
                model: 'Productora',
                select: 'name status slogan description'
            }
        ]); // get media
        res.send(medias);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al listar Media"});
    }
    
});

// Actualizar media
router.put('/:mediaId',[
    check('serial', 'serial requerido').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    check('sinopsis', 'El sinopsis es requerido').not().isEmpty(),
    check('url', 'El url es requerido').not().isEmpty(),
    check('imagen', 'imagen es requerido').not().isEmpty(),
    check('año', 'El año de extreno').not().isEmpty(),

    check('generoPrincipal', 'generoPrincipal es requerido').not().isEmpty(),
    check('tipoPrincipal', 'tipoPrincipal es requerido').not().isEmpty(),
    check('directorPrincipal', 'directorPrincipal es requerido').not().isEmpty(),
    check('productoraPrincipal', 'productoraPrincipal es requerido').not().isEmpty()
],  async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let media = await Media.findById(req.params.mediaId);
        if(!media) {
            return res.status(404).json({
                mensaje: "No se encontró el media."});
        }

    const existeMediaPorTitulo = await Media.
    findOne ({titulo : req.body.titulo, _id: { $ne: media._id} });

    if (existeMediaPorTitulo) {
        return res.status(400).json({ 
            mensaje: 'Ya existe una media con ese Titulo'});
    }

    
    media.serial = req.body.serial;
    media.titulo = req.body.titulo;
    media.sinopsis = req.body.sinopsis;
    media.url = req.body.url;
    media.imagen = req.body.imagen;
    media.fechaCreacion = new Date;
    media.fechaActualizacion = new Date;
    media.año = req.body.año;
    media.generoPrincipal = req.body.generoPrincipal._id;
    media.tipoPrincipal = req.body.tipoPrincipal._id;
    media.directorPrincipal = req.body.directorPrincipal._id;
    media.productoraPrincipal = req.body.productoraPrincipal._id;
    media.descripcion = req.body.descripcion;

    media = await media.save(); // insert  into media

    res.send(media);
    console.log(media);

    }catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al actualizar la media"});
    }

});

// Eliminar media

router.delete('/:mediaId', async function(req, res){

    try {

        let media = await Media.findById(req.params.mediaId);
        if(!media) {
            return res.status(404).json({
                mensaje: "No se encontró el media."});
        }

        media = await Media.findByIdAndDelete(req.params.mediaId);

        res.send(media);
        console.log(media);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al eliminar la Media."});
    }

});

// listar media por Id

router.get('/:mediaId', async function(req, res){

    try {

        const media = await Media.findById(req.params.mediaId); // get media
        if (!media) {
            return res.status(404).json({
                mensaje: "No se encontró media."});
        }
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "ocurrio un error al consultar media"});
    }
    
});



module.exports = router;