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
var invoice_service_1 = require('./invoice.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, invoiceService) {
        this.router = router;
        this.invoiceService = invoiceService;
        this.invoices = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.invoiceService.getInvoices()
            .then(function (invoices) { return _this.invoices = invoices.result.slice(0, 3); });
    };
    DashboardComponent.prototype.gotoDetail = function (invoice) {
        var link = ['/invoice', invoice.Id];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard.component.html',
            styleUrls: ['app/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, invoice_service_1.InvoiceService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map