const express = require('express')

const { dbConnection } = require('./db/mongodb-config')
require('dotenv').config()
const cors = require('cors')


//* Crear el servidor de express
const app = express()

//* Conexión MongoDB
dbConnection()

//* cors
app.use(cors())

//* Directorio público
app.use(express.static(__dirname + '/public')); 
app.use( express.static('files') )


//* lectura y parseo del body
app.use( express.json() )

//* Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


//* Escuchar petición
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en ${ process.env.PORT }`)
})
