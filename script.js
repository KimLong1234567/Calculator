let displayValue = '';
let currentValue = '';
let currentOperator = '';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.calculator');
    createCalculator(container);
    updateDisplay();
});

function createCalculator(container) {
    const displayDiv = document.createElement('div');
    displayDiv.classList.add('display');

    const displayInput = document.createElement('input');
    displayInput.type = 'text';
    displayInput.id = 'display';
    displayInput.readOnly = true;
    displayDiv.appendChild(displayInput);

    container.appendChild(displayDiv);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const buttons = [
        { text: 'C', onclick: clearDisplay },
        { text: 'CE', onclick: clearEntry },
        { text: '&#9003;', onclick: deleteLast },
        { text: '/', onclick: () => inputOperator('/', event.target) },
        { text: '7', onclick: () => inputValue('7') },
        { text: '8', onclick: () => inputValue('8') },
        { text: '9', onclick: () => inputValue('9') },
        { text: '*', onclick: () => inputOperator('*', event.target) },
        { text: '4', onclick: () => inputValue('4') },
        { text: '5', onclick: () => inputValue('5') },
        { text: '6', onclick: () => inputValue('6') },
        { text: '-', onclick: () => inputOperator('-', event.target) },
        { text: '1', onclick: () => inputValue('1') },
        { text: '2', onclick: () => inputValue('2') },
        { text: '3', onclick: () => inputValue('3') },
        { text: '+', onclick: () => inputOperator('+', event.target) },
        { text: '0', class: 'zero', onclick: () => inputValue('0') },
        { text: '.', onclick: () => inputValue('.') },
        { text: '=', class: 'equals', onclick: computeResult }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.innerHTML = btn.text;
        button.onclick = btn.onclick;
        if (btn.class) button.classList.add(btn.class);
        buttonsDiv.appendChild(button);
    });

    container.appendChild(buttonsDiv);
}

function clearDisplay() {
    displayValue = '';
    currentValue = '';
    currentOperator = '';
    updateDisplay();
    clearSelectedOperator();
}

function clearEntry() {
    currentValue = '';
    updateDisplay();
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    updateDisplay();
}

function inputValue(value) {
    currentValue += value;
    updateDisplay();
}

function inputOperator(operator, button) {
    if (currentValue !== '') {
        if (displayValue === '') {
            displayValue = currentValue;
        } else if (currentOperator !== '') {
            computeResult();
            displayValue = currentValue;
        }
        currentOperator = operator;
        currentValue = '';
        updateDisplay();
        highlightSelectedOperator(button);
    }
}

function computeResult() {
    if (currentValue !== '' && displayValue !== '' && currentOperator !== '') {
        let result;
        switch (currentOperator) {
            case '+':
                result = parseFloat(displayValue) + parseFloat(currentValue);
                break;
            case '-':
                result = parseFloat(displayValue) - parseFloat(currentValue);
                break;
            case '*':
                result = parseFloat(displayValue) * parseFloat(currentValue);
                break;
            case '/':
                result = parseFloat(displayValue) / parseFloat(currentValue);
                break;
            default:
                return;
        }
        displayValue = result.toString();
        currentValue = '';
        currentOperator = '';
        updateDisplay();
        clearSelectedOperator();
    }
}

function updateDisplay() {
    document.getElementById('display').value = currentValue !== '' ? currentValue : displayValue;
}

function highlightSelectedOperator(button) {
    clearSelectedOperator();
    button.classList.add('selected-operator');
}

function clearSelectedOperator() {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => button.classList.remove('selected-operator'));
}
