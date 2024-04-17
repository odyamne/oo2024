var _a;
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * this.radius * this.radius;
    };
    Circle.prototype.calculatePerimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    Circle.prototype.describe = function () {
        return "Ring, mille raadius on ".concat(this.radius);
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.calculatePerimeter = function () {
        return 2 * (this.width + this.height);
    };
    Rectangle.prototype.describe = function () {
        return "Ristk\u00FClik laiusega ".concat(this.width, " and k\u00F5rgusega ").concat(this.height);
    };
    return Rectangle;
}());
function getInputValue(id) {
    var _a;
    return parseFloat((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || 0;
}
function updateShapeInfo() {
    var radius = getInputValue('radius');
    var width = getInputValue('width');
    var height = getInputValue('height');
    var outputElement = document.getElementById('output');
    outputElement.innerHTML = ''; // Clear prev. results
    if (radius > 0) {
        var circle = new Circle(radius);
        displayShapeInfo(circle, outputElement);
    }
    if (width > 0 && height > 0) {
        var rectangle = new Rectangle(width, height);
        displayShapeInfo(rectangle, outputElement);
    }
}
function displayShapeInfo(shape, outputElement) {
    var description = shape.describe();
    var area = shape.calculateArea().toFixed(2);
    var perimeter = shape.calculatePerimeter().toFixed(2);
    outputElement.innerHTML += "<p>".concat(description, "<br>Pindala: ").concat(area, "<br>\u00DCmberm\u00F5\u00F5t: ").concat(perimeter, "</p>");
}
(_a = document.getElementById('calculateButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', updateShapeInfo);
