const firstNum = document.getElementById("numberInput1");
const secondNum = document.getElementById("numberInput2");
const operator = document.getElementById("operatorInput");
const result = document.getElementById("resultInput");
const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");
const equalsButton = document.getElementById("equalsButton");
const dotButton = document.getElementById("dotButton");
const deleteButton = document.getElementById("deleteButton");
const operatorButtons = document.querySelectorAll("button[data-op]");

let activeInput = firstNum;

[firstNum, secondNum, operator].forEach(input => {
    input.addEventListener("focus", () => {
        activeInput = input;
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            calculate();
        }
    });
});

clearButton.addEventListener("click", Clear);
equalsButton.addEventListener("click", calculate);
dotButton.addEventListener("click", insertDot);
deleteButton.addEventListener("click", deleteLastChar);
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        operator.value = button.dataset.op;
        secondNum.focus();
    });
});

function Clear() {
    firstNum.value = "";
    secondNum.value = "";
    operator.value = "";
    result.value = "";
    firstNum.focus();
}

function insertDot() {
    if (activeInput === operator) {
        return;
    }

    if (!activeInput.value.includes(".")) {
        activeInput.value += ".";
    }
    activeInput.focus();
}

function deleteLastChar() {
    if (![firstNum, secondNum, operator].includes(activeInput)) {
        activeInput = secondNum.value ? secondNum : firstNum;
    }

    activeInput.value = activeInput.value.slice(0, -1);
    activeInput.focus();
}

function calculate() {
    const a = parseFloat(firstNum.value);
    const b = parseFloat(secondNum.value);
    const op = operator.value.trim();
    let res;

    if (Number.isNaN(a) || Number.isNaN(b)) {
        res = "Enter valid numbers";
    } else {
        switch (op) {
            case "+":
                res = a + b;
                break;
            case "-":
                res = a - b;
                break;
            case "*":
                res = a * b;
                break;
            case "/":
                res = b !== 0 ? a / b : "Error (divide by 0)";
                break;
            default:
                res = "Invalid operator";
        }
    }

    result.value = res;
    return false;
}