interface SavingsParameters {
    initialSavings: number;
    monthlyDeposit: number;
    interestRate: number;
    years: number;
}

function drawChart(): void {
    const canvas = document.getElementById('savingsChart') as HTMLCanvasElement;
    if (!canvas.getContext) {
        return;
    }

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear previous drawings

    const initialSavings = parseFloat((document.getElementById('initialSavings') as HTMLInputElement).value);
    const monthlyDeposit = parseFloat((document.getElementById('monthlyDeposit') as HTMLInputElement).value);
    const interestRate = parseFloat((document.getElementById('interestRate') as HTMLInputElement).value);
    const years = parseInt((document.getElementById('years') as HTMLInputElement).value);

    const savingsData = calculateSavings({
        initialSavings,
        monthlyDeposit,
        interestRate,
        years
    });

    const minY = initialSavings;
    const maxY = Math.max(...savingsData);

    // Draw the chart
    drawSavingsChart(ctx, savingsData, years, minY, maxY);
    // Draw the axes with labels and tick marks
    drawAxes(ctx, canvas.width, canvas.height, years, minY, maxY);
}

function calculateSavings({ initialSavings, monthlyDeposit, interestRate, years }: SavingsParameters): number[] {
    const monthlyInterestRate = interestRate / 12 / 100;
    const totalMonths = years * 12;
    const savingsData = Array(totalMonths).fill(0);
    let currentSavings = initialSavings;

    for (let month = 1; month <= totalMonths; month++) {
        currentSavings += currentSavings * monthlyInterestRate + monthlyDeposit;
        savingsData[month - 1] = currentSavings;
    }

    return savingsData;
}

function drawSavingsChart(ctx: CanvasRenderingContext2D, savingsData: number[], years: number, minY: number, maxY: number): void {
    const margin = 60;
    const stepX = (ctx.canvas.width - 2 * margin) / (years * 12);

    ctx.beginPath();
    ctx.moveTo(margin, ctx.canvas.height - margin);
    savingsData.forEach((amount, month) => {
        ctx.lineTo(margin + stepX * month, ctx.canvas.height - margin - ((amount - minY) / (maxY - minY)) * (ctx.canvas.height - 2 * margin));
    });
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

function drawAxes(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, years: number, minY: number, maxY: number): void {
    const margin = 60;
    const stepY = (canvasHeight - 2 * margin) / 10; // Divide y-axis into 10 equal parts

    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, canvasHeight - margin);
    ctx.lineTo(canvasWidth - margin, canvasHeight - margin);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, canvasHeight - margin);
    ctx.stroke();

    // X-axis ticks and labels
    for (let year = 0; year <= years; year++) {
        const x = margin + (year * (canvasWidth - 2 * margin) / years);
        ctx.fillText(year.toString(), x, canvasHeight - margin + 20);
    }

    // Y-axis ticks and labels
    for (let i = 0; i <= 10; i++) {
        const y = canvasHeight - margin - (i * stepY);
        const label = ((maxY - minY) / 10 * i + minY).toFixed(0);
        ctx.fillText(label, margin - 30, y + 5); // Adjusted label position further left
    }

    // Labels
    ctx.fillText('Aeg aastates', canvasWidth / 2, canvasHeight - 10);
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Hoiuse summa (EUR)', -canvasHeight / 2, margin - 40); // Adjusted y-axis label position to prevent overlap
    ctx.restore();
}

document.getElementById('initialSavings')?.addEventListener('input', drawChart);
document.getElementById('monthlyDeposit')?.addEventListener('input', drawChart);
document.getElementById('interestRate')?.addEventListener('input', drawChart);
document.getElementById('years')?.addEventListener('input', drawChart);
