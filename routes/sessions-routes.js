const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// GET /login form
router.get("/login", (req, res) => {
  res.render("users/login", { layout: "layouts/auth-layout" });
});

// POST /login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).send("Email dan password wajib diisi.");
  }

  const sql = `SELECT * FROM users WHERE email = ?;`;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Ada kesalahan pada server.");
    }

    if (results.length === 0) {
      return res.status(404).send("Email tidak terdaftar.");
    }

    const user = results[0]; // Ambil user pertama dari hasil query

    // Bandingkan password hash
    bcrypt.compare(password, user.password_hash, (err, isSame) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).send("Ada kesalahan pada server.");
      }

      if (isSame) {
        // Login berhasil, simpan userId di session
        req.session.userId = user.id;
        return res.redirect("/");
      } else {
        return res.status(401).send("Password salah.");
      }
    });
  });
});

// DELETE /logout
router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send("Gagal logout.");
    }
    res.redirect("/login");
  });
});

module.exports = router;
