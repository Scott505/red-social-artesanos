export const estaLogueado = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user; 
    return next();
  }
  return res.redirect('/usuario/loguearse');
};
