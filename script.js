const descInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("totalIncome");
const expenseEl = document.getElementById("totalExpense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentFilter = "all";

addBtn.addEventListener("click", addTransaction);

function addTransaction() {
  const desc = descInput.value;
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  if (!desc || !amount) return;

  transactions.push({ desc, amount, type });
  save();
  render();

  descInput.value = "";
  amountInput.value = "";
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  save();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  render();
}

function render() {
  list.innerHTML = "";

  let balance = 0;
  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    balance += t.type === "income" ? t.amount : -t.amount;

    if (currentFilter !== "all" && t.type !== currentFilter) return;

    const li = document.createElement("li");
    li.classList.add(t.type);

    li.innerHTML = `
      <span>${t.desc}</span>
      <span>
        R$ ${t.amount.toFixed(2)}
        <button onclick="removeTransaction(${index})">X</button>
      </span>
    `;

    list.appendChild(li);
  });

  balanceEl.textContent = balance.toFixed(2);
  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);
}

function save() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

render();
