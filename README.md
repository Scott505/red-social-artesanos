# 🎨 Red Social de Artesanos

Una red social pensada para que artesanos puedan compartir sus trabajos, seguir a otros usuarios, crear álbumes de fotos y conectarse entre sí. Proyecto desarrollado con Node.js, Express y Sequelize siguiendo una arquitectura limpia y modular.

## ✨ Características principales

- 👤 Registro y login con manejo de sesiones (express-session) y hasheo de contraseñas (bcrypt)
- 🖼️ Publicación de trabajos con imágenes y descripciones
- 📁 Creación y gestión de álbumes personales
- 🔔 Solicitudes de amistad y notificaciones en tiempo real (Socket.IO)
- 💬 Sistema de seguidores y comentarios
- 🌐 Interfaz responsive con templates en Pug + CSS personalizado

## 🛠️ Tecnologías utilizadas

- Back-end        ->   Node.js, Express.js
- Base de datos   ->   MySQL, Sequelize (ORM)
- Autenticación   ->   Express-session
- Front-end       ->   Pug (template engine), CSS
- Tiempo real     ->   Socket.IO
- Arquitectura    ->   Clean architecture

NOTA: La base de datos se encuentra subida vacia en la raiz como "artesanos.sql"
