export const cerrarSesion = (req) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
