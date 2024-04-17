import {Calculator} from "../calculator";

let calcobj:Calculator=null;

beforeEach(() => {
    calcobj=new Calculator();
});

test('Empty init', () => {
    expect(calcobj.getPanelContents()).toBe("0");
 });

test('Simple input', ()=>{
    calcobj.pressButton('7');
    expect(calcobj.getPanelContents()).toBe("7");
});

test('Simple input', ()=>{
    calcobj.pressButton('8');
    expect(calcobj.getPanelContents()).toBe("8");
});

// Additional single-press tests, with actual functionality added 

test('Pressing plus button', () => {
    calcobj.pressButton('+');
    expect(calcobj.getPanelContents()).toBe("0");
});

test('Pressing clear button', () => {
    calcobj.pressButton('7');
    calcobj.pressButton('+');
    calcobj.pressButton('8');
    calcobj.pressButton('C'); // This should clear everything
    expect(calcobj.getPanelContents()).toBe("0");
});

// Continuation of textbook

test('Multiple symbols input', ()=>{
    calcobj.pressButton('7');
    calcobj.pressButton('8');
    expect(calcobj.getPanelContents()).toBe("78");
});

test('Multiple symbols input', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('2');
    expect(calcobj.getPanelContents()).toBe("32");
});

// Extra exercise for 3 symbol test
test('Three symbols input', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('2');
    calcobj.pressButton('2');
    expect(calcobj.getPanelContents()).toBe("322");
});

test('Multiply 1', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('X');
    calcobj.pressButton('2');
    expect(calcobj.getPanelContents()).toBe("2");
});

test('Multiply 2', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('X');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("6");
});

test('Multiply double digits', ()=>{
    calcobj.pressButton('33');
    calcobj.pressButton('X');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("66");
});

// Continuing basic arithmetic tests

test('Divide 1', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('/');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("1.5");
});

test('Divide double digits', ()=>{
    calcobj.pressButton('33');
    calcobj.pressButton('/');
    calcobj.pressButton('11');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("3");
});

test('Divide by zero', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('/');
    calcobj.pressButton('0');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("Error");
});


test('Subtracting 1', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('-');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("1");
});

test('Subtracting double digits', ()=>{
    calcobj.pressButton('33');
    calcobj.pressButton('-');
    calcobj.pressButton('22');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("11");
});

test('Adding 1', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('+');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("5");
});

test('Adding double digits', ()=>{
    calcobj.pressButton('33');
    calcobj.pressButton('+');
    calcobj.pressButton('22');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("55");
});

test('Mark and panel adding', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('+');
    expect(calcobj.getPanelContents()).toBe("3");
});

test('Mark and panel subtracting', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('-');
    expect(calcobj.getPanelContents()).toBe("3");
});

test('Mark and panel multiplying', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('X');
    expect(calcobj.getPanelContents()).toBe("3");
});

test('Mark and panel dividing', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('/');
    expect(calcobj.getPanelContents()).toBe("3");
});

// Testing for new second calculation without clearing first

test('Second calculation start', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('+');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("5");
    calcobj.pressButton('4');
    expect(calcobj.getPanelContents()).toBe("4");
});

// Test for x+x+x+x+ etc

test('Continous calculation', ()=>{
    calcobj.pressButton('3');
    calcobj.pressButton('+');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("5");
    calcobj.pressButton('+');
    calcobj.pressButton('1');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("6");
});

test('Floating point', ()=>{
    calcobj.pressButton('5');
    calcobj.pressButton('/');
    calcobj.pressButton('3');
    calcobj.pressButton('=');
    expect(parseFloat(calcobj.getPanelContents())).toBeCloseTo(1.6666666, 6);
});

// FURTHER DEVELOPMENT SECTIONS

// <- section
test('<- removes the last character', () => {
    calcobj.pressButton('1');
    calcobj.pressButton('2');
    calcobj.pressButton('3');
    calcobj.pressButton('<-');
    expect(calcobj.getPanelContents()).toBe("12");
});

test('<- resets to 0 if one character left', () => {
    calcobj.pressButton('1');
    calcobj.pressButton('<-');
    expect(calcobj.getPanelContents()).toBe("0");
});

test('<- does nothing if display is already 0', () => {
    calcobj.pressButton('<-');
    expect(calcobj.getPanelContents()).toBe("0");
});
// Memory section

