const display = document.getElementById('display');
const preview = document.getElementById('preview');
const historyList = document.getElementById('history-list');

let currentTheme = 'dark';
let history = [];

function append(value) {
  if (display.textContent === '0') display.textContent = '';
  display.textContent += value;
  updatePreview();
}

function clearDisplay() {
  display.textContent = '0';
  preview.textContent = '0';
}

function deleteChar() {
  display.textContent = display.textContent.slice(0, -1) || '0';
  updatePreview();
}

function updatePreview() {
  try {
    const expression = display.textContent.replace(/(\d+)%/g, '($1/100)');
    preview.textContent = '' + eval(expression);
  } catch {
    preview.textContent = 'Error';
  }
}

function calculate() {
  try {
    const result = eval(display.textContent);
    history.push(display.textContent + ' = ' + result);
    display.textContent = result;
    preview.textContent = '' + result;
    renderHistory();
  } catch {
    display.textContent = 'Error';
  }
}

function toggleFunctions() {
  document.getElementById('functions').style.display =
    document.getElementById('functions').style.display === 'none' ? 'grid' : 'none';
}

function toggleConverter() {
  document.getElementById('converter').style.display =
    document.getElementById('converter').style.display === 'none' ? 'block' : 'none';
}

function toggleHistory() {
  document.getElementById('history').style.display = 'block';
  document.getElementById('buttons-main').style.display = 'none';
  document.getElementById('functions').style.display = 'none';
  document.getElementById('converter').style.display = 'none';
}

function backToCalc() {
  document.getElementById('history').style.display = 'none';
  document.getElementById('buttons-main').style.display = 'grid';
  updatePreview();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function renderConverterOptions() {
  const type = document.getElementById('convertType').value;
  const container = document.getElementById('converter-options');
  container.innerHTML = '';
  if (type === 'length') {
    container.innerHTML = `
      <input id="val" placeholder="meters">
      <button onclick="alert('km: ' + (val.value / 1000))">to km</button>
    `;
  } else if (type === 'weight') {
    container.innerHTML = `
      <input id="val" placeholder="grams">
      <button onclick="alert('kg: ' + (val.value / 1000))">to kg</button>
    `;
  } else if (type === 'temp') {
    container.innerHTML = `
      <input id="val" placeholder="Celsius">
      <button onclick="alert('F: ' + ((val.value * 9/5) + 32))">to Fahrenheit</button>
    `;
  }
}

function calculate() {
  try {
    const expression = display.textContent.replace(/(\d+)%/g, '($1/100)');
    const result = eval(expression);
    history.push(display.textContent + ' = ' + result);
    display.textContent = result;
    preview.textContent = '' + result;
    renderHistory();
  } catch {
    display.textContent = 'Error';
  }
}

