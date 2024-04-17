"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.panelContent = "0";
        this.currentOperand = null;
        this.currentOperator = null;
        this.memoryContent = 0; // Storage for memory
        this.newNumberStarted = false; // Flag for new number input, to show first operand
    }
    Calculator.prototype.pressButton = function (b) {
        switch (b) {
            case 'C':
                this.resetCalculator();
                break;
            case '<-':
                if (this.panelContent.length > 1) {
                    this.panelContent = this.panelContent.slice(0, -1); // Remove last character
                }
                else {
                    this.panelContent = "0"; // Reset to zero if only one character left
                }
                break;
            case 'MC':
                this.memoryContent = 0; // Clears the memory
                break;
            case 'MR':
                this.panelContent = this.memoryContent.toString(); // Recalls the memory content to the display
                this.newNumberStarted = true; // Next number starts fresh
                break;
            case 'MS':
                this.memoryContent = parseFloat(this.panelContent); // Stores the current display value into memory
                this.newNumberStarted = true; // Reset display for new input
                break;
            case 'M+':
                this.memoryContent += parseFloat(this.panelContent);
                this.newNumberStarted = true; // Reset display for new input
                break;
            case 'M-':
                this.memoryContent -= parseFloat(this.panelContent);
                this.newNumberStarted = true; // Reset display for new input
                break;
            case '+/-':
                if (this.panelContent !== "0") { // Prevent toggling the sign if zero
                    this.panelContent = this.panelContent.startsWith('-') ?
                        this.panelContent.substring(1) : '-' + this.panelContent;
                }
                break;
            case '|x|':
                this.panelContent = Math.abs(parseFloat(this.panelContent)).toString();
                this.newNumberStarted = true;
                break;
            case '1/x':
                var reciprocal = parseFloat(this.panelContent);
                this.panelContent = reciprocal !== 0 ? (1 / reciprocal).toString() : "Error";
                this.newNumberStarted = true;
                break;
            case '√':
                var sqrtValue = parseFloat(this.panelContent);
                this.panelContent = sqrtValue >= 0 ? Math.sqrt(sqrtValue).toString() : "Error";
                this.newNumberStarted = true;
                break;
            case 'x^2':
                var squareValue = parseFloat(this.panelContent);
                this.panelContent = Math.pow(squareValue, 2).toString();
                this.newNumberStarted = true;
                break;
            case 'π':
                this.panelContent = Math.PI.toString();
                this.newNumberStarted = true;
                break;
            case 'e':
                this.panelContent = Math.E.toString();
                this.newNumberStarted = true;
                break;
            case '2^x':
                var exp2 = parseFloat(this.panelContent);
                this.panelContent = Math.pow(2, exp2).toString();
                this.newNumberStarted = true;
                break;
            case 'e^x':
                var expE = parseFloat(this.panelContent);
                this.panelContent = Math.pow(Math.E, expE).toString();
                this.newNumberStarted = true;
                break;
            case '10^x':
                var exp10 = parseFloat(this.panelContent);
                this.panelContent = Math.pow(10, exp10).toString();
                this.newNumberStarted = true;
                break;
            case '^':
                if (this.currentOperator && !this.newNumberStarted) {
                    this.calculate();
                }
                this.currentOperand = this.panelContent;
                this.currentOperator = '^';
                this.newNumberStarted = true;
                break;
            case 'mod':
                if (this.currentOperator && !this.newNumberStarted) {
                    this.calculate();
                }
                this.currentOperand = this.panelContent;
                this.currentOperator = 'mod';
                this.newNumberStarted = true;
                break;
            case 'n!':
                var n = parseInt(this.panelContent);
                if (n >= 0) {
                    this.panelContent = this.factorial(n).toString();
                }
                else {
                    this.panelContent = "Error";
                }
                this.newNumberStarted = true;
                break;
            case '.':
                if (!this.panelContent.includes('.') || this.newNumberStarted) {
                    this.panelContent = this.newNumberStarted ? '0.' : this.panelContent + '.';
                    this.newNumberStarted = false;
                }
                break;
            case '+':
            case 'X':
            case '-':
            case '/':
                if (this.currentOperator && !this.newNumberStarted) {
                    this.calculate();
                }
                this.currentOperand = this.panelContent; // Update operand to current result or number
                this.currentOperator = b; // Store new operator
                this.newNumberStarted = true; // Prepare for new number input
                break;
            case '=':
                if (this.currentOperator && this.currentOperand !== null) {
                    this.calculate();
                    this.currentOperator = null; // Clear operator after calculation
                    this.newNumberStarted = true; // Indicate that a new number should start the input
                }
                break;
            default:
                this.handleNumericInput(b);
                break;
        }
    };
    Calculator.prototype.handleNumericInput = function (b) {
        if (this.panelContent === "0" || this.newNumberStarted) {
            this.panelContent = b; // Directly replace the panel content if new number starts
            this.newNumberStarted = false;
        }
        else {
            this.panelContent += b; // Append number or '.' to display
        }
    };
    Calculator.prototype.calculate = function () {
        var result = parseFloat(this.currentOperand || "0");
        var currentPanelValue = parseFloat(this.panelContent);
        switch (this.currentOperator) {
            case '+':
                result += currentPanelValue;
                break;
            case 'X':
                result *= currentPanelValue;
                break;
            case '-':
                result -= currentPanelValue;
                break;
            case '/':
                if (currentPanelValue !== 0) {
                    result /= currentPanelValue;
                }
                else {
                    this.panelContent = "Error"; // Handle division by zero
                    return;
                }
                break;
            case '^':
                result = Math.pow(result, currentPanelValue);
                break;
            case 'mod':
                result = result % currentPanelValue;
                break;
        }
        this.panelContent = Number(result.toFixed(10)).toString(); // Rounding to 10 decimal places (avoid precision issues like 2.3 - 0.3 = 1.9999...)
        this.currentOperand = this.panelContent; // Store result as new starting operand for continuous calculations
    };
    Calculator.prototype.resetCalculator = function () {
        this.panelContent = "0";
        this.currentOperand = null;
        this.currentOperator = null;
        this.newNumberStarted = false;
    };
    Calculator.prototype.factorial = function (n) {
        if (n === 0) {
            return 1;
        }
        return n * this.factorial(n - 1);
    };
    Calculator.prototype.getPanelContents = function () {
        return this.panelContent;
    };
    return Calculator;
}());
exports.Calculator = Calculator;
