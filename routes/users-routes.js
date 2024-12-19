const express = require("express");
const bcrypt = require("bcrypt");
const upload = require("../middlewares/upload");
const isAuthenticated = require("../middlewares/is-authenticated");
const db = require("../db");

const router = express.Router();
const saltRounds = 12;

// GET /signup form
router.get("/signup", (req, res) => {
  res.render("users/signup", { layout: "layouts/auth-layout" });
});

// POST /signup
router.post("/signup", async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).send("Semua field wajib diisi.");
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const sql = `
      INSERT INTO users (full_name, email, password_hash)
      VALUES (?, ?, ?);
    `;
    db.query(sql, [full_name, email, hash], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(400).send("Email sudah terdaftar.");
      }
      res.redirect("/login");
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
});

// GET /profile
router.get("/profile", isAuthenticated, (req, res) => {
  res.render("users/show", { currentPage: "profile" });
});

// GET /profile/edit
router.get("/profile/edit", isAuthenticated, (req, res) => {
  const sql = `
    SELECT id, name, symbol FROM currencies;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Gagal memuat data.");
    }

    res.render("users/edit", {
      currentPage: "profile",
      currencies: results,
    });
  });
});

router.post(
  "/profile",
  isAuthenticated,
  upload.single("profile_image"),
  (req, res) => {
    let profileImage = null;

    if (req.file) {
      profileImage = `/images/${req.file.filename}`;
    }

    const { full_name, email, preferred_currency } = req.body;
    const userId = res.locals.currentUser.id;

    if (!full_name || !email) {
      return res.status(400).send("Nama dan email wajib diisi.");
    }

    let sql;
    let values;

    if (profileImage) {
      sql = `
        UPDATE users
        SET full_name = ?, email = ?, currency_id = ?, profile_image_url = ?
        WHERE id = ?;
      `;
      values = [full_name, email, preferred_currency, profileImage, userId];
    } else {
      sql = `
        UPDATE users
        SET full_name = ?, email = ?, currency_id = ?
        WHERE id = ?;
      `;
      values = [full_name, email, preferred_currency, userId];
    }

    db.query(sql, values, (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Gagal memperbarui profil.");
      }
      res.redirect("/profile");
    });
  }
);

// GET /profile/password
router.get("/profile/password", isAuthenticated, (req, res) => {
  res.render("users/change-password", { currentPage: "profile" });
});

// PUT /profile/password
router.put("/profile/password", isAuthenticated, async (req, res) => {
  const userId = res.locals.currentUser.id;
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    return res.status(400).send("Semua field wajib diisi.");
  }

  const sql = `SELECT password_hash FROM users WHERE id = ?;`;

  try {
    db.query(sql, [userId], async (err, results) => {
      if (err || results.length === 0) {
        console.error("Database error:", err);
        return res.status(500).send("Gagal memverifikasi pengguna.");
      }

      const passwordHash = results[0].password_hash;
      const isSame = await bcrypt.compare(old_password, passwordHash);

      if (!isSame) {
        return res.status(401).send("Password lama salah.");
      }

      const newHash = await bcrypt.hash(new_password, saltRounds);
      const updateSql = `UPDATE users SET password_hash = ? WHERE id = ?;`;

      db.query(updateSql, [newHash, userId], (updateErr) => {
        if (updateErr) {
          console.error("Database error:", updateErr);
          return res.status(500).send("Gagal memperbarui password.");
        }
        res.redirect("/profile");
      });
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
});

module.exports = router;
