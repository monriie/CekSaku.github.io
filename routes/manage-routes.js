const express = require("express");
const db = require("../db");
const isAuthenticated = require("../middlewares/is-authenticated");

const router = express.Router();

// Get categories and budget data
router.get("/", isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  try {
    // Query untuk mendapatkan kategori (expense)
    const categoriesQuery = `
      SELECT id, name, category_type 
      FROM categories 
      WHERE category_type = 'expense'
    `;
    const categories = await db.query(categoriesQuery); // Gunakan await untuk query async

    // Query untuk mendapatkan data anggaran dan pengeluaran bulan ini
    const budgetQuery = `
      SELECT c.id AS category_id, c.name AS category_name, SUM(t.amount) AS total_spent
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ?
      AND MONTH(t.date) = MONTH(CURRENT_DATE)
      AND YEAR(t.date) = YEAR(CURRENT_DATE)
      GROUP BY c.id
    `;
    const currentMonthBudgets = await db.query(budgetQuery, [userId]); // Gunakan await untuk query async

    // Kirim kategori dan data anggaran bulan ini ke template
    res.render("manage", { categories, currentMonthBudgets });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
});

// Rute untuk menyimpan transaksi anggaran
router.post("/", isAuthenticated, async (req, res) => {
  const { category_id, amount } = req.body;
  const { userId } = req.session;

  try {
    // Periksa apakah kategori sudah ada untuk pengguna tersebut
    const checkExistingBudget = `
      SELECT id FROM budgets 
      WHERE user_id = ? AND category_id = ?
    `;
    const existingBudget = await db.query(checkExistingBudget, [
      userId,
      category_id,
    ]);

    if (existingBudget.length > 0) {
      // Jika kategori sudah ada, kirim pesan kesalahan
      return res.status(400).send("Kategori sudah ada untuk anggaran Anda.");
    }

    // Jika kategori belum ada, tambahkan anggaran baru
    const insertBudgetQuery = `
      INSERT INTO budgets (user_id, category_id, amount) 
      VALUES (?, ?, ?)
    `;
    await db.query(insertBudgetQuery, [userId, category_id, amount]); // Gunakan await

    // Redirect ke dashboard setelah berhasil
    res.redirect("/");
  } catch (err) {
    console.error("Error inserting transaction:", err.stack);
    res.status(500).send("Error saving tracker data.");
  }
});

module.exports = router;
