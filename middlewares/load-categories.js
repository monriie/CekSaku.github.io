const db = require("../db");

function loadCategories(req, res, next) {
  if (res.locals.currentUser === undefined) {
    next();
    return;
  }

  const sql = `SELECT * FROM categories`;

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      res.locals.categories = dbRes;
      next();
    }
  });
}

module.exports = loadCategories;
