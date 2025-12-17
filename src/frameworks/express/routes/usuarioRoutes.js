import express from 'express';
import { crearUsuarioController, ingresarUsuarioController, cerrarSesionController } from '../../../adapters/controllers/PerfilController.js';
import { mostrarRegistroConEtiquetas } from '../../../adapters/controllers/EtiquetasController.js';
import { upload } from '../../../middlewares/upload.js';

export const usuarioRouter = express.Router();
// Ruta para obtener una persona por ID utilizando el controlador

usuarioRouter.get('/registrarse', mostrarRegistroConEtiquetas);

usuarioRouter.get('/loguearse', (req, res) => {
  res.render('logueo', { titulo: 'Iniciar sesión' });
});

usuarioRouter.post('/ingresar', ingresarUsuarioController);

usuarioRouter.post('/registrar', upload.single('foto'), crearUsuarioController);

usuarioRouter.post('/cerrar-sesion', cerrarSesionController);