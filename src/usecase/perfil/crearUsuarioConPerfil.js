export const crearUsuarioConPerfil = async ({
  usuarioData,
  perfilData,
  usuarioRepository,
  perfilRepository,
  transaction,
  hashService,
}) => {
    // Hash de contraseña
    const hashedPassword = await hashService.hash(usuarioData.contrasena);
    const usuarioDataConHash = {
      ...usuarioData,
      contraseña_hash: hashedPassword,
    };

    delete usuarioDataConHash.contraseña;

    // Crear usuario y perfil dentro de una transacción
    const usuario = await usuarioRepository.create(usuarioDataConHash, { transaction });
    perfilData.id_usuario = usuario.id_usuario;
    const perfil = await perfilRepository.create(perfilData, { transaction });

    return { usuario, perfil };
  ;
};