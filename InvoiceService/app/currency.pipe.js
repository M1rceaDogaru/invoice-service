"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FormatCurrencyPipe = (function () {
    function FormatCurrencyPipe() {
    }
    FormatCurrencyPipe.prototype.transform = function (value) {
        return (value < 0 ? "-" : "") + "£" + Math.abs(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    };
    FormatCurrencyPipe = __decorate([
        core_1.Pipe({ name: 'formatCurrency' }), 
        __metadata('design:paramtypes', [])
    ], FormatCurrencyPipe);
    return FormatCurrencyPipe;
}());
exports.FormatCurrencyPipe = FormatCurrencyPipe;
//# sourceMappingURL=currency.pipe.js.map