class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.previousOperand = '';
		this.currentOperand = '';
		this.operator = '';
	}

	clearAll() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operator = '';
	}

	clear() {
		let len = this.currentOperand.length;
		this.currentOperand = this.currentOperand.slice(0, len - 1);
	}

	addNumber(numStr) {
		if (
			(this.currentOperand === '0' || this.currentOperand === '-0') &&
			numStr !== '.'
		)
			return;
		if (this.currentOperand.includes('.') && numStr === '.') return;
		if (this.previousOperand !== '' && this.operator === '') {
			this.clearAll();
		}
		this.currentOperand += numStr;
	}

	changeSign() {
		if (this.previousOperand !== '' && this.operator === '') {
			this.clearAll();
		}

		if (this.currentOperand.startsWith('-')) {
			this.currentOperand = this.currentOperand.replace('-', '');
		} else {
			this.currentOperand = `-${this.currentOperand}`;
		}
	}

	addOperator(operatorStr) {
		if (/\d/.test(this.currentOperand)) {
			if (this.previousOperand === '') {
				this.previousOperand = this.currentOperand;
			} else {
				this.compute();
			}
			this.currentOperand = '';
			this.operator = operatorStr;
		} else if (this.previousOperand !== '') {
			this.operator = operatorStr;
		}
	}

	compute() {
		let current = parseFloat(this.currentOperand);
		let previous = parseFloat(this.previousOperand);
		let result;
		if (isNaN(current) || isNaN(previous)) return;
		switch (this.operator) {
			case '+':
				result = previous + current;
				break;
			case '-':
				result = previous - current;
				break;
			case 'x':
				result = previous * current;
				break;
			case '÷':
				result = previous / current;
				break;
			default:
				return;
		}
		this.previousOperand = result.toString();
		this.currentOperand = '';
		this.operator = '';
	}

	displaySeparator(numStr) {
		if (/infinity/i.test(numStr)) {
			return numStr;
		}

		let int = '';
		let startIndex = 0;
		if (numStr.includes('-')) {
			startIndex = 1;
		}

		if (numStr.includes('.')) {
			let dotIndex = numStr.indexOf('.');
			int = numStr.substring(startIndex, dotIndex);
		} else {
			int = numStr.substring(startIndex);
		}

		let intArr = int.split('');
		let i = int.length % 3;
		for (i; i < int.length; i = i + 3) {
			if (intArr[i - 1] === undefined) {
				continue;
			} else {
				intArr[i - 1] = intArr[i - 1] + ',';
			}
		}

		return numStr.replace(int, intArr.join(''));
	}

	display() {
		this.previousOperandTextElement.innerText =
			this.displaySeparator(this.previousOperand) + ' ' + this.operator;
		this.currentOperandTextElement.innerText = this.displaySeparator(
			this.currentOperand
		);
		// console.log(`Current ${this.currentOperand}`);
		// console.log(`Operator ${this.operator}`);
		// console.log(`Previous ${this.previousOperand}`);
	}
}

const previousOperandTextElement = document.querySelector(
	'[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
	'[data-current-operand]'
);
const inputNumbers = document.querySelectorAll('[data-number]');
const inputOperators = document.querySelectorAll('[data-operator]');
const inputSign = document.querySelector('[data-sign]');
const inputClear = document.querySelector('[data-clear]');
const inputClearAll = document.querySelector('[data-clear-all]');
const inputEquals = document.querySelector('[data-equals]');

const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

inputNumbers.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.addNumber(button.innerText);
		calculator.display();
	});
});

inputClearAll.addEventListener('click', () => {
	calculator.clearAll();
	calculator.display();
});

inputSign.addEventListener('click', () => {
	calculator.changeSign();
	calculator.display();
});

inputClear.addEventListener('click', () => {
	calculator.clear();
	calculator.display();
});

inputOperators.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.addOperator(button.innerText);
		calculator.display();
	});
});

inputEquals.addEventListener('click', () => {
	calculator.compute();
	calculator.display();
});
