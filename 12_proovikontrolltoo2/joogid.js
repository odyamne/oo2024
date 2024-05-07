"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joogipudel = exports.Jook = void 0;
var Jook = /** @class */ (function () {
    function Jook(nimetus, liitriOmahind, erikaal) {
        this.nimetus = nimetus;
        this.liitriOmahind = liitriOmahind;
        this.erikaal = erikaal;
    }
    return Jook;
}());
exports.Jook = Jook;
var Joogipudel = /** @class */ (function () {
    function Joogipudel(maht, pudelityyp, mass, taaraMaksumus, jook) {
        if (jook === void 0) { jook = null; }
        this.maht = maht;
        this.pudelityyp = pudelityyp;
        this.mass = mass;
        this.taaraMaksumus = taaraMaksumus;
        this.jook = jook;
    }
    Joogipudel.prototype.koguMass = function () {
        return this.mass + (this.jook ? this.jook.erikaal * this.maht : 0);
    };
    Joogipudel.prototype.koguOmahind = function () {
        return this.taaraMaksumus + (this.jook ? this.jook.liitriOmahind * this.maht : 0);
    };
    return Joogipudel;
}());
exports.Joogipudel = Joogipudel;
