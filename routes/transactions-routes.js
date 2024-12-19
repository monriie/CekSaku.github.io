const express = require("express");
const db = require("../db");
const router = express.Router();

// GET /transactions
router.get("/", (req, res) => {
  const { userId } = req.session;

  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?
    ORDER BY t.date DESC;
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Terjadi kesalahan pada server.");
    }

    res.render("transactions/list", {
      currentPage: "transactions",
      transactions: results,
    });
  });
});

// POST /transactions
router.post("/", (req, res) => {
  const { userId } = req.session;
  const { amount, transaction_type, description, date, category } = req.body;

  if (!amount || !transaction_type || !date || !category) {
    return res.status(400).send("Semua field wajib diisi.");
  }

  const sql = `
    INSERT INTO transactions (amount, transaction_type, description, date, user_id, category_id)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [Number(amount), transaction_type, description, date, userId, Number(category)];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Gagal menyimpan transaksi.");
    }
    res.redirect("/transactions");
  });
});

// GET /transactions/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.description, t.date, c.name AS category_name
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.id = ?;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Terjadi kesalahan pada server.");
    }

    if (results.length === 0) {
      return res.status(404).send("Transaksi tidak ditemukan.");
    }

    res.render("transactions/show", { currentPage: "transactions", transaction: results[0] });
  });
});

// GET /transactions/:id/edit
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT * FROM transactions WHERE id = ?;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Terjadi kesalahan pada server.");
    }

    if (results.length === 0) {
      return res.status(404).send("Transaksi tidak ditemukan.");
    }

    res.render("transactions/edit", { currentPage: "transactions", transaction: results[0] });
  });
});

// PUT /transactions/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { amount, transaction_type, description, date, category } = req.body;

  if (!amount || !transaction_type || !date || !category) {
    return res.status(400).send("Semua field wajib diisi.");
  }

  const sql = `
    UPDATE transactions
    SET amount = ?, transaction_type = ?, description = ?, date = ?, category_id = ?
    WHERE id = ?;
  `;

  const values = [Number(amount), transaction_type, description, date, Number(category), id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Gagal memperbarui transaksi.");
    }
    res.redirect("/transactions");
  });
});

// DELETE /transactions/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM transactions WHERE id = ?;
  `;

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Gagal menghapus transaksi.");
    }
    res.redirect("/transactions");
  });
});


router.get("/transactions", function (req, res) {
  // Ambil kategori dari database
  const sql = "SELECT * FROM category";
  database.query(sql, function (err, results) {
    if (err) throw err;
    res.render("/transactions", { category: results });
    console.log(category);
  });
});


module.exports = router;
