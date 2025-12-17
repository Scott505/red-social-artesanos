export const manejadorDeTransacciones = {
  async withTransaction(sequelizeInstance, callback) {
    const t = await sequelizeInstance.transaction();
    try {
      const resultado = await callback(t);
      await t.commit();
      return resultado;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};
