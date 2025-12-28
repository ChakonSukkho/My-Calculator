// Get display elements
const current = document.getElementById("current");
const previous = document.getElementById("previous");

// Variables to store values
let currentValue = "";
let operator = "";
let firstValue = "";

// Add number or dot when button is clicked
function appendValue(value) {
    // Replace 0 when first number is entered
    if (currentValue === "0" && value !== ".") {
        currentValue = value;
    } else {
        currentValue += value;
    }

    // Show typing numbers in previous display
    if (previous.innerText === "0") {
        previous.innerText = value;
    } else {
        previous.innerText += value;
    }

    updateDisplay();
}

// Clear all values and reset display
function clearDisplay(){
    currentValue = "";
    firstValue = "";
    operator = "";
    previous.innerText = "";
    current.innerText = "0";
}

// Remove last entered number
function deleteLast(){
    currentValue = currentValue.slice(0, -1);

    if (currentValue === "") currentValue = "0";
    updateDisplay();
}

// When operator (+ - * /) is clicked
function handleOperator(op) {
    if (currentValue === "") return;

    // Replace operator if user clicks operator again
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

// Change number to positive or negative
function toggleSign(){
    if (currentValue === "") return;
    currentValue = (-parseFloat(currentValue)).toString();
    updateDisplay();
}

// Convert number to percentage
function percentage(){
    if (currentValue === "") return;
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
}

// Calculate the result when '=' is pressed
function calculate(){
    if (firstValue === "" || currentValue === "") return;

    let result;
    let a = parseFloat(firstValue);
    let b = parseFloat(currentValue);

    // Perform calculation based on operator
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

   // Show full calculation and result
    previous.innerText = `${firstValue} ${operator} ${currentValue}`;
    currentValue = result.toString();
    current.innerText = currentValue;
    firstValue = "";
    operator = "";
}

// Update the current display number
function updateDisplay() {
    current.innerText = currentValue;
}
