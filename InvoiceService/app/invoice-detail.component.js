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
var router_1 = require('@angular/router');
var invoice_1 = require('./invoice');
var invoice_service_1 = require('./invoice.service');
var currency_pipe_1 = require('./currency.pipe');
var InvoiceDetailComponent = (function () {
    function InvoiceDetailComponent(invoiceService, route, router) {
        this.invoiceService = invoiceService;
        this.route = route;
        this.router = router;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
        this.invoiceIsPaid = false;
    }
    InvoiceDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    InvoiceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = params['id'];
                _this.navigated = true;
                _this.invoiceService.getInvoice(id)
                    .then(function (invoice) {
                    _this.invoice = invoice;
                    _this.calculateInvoiceAmounts();
                    _this.invoiceIsPaid = _this.invoice.Status === 'Paid';
                });
            }
            else {
                _this.navigated = false;
                _this.invoice = new invoice_1.Invoice();
                _this.invoice.Status = 'Draft';
                _this.invoice.Total = 0;
                _this.invoice.VatTotal = 0;
            }
        });
    };
    InvoiceDetailComponent.prototype.ngAfterViewInit = function () {
        //$('#invoiceDate').datepicker({ dateFormat: 'yy-mm-dd', timeFormat: "hh:mm:ss" });
    };
    InvoiceDetailComponent.prototype.save = function () {
        var _this = this;
        this.invoiceService
            .save(this.invoice)
            .then(function (invoice) {
            _this.invoice = invoice; // saved invoice, w/ id if new
            _this.goBack(invoice);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    InvoiceDetailComponent.prototype.goBack = function (savedInvoice) {
        if (savedInvoice === void 0) { savedInvoice = null; }
        this.close.emit(savedInvoice);
        this.router.navigate(['/invoices']);
    };
    InvoiceDetailComponent.prototype.addTransaction = function () {
        var newTransaction = new invoice_1.Transaction();
        newTransaction.UnitPrice = 0;
        newTransaction.Quantity = 0;
        this.invoice.Transactions = this.invoice.Transactions || [];
        this.invoice.Transactions.push(newTransaction);
        this.calculateInvoiceAmounts(newTransaction);
    };
    InvoiceDetailComponent.prototype.deleteTransaction = function (transaction) {
        this.invoice.Transactions = this.invoice.Transactions.filter(function (trans) { return trans !== transaction; });
        this.calculateInvoiceAmounts();
    };
    InvoiceDetailComponent.prototype.calculateInvoiceAmounts = function (transaction) {
        if (transaction === void 0) { transaction = null; }
        if (transaction) {
            transaction.Vat = (transaction.UnitPrice * transaction.Quantity) * 20 / 100;
            transaction.Total = (transaction.UnitPrice * transaction.Quantity) + transaction.Vat;
        }
        var total = 0;
        var vatTotal = 0;
        for (var _i = 0, _a = this.invoice.Transactions; _i < _a.length; _i++) {
            var transaction_1 = _a[_i];
            total += transaction_1.Total;
            vatTotal += transaction_1.Vat;
        }
        this.invoice.Total = total;
        this.invoice.VatTotal = vatTotal;
    };
    InvoiceDetailComponent.prototype.markAsPaid = function () {
        this.invoice.Status = "Paid";
        this.save();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', invoice_1.Invoice)
    ], InvoiceDetailComponent.prototype, "invoice", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InvoiceDetailComponent.prototype, "close", void 0);
    InvoiceDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-invoice-detail',
            templateUrl: 'app/invoice-detail.component.html',
            styleUrls: ['app/invoice-detail.component.css'],
            pipes: [currency_pipe_1.FormatCurrencyPipe]
        }), 
        __metadata('design:paramtypes', [invoice_service_1.InvoiceService, router_1.ActivatedRoute, router_1.Router])
    ], InvoiceDetailComponent);
    return InvoiceDetailComponent;
}());
exports.InvoiceDetailComponent = InvoiceDetailComponent;
//# sourceMappingURL=invoice-detail.component.js.map