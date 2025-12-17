import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _album_publicacion from  "./album_publicacion.js";
import _albumnes from  "./albumnes.js";
import _comentarios from  "./comentarios.js";
import _compartido from  "./compartido.js";
import _etiquetas from  "./etiquetas.js";
import _perfiles from  "./perfiles.js";
import _perfiles_etiquetas from  "./perfiles_etiquetas.js";
import _publicaciones from  "./publicaciones.js";
import _publicaciones_etiquetas from  "./publicaciones_etiquetas.js";
import _seguidores from  "./seguidores.js";
import _usuarios from  "./usuarios.js";

export default function initModels(sequelize) {
  const album_publicacion = _album_publicacion.init(sequelize, DataTypes);
  const albumnes = _albumnes.init(sequelize, DataTypes);
  const comentarios = _comentarios.init(sequelize, DataTypes);
  const compartido = _compartido.init(sequelize, DataTypes);
  const etiquetas = _etiquetas.init(sequelize, DataTypes);
  const perfiles = _perfiles.init(sequelize, DataTypes);
  const perfiles_etiquetas = _perfiles_etiquetas.init(sequelize, DataTypes);
  const publicaciones = _publicaciones.init(sequelize, DataTypes);
  const publicaciones_etiquetas = _publicaciones_etiquetas.init(sequelize, DataTypes);
  const seguidores = _seguidores.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  albumnes.belongsToMany(publicaciones, { as: 'id_publicacion_publicaciones', through: album_publicacion, foreignKey: "id_album", otherKey: "id_publicacion" });
  etiquetas.belongsToMany(perfiles, { as: 'id_perfil_perfiles', through: perfiles_etiquetas, foreignKey: "id_interes", otherKey: "id_perfil" });
  etiquetas.belongsToMany(publicaciones, { as: 'id_publicacion_publicaciones_publicaciones_etiqueta', through: publicaciones_etiquetas, foreignKey: "id_interes", otherKey: "id_publicacion" });
  perfiles.belongsToMany(etiquetas, { as: 'id_interes_etiqueta', through: perfiles_etiquetas, foreignKey: "id_perfil", otherKey: "id_interes" });
  perfiles.belongsToMany(perfiles, { as: 'id_seguido_perfiles', through: seguidores, foreignKey: "id_seguidor", otherKey: "id_seguido" });
  perfiles.belongsToMany(perfiles, { as: 'id_seguidor_perfiles', through: seguidores, foreignKey: "id_seguido", otherKey: "id_seguidor" });
  perfiles.belongsToMany(publicaciones, { as: 'id_publicacion_publicaciones_compartidos', through: compartido, foreignKey: "id_destinatario", otherKey: "id_publicacion" });
  publicaciones.belongsToMany(albumnes, { as: 'id_album_albumnes', through: album_publicacion, foreignKey: "id_publicacion", otherKey: "id_album" });
  publicaciones.belongsToMany(etiquetas, { as: 'id_interes_etiquetas_publicaciones_etiqueta', through: publicaciones_etiquetas, foreignKey: "id_publicacion", otherKey: "id_interes" });
  publicaciones.belongsToMany(perfiles, { as: 'id_destinatario_perfiles', through: compartido, foreignKey: "id_publicacion", otherKey: "id_destinatario" });
  album_publicacion.belongsTo(albumnes, { as: "id_album_albumne", foreignKey: "id_album"});
  albumnes.hasMany(album_publicacion, { as: "album_publicacions", foreignKey: "id_album"});
  perfiles_etiquetas.belongsTo(etiquetas, { as: "id_interes_etiqueta", foreignKey: "id_interes"});
  etiquetas.hasMany(perfiles_etiquetas, { as: "perfiles_etiqueta", foreignKey: "id_interes"});
  publicaciones_etiquetas.belongsTo(etiquetas, { as: "id_interes_etiqueta", foreignKey: "id_interes"});
  etiquetas.hasMany(publicaciones_etiquetas, { as: "publicaciones_etiqueta", foreignKey: "id_interes"});
  albumnes.belongsTo(perfiles, { as: "id_perfil_perfile", foreignKey: "id_perfil"});
  perfiles.hasMany(albumnes, { as: "albumnes", foreignKey: "id_perfil"});
  comentarios.belongsTo(perfiles, { as: "id_perfil_perfile", foreignKey: "id_perfil"});
  perfiles.hasMany(comentarios, { as: "comentarios", foreignKey: "id_perfil"});
  compartido.belongsTo(perfiles, { as: "id_destinatario_perfile", foreignKey: "id_destinatario"});
  perfiles.hasMany(compartido, { as: "compartidos", foreignKey: "id_destinatario"});
  perfiles_etiquetas.belongsTo(perfiles, { as: "id_perfil_perfile", foreignKey: "id_perfil"});
  perfiles.hasMany(perfiles_etiquetas, { as: "perfiles_etiqueta", foreignKey: "id_perfil"});
  publicaciones.belongsTo(perfiles, { as: "id_perfil_perfile", foreignKey: "id_perfil"});
  perfiles.hasMany(publicaciones, { as: "publicaciones", foreignKey: "id_perfil"});
  seguidores.belongsTo(perfiles, { as: "id_seguidor_perfile", foreignKey: "id_seguidor"});
  perfiles.hasMany(seguidores, { as: "seguidores", foreignKey: "id_seguidor"});
  seguidores.belongsTo(perfiles, { as: "id_seguido_perfile", foreignKey: "id_seguido"});
  perfiles.hasMany(seguidores, { as: "id_seguido_seguidores", foreignKey: "id_seguido"});
  album_publicacion.belongsTo(publicaciones, { as: "id_publicacion_publicacione", foreignKey: "id_publicacion"});
  publicaciones.hasMany(album_publicacion, { as: "album_publicacions", foreignKey: "id_publicacion"});
  comentarios.belongsTo(publicaciones, { as: "id_publicacion_publicacione", foreignKey: "id_publicacion"});
  publicaciones.hasMany(comentarios, { as: "comentarios", foreignKey: "id_publicacion"});
  compartido.belongsTo(publicaciones, { as: "id_publicacion_publicacione", foreignKey: "id_publicacion"});
  publicaciones.hasMany(compartido, { as: "compartidos", foreignKey: "id_publicacion"});
  publicaciones_etiquetas.belongsTo(publicaciones, { as: "id_publicacion_publicacione", foreignKey: "id_publicacion"});
  publicaciones.hasMany(publicaciones_etiquetas, { as: "publicaciones_etiqueta", foreignKey: "id_publicacion"});
  perfiles.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(perfiles, { as: "perfiles", foreignKey: "id_usuario"});

  return {
    album_publicacion,
    albumnes,
    comentarios,
    compartido,
    etiquetas,
    perfiles,
    perfiles_etiquetas,
    publicaciones,
    publicaciones_etiquetas,
    seguidores,
    usuarios,
  };
}
