/*
  localhost + /api/auth
*/

const express = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const validarCampos = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = express.Router()


router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y debe contener más de 5 caracteres').isLength(min=5),
    validarCampos,
  ],
  crearUsuario)

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y debe contener más de 5 caracteres').isLength(min=5),
    validarCampos,
  ], 
  loginUsuario)

router.get('/renew', validarJWT, revalidarToken)



module.exports = router