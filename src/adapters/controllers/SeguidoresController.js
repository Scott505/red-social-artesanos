import { SeguidoresRepository } from '../repositories/SeguidoresRepository.js';
import { seguir } from '../../usecase/seguidores/seguir.js';
import { dejarDeSeguir } from '../../usecase/seguidores/dejarDeSeguir.js';
import { aceptarSolicitud } from "../../usecase/seguidores/aceptarSolicitud.js";

export const seguirController = async (req, res) => {
  const seguidoresRepository = new SeguidoresRepository();

  try {
    const id_seguidor = req.session.user.id_perfil;
    const id_seguido = parseInt(req.params.idSeguido, 10);

    if (id_seguidor === id_seguido) {
      return res.status(400).json({ error: "No podés seguirte a vos mismo." });
    }

    await seguir(seguidoresRepository, id_seguidor, id_seguido);

    //console.log('📨 Emitiendo nueva solicitud a:', `usuario_${id_seguido}`);


    const io = req.app.get('io');
    if (io) {
      io.to(`usuario_${id_seguido}`).emit('nueva-solicitud', {
        mensaje: 'Tenés una nueva solicitud de amistad',
        id_seguidor
      });
    }

    res.redirect(`/perfil/todaslaspersonas`);

  } catch (error) {
    console.error('Error en seguirController:', error);
    res.status(500).json({ error: 'Error del servidor.' });
  }
};

export const dejarDeSeguirController = async (req, res) => {
  const seguidoresRepository = new SeguidoresRepository();

  try {
    const id_seguidor = req.session.user.id_perfil;
    const id_seguido = parseInt(req.params.idSeguido, 10);

    await dejarDeSeguir(seguidoresRepository, id_seguidor, id_seguido);

    res.redirect(`/perfil/todaslaspersonas`);

  } catch (error) {
    console.error('Error en dejarDeSeguirController:', error);
    res.status(500).json({ error: 'Error del servidor.' });
  }
};

export const mostrarSolicitudesController = async (req, res) => {
  const seguidoresRepository = new SeguidoresRepository();

  try {
    const usuario = req.session.user;

    const solicitudes = await seguidoresRepository.getSolicitudesConPerfiles(usuario.id_perfil);

    const perfilesSolicitantes = solicitudes
      .map(s => s.id_seguidor_perfile?.dataValues);


    res.render("solicitudes", {
      titulo: "Solicitudes",
      solicitudes: perfilesSolicitantes,
    });

  } catch (error) {
    console.error("Error al obtener solicitudes de amistad:", error);
    res.status(500).send("Error del servidor");
  }
};

export const aceptarSolicitudController = async (req, res) => {
  const seguidoresRepository = new SeguidoresRepository();
  const id_seguido = req.session.user.id_perfil;
  const id_seguidor = parseInt(req.params.idSeguidor, 10);

  try {
    await aceptarSolicitud(seguidoresRepository, id_seguidor, id_seguido);
    const io = req.app.get('io');
    
    console.log('📨 Emitiendo solicitud aceptada a:', `usuario_${id_seguidor}`);
    
    if (io) {
      io.to(`usuario_${id_seguidor}`).emit('solicitud-aceptada', {
        mensaje: 'Tu solicitud de amistad fue aceptada',
        id_seguido
      });
    }

    res.redirect("/seguidores/solicitudes");

  } catch (error) {

    console.error("Error al aceptar solicitud:", error);
    res.status(500).send("Error del servidor");

  }
};

export const rechazarSolicitudController = async (req, res) => {
  const seguidoresRepository = new SeguidoresRepository();
  const id_seguido = req.session.user.id_perfil;
  const id_seguidor = parseInt(req.params.idSeguidor, 10);

  try {

    await dejarDeSeguir(seguidoresRepository, id_seguidor, id_seguido);

    res.redirect("/seguidores/solicitudes");

  } catch (error) {

    console.error("Error al rechazar solicitud:", error);
    res.status(500).send("Error del servidor");

  }
};