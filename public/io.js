function registrarUsuario(socket, user) {
  if (user && user.id_perfil) {
    socket.emit('registrar-usuario', user.id_perfil);
  }
}

function manejarNuevaSolicitud(data) {
  const solicitudesBtn = document.querySelector('a[href="/seguidores/solicitudes"]');
  if (solicitudesBtn) {
    let contador = solicitudesBtn.querySelector('.contador-solicitudes');
    if (!contador) {
      contador = document.createElement('span');
      contador.classList.add('contador-solicitudes');
      solicitudesBtn.appendChild(contador);
    }
    let actual = parseInt(contador.textContent) || 0;
    actual += 1;
    contador.textContent = actual;
    contador.style.display = 'inline-block';
  }
}

function manejarNuevaNotificacion(data) {
  console.log('BTN notif:', document.querySelector('a[href="/notificaciones"]'));
  const notificacionesBtn = document.querySelector('a[href="/notificaciones"]');
  if (notificacionesBtn) {
    // Usamos la misma clase 'contador-solicitudes' para que herede tus estilos de la marca roja
    let contador = notificacionesBtn.querySelector('.contador-solicitudes');
    if (!contador) {
      contador = document.createElement('span');
      contador.classList.add('contador-solicitudes');
      notificacionesBtn.appendChild(contador);
    }
    let actual = parseInt(contador.textContent) || 0;
    actual += 1;
    contador.textContent = actual;
    contador.style.display = 'inline-block';
  }
}



function mostrarToast(mensaje) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  // Eliminarlo después de que se desvanece
  setTimeout(() => {
    toast.remove();
  }, 4000);
}



document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const user = window.usuarioAutenticado || null;

  registrarUsuario(socket, user);

  socket.on('nueva-solicitud', (data) => {
    //console.log('📥 Notificación recibida:', data);
    manejarNuevaSolicitud(data);
  });

  socket.on('solicitud-aceptada', (data) => {
    mostrarToast(data.mensaje);
  });

  socket.on('nueva-notificacion', (data) => {
    manejarNuevaNotificacion(data);
  });

  const btn = document.getElementById('btn-notificaciones');
  const dropdown = document.getElementById('dropdown-notificaciones');

  if (btn && dropdown) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

        dropdown.style.display = 'block';

        const contador = btn.querySelector('.contador-solicitudes');
        if (contador) contador.style.display = 'none';

        socket.emit('marcar-notificaciones', user.id_perfil);  
    });
  }
});