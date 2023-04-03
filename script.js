let numOne;
let numTwo;
let operator;

const calcDisplay = document.getElementById('display');
const numButtons = document.getElementById('numButtons');
const opButtons = document.getElementById('opButtons');
const clearButton = document.getElementById('clear');

numButtons.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton)
        return
    else
        calcDisplay.textContent += e.target.textContent;
});

opButtons.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton)
        return
    else
        calcDisplay.textContent += e.target.textContent;
});

clearButton.addEventListener('click', (e) => {
    calcDisplay.textContent = ' ';
})


function operate(numOne, numTwo, operator){
    switch (operator){
        case '+':
            add(numOne, numTwo);
            break;
        case '-':
            subtract(numOne, numTwo);
            break;
        case '*':
            multiply(numOne, numTwo);
            break;
        case '/':
            divide(numOne, numTwo);
            break;
        default:
            console.log('Invalid operator');
    }
}

function add(num1, num2){
    newNum = num1 + num2;
    console.log(newNum);
}

function subtract(num1, num2){
    newNum = num1 - num2;
    console.log(newNum);
}

function multiply(num1, num2){
    newNum = num1 * num2;
    console.log(newNum);
}

function divide(num1, num2){
    newNum = num1 / num2;
    console.log(newNum);
}