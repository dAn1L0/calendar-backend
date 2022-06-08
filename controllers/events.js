const Evento = require('../models/Evento');




const getEventos = async(req,res) => {

  try {

    const eventos = await Evento.find().populate('user','name')
  
    res.json({
      ok: true,
      eventos
    });
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    })
  }

}

const crearEvento = async(req,res) => {

  const evento = Evento( req.body )
  
  try {

    evento.user = req.uid

    // evento guardado
    const event = await evento.save()

    res.json({
      ok: true,
      evento: event
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    })
  }
  

}

const actualizarEvento = async(req,res) => {
  
  const eventoId = req.params.id
  const uid = req.uid

  try {
    
    const evento = await Evento.findById(eventoId)

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe'
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Acción no autorizada'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{ new: true })
    
    res.json({
      ok: true,
      evento: eventoActualizado    
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    })
  }
  

}

const eliminarEvento = async(req,res) => {
  
  const eventoId = req.params.id
  const uid = req.uid

  try {

    const evento = await Evento.findById(eventoId)

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe'
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Acción no autorizada'
      });
    }

    await Evento.findByIdAndDelete(eventoId)

    res.json({
      ok: true,
      msg: 'Evento eliminado'
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Comuníquese con el administrador'
    })
  }
  

}



module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento

}