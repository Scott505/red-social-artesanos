import { sequelize } from './dbConexion.js';
import initModels from '../models/init-models.js';

let models = null;

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a la base de datos exitosa');
    models = initModels(sequelize); //Se inician los modelos
  } catch (err) {
    console.error(' Error al conectar la base de datos:', err);
    process.exit(1);
  }
};

export const getModels = () => {
  if (!models) {
    throw new Error('Modelos no inicializados. Asegúrate de llamar a initDb primero.');
  }
  return models;
};

export const getSequelize = () => {
  return sequelize;
};
