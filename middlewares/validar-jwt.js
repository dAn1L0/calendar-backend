const jwt = require('jsonwebtoken')




const validarJWT = ( req, res, next ) => {

  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Sin token en la petición'
    })
  }

  try {
    
    const payload = jwt.verify(
      token,
      process.env.SECRET_PASS_SEED
    )

    const {uid, name} = payload

    req.uid = uid
    req.name = name

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }

  next()
}

module.exports = {
  validarJWT,
}