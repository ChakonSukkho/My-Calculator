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

    firstValue = currentValue;
    operator = op;
    previous.innerText = `${firstValue} ${operator}`;
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

// Advance version

// function percentage(){
//     if(display.value === "") return;

//     let value = display.value;

//     try{
//         if(value.includes("+") || value.includes("-")){
//             let parts = value.split(/([+\-])/);
//             let base = parseFloat(parts[0]);
//             let percent = parseFloat(parts[2]);
//             display.value = base + parts[1] + (base*percent/100);
//         }
//         else if(value.includes("*") || value.includes("/")){
//             let parts = value.split(/([*/])/);
//             display.value = eval(parts[0] + parts[1] + (parts[2] / 100));
//         }
//         else{
//             display.value = value/100;
//         }
//     }catch{
//         display.value = "Error";
//     }
// }

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