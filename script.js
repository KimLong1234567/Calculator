let displayValue = '';
let currentValue = '';
let currentOperator = '';
let history = [];

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
        updateHistory(displayValue);
        updateDisplay();
        clearSelectedOperator();
    }
}

function updateHistory(result) {
    history.unshift(result);
    if (history.length > 3) {
        history.pop();
    }
    const resultHistory = document.getElementById('result-history');
    resultHistory.innerHTML = history.join('<br>');
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

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});
