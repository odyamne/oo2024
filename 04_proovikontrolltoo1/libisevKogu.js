function aritmeetilineKeskmine(a, b, c) {
    return (a + b + c) / 3;
}
// Katsetamine
console.log(aritmeetilineKeskmine(1, 2, 3)); // peaks väljastama 2
function libisevKeskmine(massiiv) {
    var tulemus = [];
    for (var i = 0; i < massiiv.length - 2; i++) {
        tulemus.push(aritmeetilineKeskmine(massiiv[i], massiiv[i + 1], massiiv[i + 2]));
    }
    return tulemus;
}
// Katsetamine
console.log(libisevKeskmine([1, 2, 3, 4, 5])); // peaks väljastama [2, 3, 4]
var ArvudeKoguja = /** @class */ (function () {
    function ArvudeKoguja() {
        this.arvud = [];
        this.tulemused = [];
    }
    // Meetod ühe arvu lisamiseks
    ArvudeKoguja.prototype.lisaArv = function (arv) {
        this.arvud.push(arv);
        // Kui arvude hulk on vähemalt kolm, arvutame uue libiseva keskmise
        if (this.arvud.length >= 3) {
            var n = this.arvud.length;
            var uusKeskmine = this.arvutaKeskmine(this.arvud[n - 3], this.arvud[n - 2], this.arvud[n - 1]);
            this.tulemused.push(uusKeskmine);
        }
    };
    // Meetod keskmise arvutamiseks kolmest arvust
    ArvudeKoguja.prototype.arvutaKeskmine = function (a, b, c) {
        return (a + b + c) / 3;
    };
    // Meetod kõigi libisevate keskmiste saamiseks
    ArvudeKoguja.prototype.leiaLibisevKeskmine = function () {
        return this.tulemused;
    };
    return ArvudeKoguja;
}());
// Kasutamine
var koguja = new ArvudeKoguja();
koguja.lisaArv(1);
koguja.lisaArv(2);
koguja.lisaArv(3);
console.log(koguja.leiaLibisevKeskmine()); // peaks väljastama [2]
koguja.lisaArv(4);
console.log(koguja.leiaLibisevKeskmine()); // peaks väljastama [2, 3]
koguja.lisaArv(5);
console.log(koguja.leiaLibisevKeskmine()); // peaks väljastama [2, 3, 4]
