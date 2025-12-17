export const ingresar = async ({
    mail,
    contraseña,
    usuarioRepo,
    hashService }) => {
    const usuario = await usuarioRepo.findByUsername(mail);
    if (!usuario) throw new Error("Datos incorrectos");

    const passwordValida = await hashService.compare(contraseña, usuario.contraseña_hash);
    if (!passwordValida) throw new Error("Datos incorrectos");

    //console.log("Usuario ingresado:", usuario);

    return {
        id_usuario: usuario.id_usuario,
        username: usuario.username,
        rol: usuario.rol
    };
};
