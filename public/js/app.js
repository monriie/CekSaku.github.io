// Global variables
const openIncomeModalBtn = document.querySelector("#openIncomeModal");
const openExpenseModalBtn = document.querySelector("#openExpenseModal");

const closeIncomeModalBtn = document.querySelector(".new-income-modal .close");
const closeExpenseModalBtn = document.querySelector(
  ".new-expense-modal .close"
);

const userBtn = document.querySelector(".user");
const dropdownContent = document.querySelector(".dropdown-content");


const newIncomeModal = document.querySelector(".new-income-modal");
const newExpenseModal = document.querySelector(".new-expense-modal");

// Event listeners
openIncomeModalBtn.addEventListener("click", () => {
  newIncomeModal.style.display = "block";
});

openExpenseModalBtn.addEventListener("click", () => {
  newExpenseModal.style.display = "block";
});

closeIncomeModalBtn.addEventListener("click", () => {
  newIncomeModal.style.display = "none";
});

closeExpenseModalBtn.addEventListener("click", () => {
  newExpenseModal.style.display = "none";
});

userBtn.addEventListener("click", () => {
  dropdownContent.classList.toggle("show");
});
document.getElementById('wrap-nav').addEventListener('click', function (e) {
  e.preventDefault();
  this.classList.toggle('active');
});


  const deleteButtons = document.querySelectorAll('button[type="submit"]');
