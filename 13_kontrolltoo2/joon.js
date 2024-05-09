"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leiaNullkoht = exports.arvutaYVahemikus = exports.arvutaYMassiiv = exports.LineaarVorrandVabaliikmega = exports.LineaarVorrand = void 0;
// Esimene klass
var LineaarVorrand = /** @class */ (function () {
    function LineaarVorrand(kordaja) {
        this.y = 0;
        this.kordaja = kordaja;
    }
    LineaarVorrand.prototype.arvutaY = function (x) {
        this.y = this.kordaja * x;
    };
    LineaarVorrand.prototype.saaY = function () {
        return this.y;
    };
    return LineaarVorrand;
}());
exports.LineaarVorrand = LineaarVorrand;
// Teine klass vabaliikmega
var LineaarVorrandVabaliikmega = /** @class */ (function () {
    function LineaarVorrandVabaliikmega(kordaja, vabaliige) {
        this.y = 0;
        this.kordaja = kordaja;
        this.vabaliige = vabaliige;
    }
    LineaarVorrandVabaliikmega.prototype.arvutaY = function (x) {
        this.y = this.kordaja * x + this.vabaliige;
    };
    LineaarVorrandVabaliikmega.prototype.saaY = function () {
        return this.y;
    };
    LineaarVorrandVabaliikmega.prototype.sisestaVabaliige = function (v) {
        this.vabaliige = v;
    };
    return LineaarVorrandVabaliikmega;
}());
exports.LineaarVorrandVabaliikmega = LineaarVorrandVabaliikmega;
// Funktsioon y väärtuste massiivi arvutamiseks
function arvutaYMassiiv(xs, vorrand) {
    return xs.map(function (x) {
        vorrand.arvutaY(x);
        return vorrand.saaY();
    });
}
exports.arvutaYMassiiv = arvutaYMassiiv;
// Function to calculate y values for a range of x values
function arvutaYVahemikus(minX, maxX, a, b) {
    var yVaartused = [];
    var vorrand;
    // Kui b = 0 siis esimene variant
    if (b === 0) {
        vorrand = new LineaarVorrand(a);
    }
    else {
        vorrand = new LineaarVorrandVabaliikmega(a, b);
    }
    // Arvutab y väärtuse iga x väärtus korral vahemikus
    for (var x = minX; x <= maxX; x++) {
        vorrand.arvutaY(x);
        yVaartused.push(vorrand.saaY());
    }
    return yVaartused;
}
exports.arvutaYVahemikus = arvutaYVahemikus;
// Funktsioon nullkoha leidmiseks antud vahemikus
function leiaNullkoht(minX, maxX, a, b) {
    var yVaartused = arvutaYVahemikus(minX, maxX, a, b);
    for (var i = 0; i < yVaartused.length - 1; i++) {
        // Kontrollib, kas y märk muutub (mis näitab x teljega lõikumist ehk nullkohta)
        if (yVaartused[i] * yVaartused[i + 1] <= 0) {
            // Nullkoha ligikaudne arvutamine
            var nullKoht = minX + i + (minX + i + 1 - (minX + i)) * (Math.abs(yVaartused[i]) / (Math.abs(yVaartused[i]) + Math.abs(yVaartused[i + 1])));
            return nullKoht;
        }
    }
    return null; // Kui pole, siis NULL!
}
exports.leiaNullkoht = leiaNullkoht;
