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
