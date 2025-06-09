const display = document.getElementById('display');
const historyBox = document.getElementById('history');

let expression = '';
let history = [];

function append(char) {
  expression += char;
  display.value = expression;
}

function clearDisplay() {
  expression = expression.slice(0, -1);
  display.value = expression;
}

function clearAll() {
  expression = '';
  display.value = '';
}

function calculate() {
  try {
    const result = eval(expression);
    const record = `${expression} = ${result}`;
    history.unshift(record);
    updateHistory();
    expression = result.toString();
    display.value = result;
  } catch {
    display.value = 'Error';
    expression = '';
  }
}

function updateHistory() {
  historyBox.innerHTML = history.map(item => `<div>${item}</div>`).join('');
}

function clearHistory() {
  history = [];
  updateHistory();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '%', '.'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    clearDisplay();
  } else if (key.toLowerCase() === 'c') {
    clearAll();
  }
});
