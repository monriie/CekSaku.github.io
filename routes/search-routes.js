const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /search
router.get("/", (req, res) => {
  const { userId } = req.session;
  const { query } = req.query;

  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE (LOWER(t.description) LIKE ? OR LOWER(c.name) LIKE ?)
    AND t.user_id = ?
    ORDER BY t.date DESC;
  `;

  const values = [
    `%${query.toLowerCase()}%`,
    `%${query.toLowerCase()}%`,
    userId,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Something went wrong...");
    }

    const transactions = results; // Hasil query langsung berupa array

    res.render("search/list", {
      currentPage: "search",
      transactions,
      query,
    });
  });
});

// GET /search/filter
router.get("/filter", (req, res) => {
  const { userId } = req.session;
  const {
    transactionType,
    incomeCategory,
    expenseCategory,
    minAmount,
    maxAmount,
    startDate,
    endDate,
  } = req.query;

  let sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?
  `;

  const values = [userId];

  // Tambahkan filter berdasarkan query parameter
  if (transactionType) {
    sql += ` AND t.transaction_type = ?`;
    values.push(transactionType);
  }

  if (incomeCategory || expenseCategory) {
    const categories = [];
    if (incomeCategory) categories.push(incomeCategory);
    if (expenseCategory) categories.push(expenseCategory);
    sql += ` AND t.category_id IN (${categories.map(() => "?").join(", ")})`;
    values.push(...categories);
  }

  if (minAmount) {
    sql += ` AND t.amount >= ?`;
    values.push(minAmount);
  }

  if (maxAmount) {
    sql += ` AND t.amount <= ?`;
    values.push(maxAmount);
  }

  if (startDate) {
    sql += ` AND t.date >= ?`;
    values.push(startDate);
  }

  if (endDate) {
    sql += ` AND t.date <= ?`;
    values.push(endDate);
  }

  sql += ` ORDER BY t.date DESC;`;

  console.log("SQL Query:", sql, "Values:", values);

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Something went wrong...");
    }

    const transactions = results; // Hasil query langsung berupa array

    res.render("search/list", {
      currentPage: "filter",
      transactions,
    });
  });
});

module.exports = router;
