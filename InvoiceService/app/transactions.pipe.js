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
var CalculateTransactionVatPipe = (function () {
    function CalculateTransactionVatPipe() {
    }
    CalculateTransactionVatPipe.prototype.transform = function (unitPrice, quantity, transaction) {
        //TODO: configurable VAT rate
        transaction.Vat = (unitPrice * quantity) * 20 / 100;
        return transaction.Vat;
    };
    CalculateTransactionVatPipe = __decorate([
        core_1.Pipe({ name: 'calculateTransactionVat' }), 
        __metadata('design:paramtypes', [])
    ], CalculateTransactionVatPipe);
    return CalculateTransactionVatPipe;
}());
exports.CalculateTransactionVatPipe = CalculateTransactionVatPipe;
var CalculateTransactionTotalPipe = (function () {
    function CalculateTransactionTotalPipe() {
    }
    CalculateTransactionTotalPipe.prototype.transform = function (unitPrice, quantity, transaction, invoice) {
        transaction.Total = (unitPrice * quantity) + transaction.Vat;
        var total = 0;
        for (var _i = 0, _a = invoice.Transactions; _i < _a.length; _i++) {
            var transaction_1 = _a[_i];
            total += transaction_1.Total;
        }
        invoice.Total = total;
        return transaction.Total;
    };
    CalculateTransactionTotalPipe = __decorate([
        core_1.Pipe({ name: 'calculateTransactionTotal' }), 
        __metadata('design:paramtypes', [])
    ], CalculateTransactionTotalPipe);
    return CalculateTransactionTotalPipe;
}());
exports.CalculateTransactionTotalPipe = CalculateTransactionTotalPipe;
//# sourceMappingURL=transactions.pipe.js.map