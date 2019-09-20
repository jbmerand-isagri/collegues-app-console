"use strict";
var Sejour = /** @class */ (function () {
    function Sejour(nom, prix) {
        this._nom = nom;
        this._prix = prix;
    }
    Object.defineProperty(Sejour.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        set: function (value) {
            this._nom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sejour.prototype, "prix", {
        get: function () {
            return this._prix;
        },
        set: function (value) {
            this._prix = value;
        },
        enumerable: true,
        configurable: true
    });
    return Sejour;
}());
var SejourService = /** @class */ (function () {
    function SejourService() {
        this.sejourArray = [];
        this.sejourArray.push(new Sejour('Paris', 2000));
        this.sejourArray.push(new Sejour('Varsovie', 500));
        this.sejourArray.push(new Sejour('Tokyo', 5500));
    }
    SejourService.prototype.rechercherSejourParNom = function (nom) {
        var sejourDemande = null;
        this.sejourArray.forEach(function (sejour) {
            if (nom === sejour.nom) {
                sejourDemande = sejour;
            }
        });
        return sejourDemande;
    };
    return SejourService;
}());
var sejourService = new SejourService();
console.log(sejourService.rechercherSejourParNom('Tokyo'));
