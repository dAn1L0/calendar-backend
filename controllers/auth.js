const bcrypt = require('bcryptjs/dist/bcrypt');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async(req,res) => {

  const {email,password} = req.body
  
  try {
  
    let usuario = await Usuario.findOne({email})

    if (usuario) {
      return res.status(400).json({
        ok:false,
        msg: 'Usuario ingresado está en uso, elige otro'
      })
    } 

    usuario = new Usuario(req.body)

    //* Encriptar password
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt )

    await usuario.save()

    //* generar token
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador.'
    })
  }

}

const loginUsuario = async(req,res) => {

  
  const {email,password} = req.body

  try {
  
    const usuario = await Usuario.findOne({email})

    if (!usuario) {
      return res.status(400).json({
        ok:false,
        msg: 'Credenciales incorrectas'
      })
    } 

    //* Comparar password
    const isPassword = bcrypt.compareSync( password, usuario.password )

    if (!isPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas'
      })
    }

    //* generar token
    const token = await generarJWT(usuario.id, usuario.name)
    

    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador.'
    })
  }
}

const revalidarToken = async(req,res) => {
  
  const uid = req.uid
  const name = req.name

  const token = await generarJWT(uid,name)
  
  res.status(200).json({
    ok:true,
    token
  })
}



module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,

}