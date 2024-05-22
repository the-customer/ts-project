"use strict";
var App;
(function (App) {
    class Cargaisons {
        constructor(x, y) {
            this.x = x;
        }
    }
    App.Cargaisons = Cargaisons;
    App.sommes = (a, b) => a + b;
})(App || (App = {}));
/// <reference path="space.ts"/>
var App;
(function (App) {
    console.log(`Testing... ${App.sommes(10, 3)}`);
})(App || (App = {}));
var App;
(function (App) {
    class Cargaison {
        constructor(x, y) {
            this.x = x;
        }
    }
    App.Cargaison = Cargaison;
    App.somme = (a, b) => a + b;
})(App || (App = {}));
