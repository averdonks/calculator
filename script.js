const nums = document.querySelectorAll(".num");
const display = document.querySelector("#display");

let firstNum = 0;
let secondNum = 0;
let operator = 0;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(oper, num1, num2) {
    switch(oper) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

nums.forEach((num) => {
    num.addEventListener("click", () => {
        console.log("clicked");
        display.textContent = display.textContent.concat(num.textContent);
    });
});

// Testing functionality

firstNum = 10;
secondNum = 5;

operator = "+";
console.log(operate(operator, firstNum, secondNum));

operator = "-";
console.log(operate(operator, firstNum, secondNum));

operator = "*";
console.log(operate(operator, firstNum, secondNum));

operator = "/";
console.log(operate(operator, firstNum, secondNum));

