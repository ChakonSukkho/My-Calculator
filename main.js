const current = document.getElementById("current");
const previous = document.getElementById("previous");

let currentValue = "";
let operator = "";
let firstValue = "";


function appendValue(value) {
    if (currentValue === "0" && value !== ".") {
        currentValue = value;
    } else {
        currentValue += value;
    }

    // Append the value to the previous display
    if (previous.innerText === "0") {
        previous.innerText = value;
    } else {
        previous.innerText += value;
    }

    updateDisplay();
}

function clearDisplay(){
    currentValue = "";
    firstValue = "";
    operator = "";
    previous.innerText = "";
    current.innerText = "0";
}

function deleteLast(){
    currentValue = currentValue.slice(0, -1);

    if (currentValue === "") currentValue = "0";
    updateDisplay();
}

// Operator clicked
function handleOperator(op) {
    if (currentValue === "") return;

    // Ensure proper spacing around the operator in the previous display
    if (previous.innerText.slice(-1).match(/[+\-*/]/)) {
        previous.innerText = previous.innerText.trimEnd().slice(0, -1) + ` ${op} `;
    } else {
        previous.innerText = previous.innerText.trimEnd() + ` ${op} `;
    }

    firstValue = currentValue;
    operator = op;
    currentValue = "";
    current.innerText = "0";
}

function toggleSign(){
    if (currentValue === "") return;
    currentValue = (-parseFloat(currentValue)).toString();
    updateDisplay();
}

// Simple version
function percentage(){
    if (currentValue === "") return;
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
}

// Calculate result
function calculate(){
    if (firstValue === "" || currentValue === "") return;

    let result;
    let a = parseFloat(firstValue);
    let b = parseFloat(currentValue);

    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b === 0 ? "Error" : a / b;
            break;
        default:
            return;
   }

   // Update previous and current displays
    previous.innerText = `${firstValue} ${operator} ${currentValue}`;
    currentValue = result.toString();
    current.innerText = currentValue;
    firstValue = "";
    operator = "";
}

// Update display
function updateDisplay() {
    current.innerText = currentValue;
}