import { perfilRouter } from '../express/routes/perfilRoutes.js';
import { usuarioRouter } from '../express/routes/usuarioRoutes.js';
import { publicacionesRouter } from './routes/publicacionesRoutes.js';
import { mostrarRouter } from './routes/mostrarRoutes.js';
import { seguidoresRoutes } from './routes/seguidoresRoutes.js';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { estaLogueado } from '../../middlewares/estaLogueado.js';

export const appConfig = (app, io) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.set('io', io);

  // Configuración de la aplicación Express
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Config. sesion
  app.use(session({
    secret: 'clave-secreta-bien-larga',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: false,
      httpOnly: true
    }
  }));


  app.use((req, res, next) => {
    //  console.log("MIDDLEWARE GLOBAL - Session user:", req.session.user);
    res.locals.user = req.session.user || null;
    next();
  });

  // Configurar Pug
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../pug-views'));

  //Rutas
  app.get('/', estaLogueado, (req, res) => {
    const id = req.session.user.id_perfil;
    return res.redirect(`/mostrar/albumnes/${id}`);
  });
  app.use('/mostrar', estaLogueado, mostrarRouter);
  app.use('/publicar', estaLogueado, publicacionesRouter);
  app.use('/perfil', estaLogueado, perfilRouter);
  app.use('/usuario', usuarioRouter);
  app.use('/seguidores', estaLogueado, seguidoresRoutes);

  //conexión de socket.io
  io.on('connection', (socket) => {
    //console.log('🟢 usuario conectado');

    socket.on('registrar-usuario', (id_perfil) => {
      if (id_perfil) {
        socket.join(`usuario_${id_perfil}`);
        //console.log(`🔔 Usuario ${id_perfil} registrado en su sala`);
      }
    });

    // Aquí puedes agregar más eventos de socket.io según sea necesario
  });
};


