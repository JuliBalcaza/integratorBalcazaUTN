const auth = (req, res, next) => {
  if (req.session.user) {
    next()
    console.log(req.session.user);
  } else res.redirect("/noAuth")
}
module.exports = auth