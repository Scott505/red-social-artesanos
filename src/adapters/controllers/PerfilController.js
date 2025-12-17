import { getSequelize } from "../../frameworks/sequelize/db/db.js";
import { PerfilRepository } from '../repositories/PerfilRepository.js';
import { getPerfilById } from '../../usecase/perfil/getPerfilById.js';
import { getAllPerfiles } from '../../usecase/perfil/getAllPerfiles.js';
import { crearUsuarioConPerfil } from '../../usecase/perfil/crearUsuarioConPerfil.js';
import { UsuarioRepository } from '../repositories/UsuarioRepository.js';
import { manejadorDeTransacciones } from "../../usecase/manejadorDeTransacciones.js";
import * as hashService from "../../frameworks/bcrypt/hash.js";
import { ingresar } from '../../usecase/perfil/ingresar.js';
import { SeguidoresRepository } from "../repositories/SeguidoresRepository.js";
import { cerrarSesion } from '../../usecase/perfil/cerrarSesion.js';
import { obtenerEstadisticasPerfil } from "../../usecase/perfil/obtenerEstadisticasPerfil.js";



// Controlador para manejar la solicitud de obtener una persona por ID
export const getPerfilByIdController = async (req, res) => {
  const perfilRepository = new PerfilRepository();
  try {
    //Busca la elperfil por el id
    const id = req.params.id;
    const perfil = await getPerfilById(id, perfilRepository);

    if (!perfil) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const mensajeExito = req.session.mensajeExito;
    delete req.session.mensajeExito;

    res.render('perfil', {
      perfil,
      titulo: `Perfil de ${perfil.nombre}`,
      mensajeExito
    });
  }

  catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ error: error.message }); // Devuelve un error 404 si la persona no se encuentra
    }

    console.error('Error en getPersonaByIdController:', error);
    res.status(500).json({ error: 'Error del servidor' }); // Devuelve un error 500 si ocurre un error del servidor
  }
};

export const getAllPerfilesController = async (req, res) => {
  const perfilRepository = new PerfilRepository();
  const seguidoresRepository = new SeguidoresRepository();

  try {
    const usuario = req.session.user;
    const todosLosPerfiles = await getAllPerfiles(perfilRepository);
    const perfiles = todosLosPerfiles.filter(p => p.id_perfil !== usuario.id_perfil);

    const seguimientos = await seguidoresRepository.getSeguimientosDeUsuario(usuario.id_perfil);

    const mapaSeguimientos = {};
    seguimientos.forEach(s => {
      mapaSeguimientos[s.id_seguido] = s.aceptado == 1 ? 'aceptado' : 'pendiente';
    });
    //console.log("Mapa de seguimientos:", mapaSeguimientos);

    const perfilesConEstado = perfiles.map(perfil => {
      const estado = mapaSeguimientos[perfil.id_perfil] || 'no_sigue';
      return {
        ...perfil.dataValues,
        estado_seguimiento: estado,
      };
    });

    //console.log("Perfiles con estado de seguimiento:", perfilesConEstado);

    res.render("verPerfiles", {
      titulo: "Otros Perfiles",
      mensajeExito: req.session.mensajeExito,
      perfiles: perfilesConEstado
    });

  } catch (error) {
    console.error('Error en getAllPerfilesController:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const crearUsuarioController = async (req, res) => {
  const sequelize = getSequelize();
  const usuarioRepo = new UsuarioRepository();
  const perfilRepo = new PerfilRepository();

  const { nombre, mail, contrasena, telefono, experiencia } = req.body;
  const foto = req.file?.filename;
  //console.log("Foto subida:", foto);
  //console.log("Datos recibidos:", req.body);

  //Verifica campos
  if (!mail || !contrasena) {
    return res.status(400).json({ error: "Mail y contraseña son obligatorios." });
  }

  try {
    const nuevoUsuario = await manejadorDeTransacciones.withTransaction(
      sequelize,
      async (transaction) => {
        return await crearUsuarioConPerfil({
          usuarioRepository: usuarioRepo,
          perfilRepository: perfilRepo,
          usuarioData: { username: mail, contrasena },
          perfilData: { nombre, mail, telefono, foto, experiencia },
          transaction,
          hashService,
        });
      }
    );

    req.session.user = {
      id_usuario: nuevoUsuario.id_usuario,
      id_perfil: nuevoUsuario.perfil.id_perfil,
      rol: 'usuario',
      username: nuevoUsuario.username,
      foto: nuevoUsuario.perfil.foto,
      nombre: nuevoUsuario.perfil.nombre
    };

    req.session.mensajeExito = "Usuario registrado exitosamente.";
    res.redirect(`/perfil/id/${nuevoUsuario.perfil.id_perfil}`);





  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const ingresarUsuarioController = async (req, res) => {
  const { mail, contraseña } = req.body;
  const usuarioRepo = new UsuarioRepository();
  const perfilRepo = new PerfilRepository();

  if (!mail || !contraseña) {
    return res.status(400).json({ error: "Mail y contraseña obligatorios." });
  }

  try {
    const usuario = await ingresar({
      mail,
      contraseña,
      usuarioRepo,
      hashService,
    });

    const perfil = await perfilRepo.findByUsuarioId(usuario.id_usuario);
    if (!perfil) {
      throw new Error("No se encontró el perfil del usuario.");
    }

    req.session.user = {
      id_usuario: usuario.id_usuario,
      id_perfil: perfil.id_perfil,
      rol: 'usuario',
      username: usuario.mail,
      foto: perfil.foto,
      nombre: perfil.nombre
    };


    //console.log("Usuario logueado:", req.session.user);

    res.redirect(`/mostrar/albumnes/${req.session.user.id_perfil}`);

  } catch (error) {
    console.error(error);
    res.status(401).render('logueo', { error: error.message });;
  }
};

export const cerrarSesionController = async (req, res) => {
  try {
    await cerrarSesion(req);
    res.redirect('/usuario/loguearse');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).send('Error al cerrar sesión');
  }
};

export const obtenerEstadisticasPerfilController = async (req, res) => {
  const perfilRepository = new PerfilRepository();
  try {
    const id_perfil = req.session.user.id_perfil;
    const estadisticas = await obtenerEstadisticasPerfil(id_perfil, perfilRepository)

    return res.render("estadisticas", {
      estadisticas,
      titulo: "Estadisticas de mi perfil"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
