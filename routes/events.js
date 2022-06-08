const express = require('express');
const { check } = require('express-validator');
const { 
  getEventos, 
  crearEvento, 
  actualizarEvento, 
  eliminarEvento 
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = express.Router()

router.use( validarJWT )

router.get('/', getEventos )


router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos,
  ], 
  crearEvento 
)


router.put(
  '/:id',
  [
    check('id','Id no válido').isMongoId(),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos,
  ], 
  actualizarEvento )


router.delete(
  '/:id',
  [
    check('id','Id no válido').isMongoId(),
    validarCampos
  ], 
  eliminarEvento )



module.exports = router