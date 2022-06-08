const jwt = require('jsonwebtoken');




const generarJWT = (uid,name) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, name }

    jwt.sign(payload, process.env.SECRET_PASS_SEED, { 
      expiresIn: "2h" 
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('Error al generar token')
      } else {
        resolve( token )
      }
    });
  }) 
}


module.exports = {
  generarJWT,
}