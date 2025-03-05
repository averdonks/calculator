const nums = document.querySelectorAll(".num");
const opers = document.querySelectorAll(".oper");
const display = document.querySelector("#display");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

let firstNum = 0;
let secondNum = 0;
let operator = 0;
let displayText = display.textContent;
let toggleNum = false;
let onFirst = true;


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
        if (displayText === "0" || toggleNum) {
            displayText = num.textContent;
            toggleNum = false;
        } else {
            displayText = displayText.concat(num.textContent);
        }
        
        display.textContent = displayText;

        if (onFirst) {
            firstNum = +displayText;
        } else {
            secondNum = +displayText;
        }

        toggleNum = false;
        console.log(display.textContent);
        console.log(displayText);

    });
});

opers.forEach((oper) => {
    oper.addEventListener("click", () => {
        operator = oper.textContent;
        toggleNum = true;
        if (onFirst) {
            onFirst = false;
        } else {
            onFirst = true;
        }
    });
});

equal.addEventListener("click", () => {
    display.textContent = operate(operator, firstNum, secondNum);
    console.log(operator);
    console.log(firstNum);
    console.log(secondNum);
    onFirst = true;
})

clear.addEventListener("click", () => {
    display.textContent = "0";
    displayText = "0";
    firstNum = 0;
    secondNum = 0;
})

