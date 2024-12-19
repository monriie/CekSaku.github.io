const ctx = document.getElementById("expenseTrendChart").getContext("2d");
const transactionsDataDiv = document.getElementById("transactions-data");
const incomesCanvas = document.getElementById("incomesTotalChart");
const expensesCanvas = document.getElementById("expensesTotalChart");
const totalIncomeDiv = document.getElementById("totalIncomeValue");
const totalExpenseDiv = document.getElementById("totalExpenseValue");
const incomeProgress = document.getElementById("incomeProgress");
const expenseProgress = document.getElementById("expenseProgress");
const incomeProgressText = document.getElementById("incomeProgressText");
const expenseProgressText = document.getElementById("expenseProgressText");


const transactions = JSON.parse(transactionsDataDiv.dataset.transactions);

const expensesData = transactions.filter(
  (t) => t.transaction_type === "expense"
);
const incomesData = transactions.filter((t) => t.transaction_type === "income");

const totalIncome = incomesData.reduce((acc, t) => acc + Number(t.amount), 0);
const totalExpense = expensesData.reduce((acc, t) => acc + Number(t.amount), 0);

// Incomes total chart
const incomeTotalChart = new Chart(incomesCanvas, {
  type: "doughnut",
  data: {
    labels: ["Pemasukan", "Tersisa"],
    datasets: [
      {
        data: [totalIncome, totalIncome - totalExpense],
        backgroundColor: ["#00ff08", "#E7E7E7"], 
      },
    ],
  },
});

// Expenses trend chart
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: expensesData.map((t) => t.date),
    datasets: [
      {
        label: "Transaksi Pengeluaran",
        data: expensesData.map((t) => t.amount),
        backgroundColor: "rgba(255, 69, 0, 0.2)",
        borderColor: "rgba(255, 69, 0, 1)",
        fill: true,
        tension: 0.2,
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Display total income
totalIncomeDiv.innerText = `${new Intl.NumberFormat().format(totalIncome)}`;

// Display total expense
totalExpenseDiv.innerText = `${new Intl.NumberFormat().format(totalExpense)}`;

// Update progress bars
const total = totalIncome + totalExpense;
const incomePercentage = total ? (totalIncome / total) * 100 : 0;
const expensePercentage = total ? (totalExpense / total) * 100 : 0;

incomeProgress.style.width = `${incomePercentage}%`;
incomeProgressText.innerText = `${incomePercentage.toFixed(2)}%`;

expenseProgress.style.width = `${expensePercentage}%`;
expenseProgressText.innerText = `${expensePercentage.toFixed(2)}%`;


