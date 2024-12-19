const db = require("../db");

function setCurrentUser(req, res, next) {
  if (req.session && req.session.userId) {
    const sql = `
      SELECT u.id, u.full_name, u.email, u.profile_image_url, c.name AS currency_name, c.symbol AS currency_symbol
      FROM users AS u
      LEFT JOIN currencies AS c ON u.currency_id = c.id
      WHERE u.id = ?;
    `;

    db.query(sql, [req.session.userId], (err, dbRes) => {
      if (err) {
        console.error("Database error:", err);
        return next(err);  // Pass error to next middleware (error handler)
      }

      if (dbRes.length === 0) {
        // User not found, handle it (e.g., log out or redirect)
        return res.redirect("/login");  // Or handle as needed
      }

      res.locals.currentUser = dbRes[0]; // Since dbRes is an array, get the first user object
      next();  // Continue to the next middleware or route handler
    });
  } else {
    next();  // If there's no session, just proceed to the next middleware
  }
}

module.exports = setCurrentUser;
