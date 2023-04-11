const calculator = {
  displayValue: '0',
  FirstOperand: null,
  SecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, SecondOperand } = calculator;
  
  if (SecondOperand === true) {
    calculator.displayValue = digit;
    calculator.SecondOperand = false;
  } else {
    calculator.displayValue = (displayValue === '0' ? digit : displayValue + digit);
  }
}

function inputDecimal(dot) {
  if (calculator.SecondOperand === true) {
    calculator.displayValue = "0."
    calculator.SecondOperand = false;
    return
  }
  
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { FirstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);
    
  if (operator && calculator.SecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }
  
  if (FirstOperand == null && !isNaN(inputValue)) {
    calculator.FirstOperand = inputValue;
  } else if (operator) {
    const result = calculate(FirstOperand, inputValue, operator);
  
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.FirstOperand = result;
  }
  
  calculator.SecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(FirstOperand, secondOperand, operator) {
  if (operator === '+') {
    return FirstOperand + secondOperand;
  } else if (operator === '-') {
    return FirstOperand - secondOperand;
  } else if (operator === '*') {
    return FirstOperand * secondOperand;
  } else if (operator === '/') {
    return FirstOperand / secondOperand;
  }
  
  return secondOperand;
}
  
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.FirstOperand = null;
  calculator.SecondOperand = false;
  calculator.operator = null;
}
  
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}
  
updateDisplay();
  
  
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }
  
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'clear':
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }
  
  updateDisplay();
});
  