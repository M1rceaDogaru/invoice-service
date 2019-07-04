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
var invoice_detail_component_1 = require('./invoice-detail.component');
var invoice_service_1 = require('./invoice.service');
var currency_pipe_1 = require('./currency.pipe');
var paging_pipe_1 = require('./paging.pipe');
var InvoicesComponent = (function () {
    function InvoicesComponent(router, invoiceService) {
        this.router = router;
        this.invoiceService = invoiceService;
        this.title = 'My invoices';
        this.currentPage = 1;
        this.recordCount = 0;
        this.pageSize = 10;
        this.sortBy = "InvoiceDate";
        this.sortOrder = "Desc";
    }
    InvoicesComponent.prototype.getInvoices = function () {
        var _this = this;
        this.invoiceService.getInvoices(this.currentPage, this.sortBy, this.sortOrder).then(function (invoices) {
            _this.invoices = invoices.result;
            _this.currentPage = +invoices.currentPage;
            _this.pageSize = +invoices.pageSize;
            _this.recordCount = +invoices.recordCount;
        });
    };
    InvoicesComponent.prototype.ngOnInit = function () {
        this.getInvoices();
    };
    InvoicesComponent.prototype.onSelect = function (invoice) {
        this.selectedInvoice = invoice;
        this.gotoDetail();
    };
    InvoicesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/invoice', this.selectedInvoice.Id]);
    };
    InvoicesComponent.prototype.addInvoice = function () {
        this.selectedInvoice = null;
        this.router.navigate(['/invoice']);
    };
    InvoicesComponent.prototype.close = function () {
        this.getInvoices();
    };
    InvoicesComponent.prototype.deleteInvoice = function (invoice, event) {
        var _this = this;
        event.stopPropagation();
        this.invoiceService
            .delete(invoice)
            .then(function () {
            _this.getInvoices();
        })
            .catch(function (error) { return _this.error = error; });
    };
    InvoicesComponent.prototype.changePage = function (event) {
        this.currentPage = +event.target.value;
        this.getInvoices();
    };
    InvoicesComponent.prototype.sortPage = function (sortBy) {
        if (sortBy == this.sortBy) {
            this.sortOrder = (this.sortOrder === "Asc" ? "Desc" : "Asc");
        }
        else {
            this.sortBy = sortBy;
        }
        this.getInvoices();
    };
    InvoicesComponent = __decorate([
        core_1.Component({
            selector: 'my-invoices',
            templateUrl: 'app/invoices.component.html',
            styleUrls: ['app/invoices.component.css'],
            directives: [invoice_detail_component_1.InvoiceDetailComponent],
            pipes: [currency_pipe_1.FormatCurrencyPipe, paging_pipe_1.ComputePagesPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, invoice_service_1.InvoiceService])
    ], InvoicesComponent);
    return InvoicesComponent;
}());
exports.InvoicesComponent = InvoicesComponent;
//# sourceMappingURL=invoices.component.js.map