// Keeps track of inputed numbers and operator
let numOne, numTwo;
let operator;
let finalNum;

// Bools
let refreshScreen = false;
let completedOp = false;
let temp = false;
let isDecimal = false;

// Elements
const currentDisplay = document.getElementById('currentDisplay');
const prevDisplay = document.getElementById('prevDisplay');
const numButtons = document.querySelectorAll('.numButton');
const opButtons = document.querySelectorAll('.opButton');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');
const posNegButton = document.getElementById('pos-neg');
const decButton = document.getElementById('decimal');

// Event listener for if the user wants to use numpad/keyboard for input
document.addEventListener('keydown', (e) => {
    // 0-9 inputs
    if (e.key.match(/[0-9]/g)){
        if (completedOp)
                clear();
        if (currentDisplay.textContent === '0' || refreshScreen)
            refresh();
        // Prevents user from going over 10 inputed numbers at a time
        if (e.key) {
            if (currentDisplay.textContent.length >= 10)
                return;
            else
                currentDisplay.textContent += e.key;
        }
    }

    // Operation inputs
    if (e.key.match(/[/*+-]/g)){
        if (numOne){
            if(!completedOp)
                equals();
        }
        if (!currentDisplay.textContent)
            return;
        else {
            isDecimal = false;
            operator = e.key;
            numOne = Number(currentDisplay.textContent);
            refreshScreen = true;
            completedOp = false;
            // Converts number to exponential form if it goes over 12 digits
            if(numOne.toString().length >= 12)
                prevDisplay.textContent = numOne.toExponential(6) + ' ' + operator;
            else
                prevDisplay.textContent = numOne + ' ' + operator;
        }
    }

    // Equals input
    if (e.key.match(/[=]/g) || e.key === 'Enter'){
        equals();
    }

    // Clear input
    if (e.key === 'Escape'){
        clear();
    }

    // Remove previous input
    if (e.key === 'Backspace' || e.key === 'Delete'){
        remove();
    }

    // Decimal input
    if (e.key.match(/[.]/g)){
        if (!isDecimal) {
            currentDisplay.textContent += '.';
            isDecimal = true;
        }
    }
});

// Event listener for numbers if the user wants to use the onscreen inputs
numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (completedOp)
            clear();
        if (currentDisplay.textContent === '0' || refreshScreen)
            refresh();
        // Prevents user from going over 10 inputed numbers at a time
        if (currentDisplay.textContent.length >= 10)
            return;
        else
            currentDisplay.textContent += button.getAttribute('data-num');
    })
});

// Event listener for operators if the user wants to use the onscreen inputs
opButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (numOne){
            if(!completedOp)
                equals();
        }
        if (!currentDisplay.textContent)
            return;
        else {
            isDecimal = false;
            operator = button.getAttribute('data-num');
            numOne = Number(currentDisplay.textContent);
            refreshScreen = true;
            completedOp = false;
            // Converts number to exponential form if it goes over 12 digits
            if(numOne.toString().length >= 12)
                prevDisplay.textContent = numOne.toExponential(6) + ' ' + operator;
            else
                prevDisplay.textContent = numOne + ' ' + operator;
        }
    })
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    clear();
});

// Clears/resets the calculator
function clear(){
    currentDisplay.textContent = '0';
    prevDisplay.textContent = '\xa0';
    numOne = undefined;
    numTwo = undefined;
    operator = undefined;
    completedOp = false;
    isDecimal = false;
    roundOp = false;
}

// Event listener for the delete button
deleteButton.addEventListener('click', () => {
    remove();
});

// Removes the previous inputted number
function remove(){
    delVal = currentDisplay.textContent.charAt(currentDisplay.textContent.length - 1);
    if (delVal === '.')
        isDecimal = false;
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    if (!currentDisplay.textContent)
        currentDisplay.textContent = '0';
}

// Event listener for the equals button
equalsButton.addEventListener('click', () => {
    equals();
});

// Completes the inputted operation
function equals(){
    if (completedOp) {
        // Converts number to exponential form if it goes over 12 digits
        if(numOne.toString().length >= 12)
            prevDisplay.textContent = numOne.toExponential(6) + ' ' + operator + ' ' + numTwo;
        else
            prevDisplay.textContent = numOne + ' ' + operator + ' ' + numTwo;
        refreshScreen = true;
        operate(numOne, numTwo, operator);
    }
    else if (!currentDisplay.textContent || !operator)
        return;
    else {
        numTwo = Number(currentDisplay.textContent);
        // Converts number to exponential form if it goes over 12 digits
        if(numOne.toString().length >= 12)
            prevDisplay.textContent = numOne.toExponential(6) + ' ' + operator + ' ' + numTwo;
        else
            prevDisplay.textContent = numOne + ' ' + operator + ' ' + numTwo;
        refreshScreen = true;
        completedOp = true;
        operate(numOne, numTwo, operator)
    }
}

// Event listener for the positive/negative button
posNegButton.addEventListener('click', () => {
    if (currentDisplay.textContent === '0')
        currentDisplay.textContent = '-'
    else if (Number(currentDisplay.textContent) > 0)
        currentDisplay.textContent = (Number(currentDisplay.textContent) * -1);
    else 
        currentDisplay.textContent = (Math.abs(Number(currentDisplay.textContent)));
});

// Event listener for the decimal button
decButton.addEventListener('click', () => {
    if (!isDecimal) {
        currentDisplay.textContent += '.';
        isDecimal = true;
    }
})

// Refreshs the display screen
function refresh(){
    currentDisplay.textContent = '';
    refreshScreen = false;
}

// Performs the operation based on the selected operator
function operate(one, two, op){
    console.log(numOne + ' ' + operator + ' ' + numTwo);
    switch (op){
        case '+':
            add(one, two);
            break;
        case '-':
            subtract(one, two);
            break;
        case '*':
            multiply(one, two);
            break;
        case '/':
            divide(one, two);
            break;
        default:
            console.log('Invalid operator');
    }
}

// Addition function
function add(num1, num2){
    finalNum = num1 + num2;
    finalNum = roundTo(finalNum);
    // Converts number to exponential form if it goes over 12 digits
    if(finalNum.toString().length >= 12)
        finalNum = finalNum.toExponential(6);
    currentDisplay.textContent = finalNum;
    numOne = Number(finalNum);
}

// Subtraction function
function subtract(num1, num2){
    finalNum = num1 - num2;
    finalNum = roundTo(finalNum);
    // Converts number to exponential form if it goes over 12 digits
    if(finalNum.toString().length >= 12)
        finalNum = finalNum.toExponential(6);
    currentDisplay.textContent = finalNum;
    numOne = Number(finalNum);
}

// Multiplication function
function multiply(num1, num2){
    finalNum = num1 * num2;
    finalNum = roundTo(finalNum);
    // Converts number to exponential form if it goes over 12 digits
    if(finalNum.toString().length >= 12)
        finalNum = finalNum.toExponential(6);
    currentDisplay.textContent = finalNum;
    numOne = Number(finalNum);
}

// Division Function
function divide(num1, num2){
    if (num2 === 0) {
        divideZero();
    }
    else {
        finalNum = num1 / num2;
        finalNum = roundTo(finalNum);
        // Converts number to exponential form if it goes over 12 digits
        if(finalNum.toString().length >= 12)
            finalNum = finalNum.toExponential(6);
        currentDisplay.textContent = finalNum;
        numOne = Number(finalNum);
    }
}

// Checks for divide by 0
function divideZero(){
    currentDisplay.textContent = 'Error';
    numOne = undefined;
    numTwo = undefined;
    operator = undefined;
    completedOp = false;
}

// Rounds decimal values to 4 digits
function roundTo(n) {
    var negative = false;
    var digits = 4;
    if (n % 1 === 0) {
        isDecimal = false;
        return n;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    isDecimal = true;
    n = n.toString() 
    return Number(n);
}