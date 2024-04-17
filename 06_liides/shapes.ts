interface Shape {
    calculateArea(): number;
    calculatePerimeter(): number;
    describe(): string;
}

class Circle implements Shape {
    constructor(private radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    describe(): string {
        return `Ring, mille raadius on ${this.radius}`;
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }

    describe(): string {
        return `Ristkülik laiusega ${this.width} and kõrgusega ${this.height}`;
    }
}

function getInputValue(id: string): number {
    return parseFloat((document.getElementById(id) as HTMLInputElement)?.value) || 0;
}

function updateShapeInfo(): void {
    const radius = getInputValue('radius');
    const width = getInputValue('width');
    const height = getInputValue('height');
    const outputElement = document.getElementById('output') as HTMLElement;
    outputElement.innerHTML = ''; // Clear prev. results

    if (radius > 0) {
        const circle = new Circle(radius);
        displayShapeInfo(circle, outputElement);
    }

    if (width > 0 && height > 0) {
        const rectangle = new Rectangle(width, height);
        displayShapeInfo(rectangle, outputElement);
    }
}

function displayShapeInfo(shape: Shape, outputElement: HTMLElement): void {
    const description = shape.describe();
    const area = shape.calculateArea().toFixed(2);
    const perimeter = shape.calculatePerimeter().toFixed(2);
    outputElement.innerHTML += `<p>${description}<br>Pindala: ${area}<br>Ümbermõõt: ${perimeter}</p>`;
}

document.getElementById('calculateButton')?.addEventListener('click', updateShapeInfo);
