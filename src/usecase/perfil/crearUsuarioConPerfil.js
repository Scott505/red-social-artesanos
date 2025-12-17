export const crearUsuarioConPerfil = async ({
  usuarioData,
  perfilData,
  intereses,
  usuarioRepository,
  perfilRepository,
  perfilesEtiquetasRepository,
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
  //agregar intereses a la transaccion
  if (intereses && Array.isArray(intereses)) {
    for (const id_interes of intereses) {
      await perfilesEtiquetasRepository.create(
        {
          id_perfil: perfil.id_perfil,
          id_interes: Number(id_interes),
        },
        { transaction }
      );
    }
  }
  return { usuario, perfil };
  ;
};