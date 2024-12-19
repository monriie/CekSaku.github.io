function loadRequestQuery(req, res, next) {
  res.locals.query = req.query || {};
  next();
}

module.exports = loadRequestQuery;
