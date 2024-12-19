const express = require("express");
const db = require("../db");

const isAuthenticated = require("../middlewares/is-authenticated");

const router = express.Router();

// Rute untuk dashboard (GET)
router.get("/", isAuthenticated, (req, res) => {
  const { userId } = req.session;

  // Query untuk transaksi
  const sql = `
  SELECT 
    t.id, 
    t.amount, 
    t.transaction_type, 
    t.date, 
    c.name AS category_name
  FROM transactions t
  JOIN categories c ON t.category_id = c.id
  WHERE t.user_id = ?
  AND t.date >= CURDATE() - INTERVAL 30 DAY
  ORDER BY t.date DESC;
  `;
  const values = [userId];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Something went wrong");
    }
    const transactions = results;

    // Query untuk progres anggaran
    const bar = `
    SELECT 
      b.id AS budget_id,
      b.category_id,
      b.amount AS budget_amount,
      c.name AS category_name,
      SUM(t.amount) AS total_spent,
      (b.amount - IFNULL(SUM(t.amount), 0)) AS remaining_amount
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    LEFT JOIN transactions t ON t.category_id = b.category_id AND t.user_id = b.user_id
    WHERE b.user_id = ?
    AND MONTH(b.created_at) = MONTH(CURRENT_DATE)
    AND YEAR(b.created_at) = YEAR(CURRENT_DATE)
    GROUP BY b.id
    `;

    db.query(bar, [userId], (err, budgetResults) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Something went wrong");
      }

      // Proses data untuk menampilkan di dashboard
      const budgets = budgetResults.map((budget) => {
        const percentageUsed =
          (budget.total_spent / budget.budget_amount) * 100;
        return {
          id: budget.budget_id,
          name: budget.category_name,
          budgetAmount: budget.budget_amount,
          totalSpent: budget.total_spent,
          remaining: budget.remaining_amount,
          percentageUsed: Math.min(percentageUsed, 100), // pastikan tidak lebih dari 100%
        };
      });

      res.render("dashboard", {
        currentPage: "dashboard",
        transactions,
        budgets,
      });
    });
  });
});

// Rute untuk menghapus anggaran (DELETE)
router.delete("/budgets/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM budgets WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting budget:", err);
      return res.status(500).send("gagal hapus tracker");
    }
    res.redirect("/");
  });
});

module.exports = router;
