var _a, _b, _c, _d;
function drawChart() {
    var canvas = document.getElementById('savingsChart');
    if (!canvas.getContext) {
        return;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    var initialSavings = parseFloat(document.getElementById('initialSavings').value);
    var monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    var interestRate = parseFloat(document.getElementById('interestRate').value);
    var years = parseInt(document.getElementById('years').value);
    var savingsData = calculateSavings({
        initialSavings: initialSavings,
        monthlyDeposit: monthlyDeposit,
        interestRate: interestRate,
        years: years
    });
    var minY = initialSavings;
    var maxY = Math.max.apply(Math, savingsData);
    // Draw the chart
    drawSavingsChart(ctx, savingsData, years, minY, maxY);
    // Draw the axes with labels and tick marks
    drawAxes(ctx, canvas.width, canvas.height, years, minY, maxY);
}
function calculateSavings(_a) {
    var initialSavings = _a.initialSavings, monthlyDeposit = _a.monthlyDeposit, interestRate = _a.interestRate, years = _a.years;
    var monthlyInterestRate = interestRate / 12 / 100;
    var totalMonths = years * 12;
    var savingsData = Array(totalMonths).fill(0);
    var currentSavings = initialSavings;
    for (var month = 1; month <= totalMonths; month++) {
        currentSavings += currentSavings * monthlyInterestRate + monthlyDeposit;
        savingsData[month - 1] = currentSavings;
    }
    return savingsData;
}
function drawSavingsChart(ctx, savingsData, years, minY, maxY) {
    var margin = 60;
    var stepX = (ctx.canvas.width - 2 * margin) / (years * 12);
    ctx.beginPath();
    ctx.moveTo(margin, ctx.canvas.height - margin);
    savingsData.forEach(function (amount, month) {
        ctx.lineTo(margin + stepX * month, ctx.canvas.height - margin - ((amount - minY) / (maxY - minY)) * (ctx.canvas.height - 2 * margin));
    });
    ctx.strokeStyle = "blue";
    ctx.stroke();
}
function drawAxes(ctx, canvasWidth, canvasHeight, years, minY, maxY) {
    var margin = 60;
    var stepY = (canvasHeight - 2 * margin) / 10; // Divide y-axis into 10 equal parts
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
    for (var year = 0; year <= years; year++) {
        var x = margin + (year * (canvasWidth - 2 * margin) / years);
        ctx.fillText(year.toString(), x, canvasHeight - margin + 20);
    }
    // Y-axis ticks and labels
    for (var i = 0; i <= 10; i++) {
        var y = canvasHeight - margin - (i * stepY);
        var label = ((maxY - minY) / 10 * i + minY).toFixed(0);
        ctx.fillText(label, margin - 30, y + 5); // Adjusted label position further left
    }
    // Labels
    ctx.fillText('Aeg aastates', canvasWidth / 2, canvasHeight - 10);
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Hoiuse summa (EUR)', -canvasHeight / 2, margin - 40); // Adjusted y-axis label position to prevent overlap
    ctx.restore();
}
(_a = document.getElementById('initialSavings')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', drawChart);
(_b = document.getElementById('monthlyDeposit')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', drawChart);
(_c = document.getElementById('interestRate')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', drawChart);
(_d = document.getElementById('years')) === null || _d === void 0 ? void 0 : _d.addEventListener('input', drawChart);
