var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Toode = /** @class */ (function () {
    function Toode(mass, nimetus, hind) {
        this.mass = mass;
        this.nimetus = nimetus;
        this.hind = hind;
    }
    Toode.prototype.naitaDetaile = function (indent) {
        if (indent === void 0) { indent = ''; }
        console.log("".concat(indent, "Toode: ").concat(this.nimetus, ", Mass: ").concat(this.mass, " kg, Hind: ").concat(this.hind, "  EUR"));
    };
    return Toode;
}());
var Kast = /** @class */ (function (_super) {
    __extends(Kast, _super);
    function Kast(mass, nimetus, hind, materjal) {
        var _this = _super.call(this, mass, nimetus, hind) || this;
        _this.materjal = materjal;
        _this.sisu = [];
        return _this;
    }
    Kast.prototype.lisaToode = function (toode) {
        this.sisu.push(toode);
    };
    Kast.prototype.koguMass = function () {
        // Arvuta iseenda JA SISALDUVATE kastide/toodete kogumass tagasiulatuvalt
        var totalContentsMass = this.sisu.reduce(function (summa, toode) {
            // Kui toode on kast, siis uuri tema kogumass rekursiivselt, kui ei siis ainult lisab toote massi
            return summa + (toode instanceof Kast ? toode.koguMass() : toode.mass);
        }, 0);
        return this.mass + totalContentsMass; // Lisab kasti enda massi samuti
    };
    Kast.prototype.naitaDetaile = function (indent) {
        if (indent === void 0) { indent = ''; }
        console.log("".concat(indent, "Kast: ").concat(this.nimetus, ", Mass: ").concat(this.mass, " kg, Hind: ").concat(this.hind, " EUR, Materjal: ").concat(this.materjal, ", Kogumass: ").concat(this.koguMass(), " kg"));
        if (this.sisu.length > 0) {
            console.log("".concat(indent, "Sisu:"));
            this.sisu.forEach(function (toode) {
                toode.naitaDetaile(indent + '  '); // Jooksuta naitaDetaile iga toote korral
            });
        }
        else {
            console.log("{indent}T\u00FChi");
        }
    };
    return Kast;
}(Toode));
// Kasutus
var toode1 = new Toode(2, "Piim", 1.50);
var toode2 = new Toode(1, "Sai", 1.10);
var toode3 = new Toode(1, "Limps", 1.25);
var kast1 = new Kast(0.5, "Väike", 2.50, "Papp");
kast1.lisaToode(toode1);
kast1.lisaToode(toode2);
var kast2 = new Kast(1.3, "Suur", 4.50, "Plastmass");
kast2.lisaToode(kast1); // Viskame kasti kasti
kast2.lisaToode(toode3); // Kast 2 peaks sisaldama Kast 1-te koos kast1 toodetega ja ka limpsi
// Lugemiseks pakkus GPT taandete lisamist, töötas
console.log("Suure kasti info:");
kast2.naitaDetaile();