test('MS stores current display to memory and MR recalls last stored ', () => {
    calcobj.pressButton('3');
    calcobj.pressButton('MS');
    calcobj.pressButton('C');// Clear display to see if number was actually in memory
    calcobj.pressButton('MR');// Recall 3
    expect(calcobj.getPanelContents()).toBe("3");
});

test('M+ adds current display value to memory', () => {
    calcobj.pressButton('3');
    calcobj.pressButton('MS');// Store 3 in memory
    calcobj.pressButton('2');
    calcobj.pressButton('M+');// Add 2, memory should now be 5
    calcobj.pressButton('MR');// Recall memory
    expect(calcobj.getPanelContents()).toBe("5");
});

test('M- subtracts current display value from memory', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('MS');// Store 5 in memory
    calcobj.pressButton('2');
    calcobj.pressButton('M-');// Subtract 2, memory should now be 3
    calcobj.pressButton('MR');// Recall memory
    expect(calcobj.getPanelContents()).toBe("3");
});

test('MC clears memory', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('MS');// Store 5 in memory
    calcobj.pressButton('MC');// Clear memory
    calcobj.pressButton('MR');// Recall memory, should be 0 as memory is cleared
    expect(calcobj.getPanelContents()).toBe("0");
});

test('Memory operations are persistent across operations', () => {
    calcobj.pressButton('9');
    calcobj.pressButton('MS');// Memory = 9
    calcobj.pressButton('5');
    calcobj.pressButton('M+');// Memory = 9 + 5
    calcobj.pressButton('2');
    calcobj.pressButton('M-');// Memory = 14 - 2
    calcobj.pressButton('MR');// Recall memory, should be 12
    expect(calcobj.getPanelContents()).toBe("12");
});

//MATH FUNCTIONS SECTION

test('Decimal number test', () => {
    calcobj.pressButton('2');
    calcobj.pressButton('.');
    calcobj.pressButton('3'); // Expected display 2.3
    calcobj.pressButton('-');
    calcobj.pressButton('0');
    calcobj.pressButton('.');
    calcobj.pressButton('3');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("2");
});

test('Absolute value and negative button test', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('+/-');
    expect(calcobj.getPanelContents()).toBe("-5");
    calcobj.pressButton('|x|');
    expect(calcobj.getPanelContents()).toBe("5");
});

test('Reciprocal', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('1/x');
    expect(calcobj.getPanelContents()).toBe("0.2");
});

test('Reciprocal of zero', () => {
    calcobj.pressButton('0');
    calcobj.pressButton('1/x');
    expect(calcobj.getPanelContents()).toBe("Error");
});

test('Square root', () => {
    calcobj.pressButton('9');
    calcobj.pressButton('√');
    expect(calcobj.getPanelContents()).toBe("3");
});

test('Square root of negative number', () => {
    calcobj.pressButton('1');
    calcobj.pressButton('6');
    calcobj.pressButton('+/-');
    calcobj.pressButton('√');
    expect(calcobj.getPanelContents()).toBe("Error");
});

test('Squaring', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('x^2');
    expect(calcobj.getPanelContents()).toBe("25");
});

test('Pi constant', () => {
    calcobj.pressButton('π');
    expect(calcobj.getPanelContents()).toBe(Math.PI.toString());
});

test('Euler number', () => {
    calcobj.pressButton('e');
    expect(calcobj.getPanelContents()).toBe(Math.E.toString());
});

test('2 raised to x', () => {
    calcobj.pressButton('3');
    calcobj.pressButton('2^x');
    expect(calcobj.getPanelContents()).toBe("8");
});

test('e raised to x', () => {
    calcobj.pressButton('2');
    calcobj.pressButton('e^x');
    expect(calcobj.getPanelContents()).toBe(Math.pow(Math.E, 2).toString());
});

test('10 raised to x', () => {
    calcobj.pressButton('2');
    calcobj.pressButton('10^x');
    expect(calcobj.getPanelContents()).toBe("100");
});

test('x raised to y', () => {
    calcobj.pressButton('3');
    calcobj.pressButton('^');
    calcobj.pressButton('2');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("9");
});

test('Remainder operation', () => {
    calcobj.pressButton('8');
    calcobj.pressButton('mod');
    calcobj.pressButton('3');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContents()).toBe("2");
});

test('Factorial', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('n!');
    expect(calcobj.getPanelContents()).toBe("120");
});

test('Factorial of negative', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('+/-');
    calcobj.pressButton('n!');
    expect(calcobj.getPanelContents()).toBe("Error");
});