var Raamat = /** @class */ (function () {
    function Raamat(isbn, pealkiri, autor, avaldamisaasta) {
        this.isbn = isbn;
        this.pealkiri = pealkiri;
        this.autor = autor;
        this.avaldamisaasta = avaldamisaasta;
    }
    return Raamat;
}());
var Kasutaja = /** @class */ (function () {
    function Kasutaja(id, nimi, email) {
        this.id = id;
        this.nimi = nimi;
        this.email = email;
    }
    return Kasutaja;
}());
var Raamatukogu = /** @class */ (function () {
    function Raamatukogu() {
        this.raamatud = new Map(); // Iga "Raamat" klassi elukas on 1 raamatud muutuja 
        this.kasutajad = new Map();
        this.laenutatudRaamatud = new Map(); // Kaardistab ISBN-i kasutaja ID-le
    }
    Raamatukogu.prototype.lisaRaamat = function (raamat) {
        this.raamatud.set(raamat.isbn, raamat);
    };
    Raamatukogu.prototype.naitaKoikiRaamatuid = function () {
        console.log("Raamatukogu kataloog:");
        this.raamatud.forEach(function (raamat, isbn) {
            console.log("ISBN: ".concat(isbn, ", Pealkiri: ").concat(raamat.pealkiri, ", Autor: ").concat(raamat.autor, ", Avaldamisaasta: ").concat(raamat.avaldamisaasta));
        });
        if (this.raamatud.size === 0) {
            console.log("Raamatukogu on tühi :(");
        }
    };
    Raamatukogu.prototype.lisaKasutaja = function (kasutaja) {
        this.kasutajad.set(kasutaja.id, kasutaja);
    };
    Raamatukogu.prototype.laenutaRaamat = function (isbn, kasutajaId) {
        if (!this.raamatud.has(isbn)) {
            return "Raamatut ei leitud.";
        }
        if (!this.kasutajad.has(kasutajaId)) {
            return "Kasutajat ei leitud.";
        }
        if (this.laenutatudRaamatud.has(isbn)) {
            return "Raamat on juba laenutatud.";
        }
        this.laenutatudRaamatud.set(isbn, kasutajaId);
        return "Laenutamine õnnestus.";
    };
    Raamatukogu.prototype.tagastaRaamat = function (isbn) {
        if (!this.laenutatudRaamatud.has(isbn)) {
            return "See raamat ei olnud laenutatud.";
        }
        this.laenutatudRaamatud.delete(isbn);
        return "Raamat tagastati edukalt.";
    };
    Raamatukogu.prototype.naitaLaenutatudRaamatuid = function () {
        return this.laenutatudRaamatud;
    };
    return Raamatukogu;
}());
var raamatukogu = new Raamatukogu();
var raamat1 = new Raamat("9781473231061", "The Last Wish: Witcher 1", "Andrzej Sapkowski", 2020);
var kasutaja1 = new Kasutaja("123", "Ander Aava", "ander.aava@test.ee");
raamatukogu.lisaRaamat(raamat1);
raamatukogu.lisaKasutaja(kasutaja1);
raamatukogu.naitaKoikiRaamatuid();
console.log(raamatukogu.laenutaRaamat("9781473231061", "123"));
console.log(raamatukogu.naitaLaenutatudRaamatuid()); // Peaks andma Witcheri isbn ja kasutaja id sisaldava esimese kaardi
console.log(raamatukogu.tagastaRaamat("9781473231061")); // Peaks trükkima "Raamat tagastati edukalt."
console.log(raamatukogu.naitaLaenutatudRaamatuid()); // Peaks näitama tühja kaarti, kuna raamat on tagastatud
