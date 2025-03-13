const nums = document.querySelectorAll(".num");
const opers = document.querySelectorAll(".oper");
const display = document.querySelector("#display");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

let firstNum = "0";
let secondNum = "0";
let operator = "";
let displayText = display.textContent;
// save previous button press in "state" variable
let state = "";
let operCount = 0;
let hasOperated = false;
let secondToggle = false;

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

function reset() {
    displayText = "0";
    display.textContent = displayText;
    firstNum = 0;
    secondNum = 0;
    operator = "";
    operCount = 0;
    hasOperated = false;
    state = "";
}

nums.forEach((num) => {
    num.addEventListener("click", () => {
        // reset display after pressing a new number after calculation
        if (state === "equal") {
            reset();
            displayText = num.textContent;
            display.textContent = displayText;
            firstNum = displayText;
            // refresh = true;
            return;
        }

        // replace displayText on 0, operation change, or division by 0
        if ((displayText === "0" || state === "oper") || (displayText === "I can't let you do that.")) {
            displayText = num.textContent;
            // if operator changed, set secondNum
            if (state === "oper") {
                secondNum = num.textContent;
                secondToggle = true;
            }
            // otherwise, concat num
        } else {
            displayText = displayText.concat(num.textContent);
            if (secondToggle) {
                secondNum = displayText;
            }
        }
        display.textContent = displayText;
        state = "num";
    });
});

opers.forEach((oper) => {
    oper.addEventListener("click", () => {
        
        if (state !== "oper" && state !== "equal") {
            operCount++;
        }

        // perform operation if two numbers have been inputed
        if ((operCount % 2 === 0 || hasOperated) && (state !== "oper" && state !== "equal")) {
            // stop division by 0
            if (firstNum >= 0 && secondNum == "0" && operator == "/")
            {
                reset();
                displayText = "I can't let you do that.";
                display.textContent = displayText;
                return;
            }
            let result = operate(operator, +firstNum, +secondNum);
            // convert numbers larger than or equal to one million to exponential notation
            if (result >= 1000000) {
                result = result.toExponential(2);
            }
            firstNum = result;
            displayText = firstNum;
            display.textContent = displayText;
            hasOperated = true;
            secondToggle = false;
        }

        if (state === "num") {
            firstNum = displayText;
        }

        operator = oper.textContent;
        state = "oper";
    });
});

equal.addEventListener("click", () => {
    // stop division by 0
    if (firstNum >= 0 && secondNum === "0" && operator == "/") {
        reset();
        displayText = "I can't let you do that."
        display.textContent = displayText;
        return;
    } 
    
    // stop display from disappearing when pressing a num followed by =
    if (secondNum == "0" && state != "oper") {
        return;
    }

    if (state !== "equal") {
        // operate by self if operator and equals pressed in sequence
        if (state === "oper") {
            secondNum = firstNum;
        }
        let result = operate(operator, +firstNum, +secondNum);
        if (result >= 1000000) {
            result = result.toExponential(2);
        }
        firstNum = result;
        displayText = firstNum;
        display.textContent = displayText;
        hasOperated = true;
        secondToggle = false;
        state = "equal";
    }
 
})

clear.addEventListener("click", reset); 
