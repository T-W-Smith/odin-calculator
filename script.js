let numOne, numTwo;
let operator;
let finalNum;
let refreshScreen = false;
let completedOp = false;
let isDecimal = false;

const currentDisplay = document.getElementById('currentDisplay');
const prevDisplay = document.getElementById('prevDisplay');
const numButtons = document.querySelectorAll('.numButton');
const opButtons = document.querySelectorAll('.opButton');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');
const posNegButton = document.getElementById('pos-neg');
const decButton = document.getElementById('decimal');

numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (completedOp)
            clear();
        if (currentDisplay.textContent === '0' || refreshScreen)
            refresh();
        currentDisplay.textContent += button.getAttribute('data-num');;
    })
});

opButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (numOne)
            equals();
        if (!currentDisplay.textContent)
            return;
        else {
            isDecimal = false;
            operator = button.getAttribute('data-num');
            numOne = Number(currentDisplay.textContent);
            refreshScreen = true;
            completedOp = false;
            prevDisplay.textContent = numOne + ' ' + operator;
        }
    })
});

clearButton.addEventListener('click', () => {
    clear();
});

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

deleteButton.addEventListener('click', () => {
    delVal = currentDisplay.textContent.charAt(currentDisplay.textContent.length - 1);
    if (delVal === '.')
        isDecimal = false;
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    if (!currentDisplay.textContent)
        currentDisplay.textContent = '0';
});

equalsButton.addEventListener('click', () => {
    equals();
});

function equals(){
    if (completedOp) {
        prevDisplay.textContent = numOne + ' ' + operator + ' ' + numTwo;
        refreshScreen = true;
        operate(numOne, numTwo, operator)
    }
    else if (!currentDisplay.textContent || !operator)
        return;
    else {
        numTwo = Number(currentDisplay.textContent);
        prevDisplay.textContent = numOne + ' ' + operator + ' ' + numTwo;
        refreshScreen = true;
        completedOp = true;
        operate(numOne, numTwo, operator)
    }
}

posNegButton.addEventListener('click', () => {
    if (currentDisplay.textContent === '0')
        currentDisplay.textContent = '-'
    else if (Number(currentDisplay.textContent) > 0)
        currentDisplay.textContent = (Number(currentDisplay.textContent) * -1);
    else 
        currentDisplay.textContent = (Math.abs(Number(currentDisplay.textContent)));
});

decButton.addEventListener('click', () => {
    if (!isDecimal) {
        currentDisplay.textContent += '.';
        isDecimal = true;
    }
})

function refresh(){
    currentDisplay.textContent = '';
    refreshScreen = false;
}

function operate(one, two, op){
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

function add(num1, num2){
    finalNum = num1 + num2;
    finalNum = roundTo(finalNum);
    currentDisplay.textContent = finalNum;
    numOne = Number(finalNum);
}

function subtract(num1, num2){
    finalNum = num1 - num2;
    finalNum = roundTo(finalNum);
    currentDisplay.textContent = finalNum;
    numOne = Number(finalNum);
}

function multiply(num1, num2){
    finalNum = num1 * num2;
    finalNum = roundTo(finalNum);
    currentDisplay.textContent = finalNum;
    numOne = Number(finalNum);
}

function divide(num1, num2){
    if (num2 === 0) {
        divideZero();
    }
    else {
        finalNum = num1 / num2;
        finalNum = roundTo(finalNum);
        currentDisplay.textContent = finalNum;
        numOne = Number(finalNum);
    }
}

function divideZero(){
    currentDisplay.textContent = 'Error';
    numOne = undefined;
    numTwo = undefined;
    operator = undefined;
    completedOp = false;
}

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