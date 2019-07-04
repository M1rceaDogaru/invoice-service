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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var InvoiceService = (function () {
    function InvoiceService(http) {
        this.http = http;
        this.invoicesUrl = 'api/invoice'; // URL to web api
    }
    InvoiceService.prototype.getInvoices = function (currentPage, sortBy, sortOrder) {
        if (currentPage === void 0) { currentPage = 1; }
        if (sortBy === void 0) { sortBy = "InvoiceDate"; }
        if (sortOrder === void 0) { sortOrder = "Desc"; }
        var url = this.invoicesUrl + "?currentPage=" + currentPage + "&sortBy=" + sortBy + "&sortOrder=" + sortOrder;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    InvoiceService.prototype.getInvoice = function (id) {
        var url = this.invoicesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    InvoiceService.prototype.save = function (invoice) {
        if (invoice.Id) {
            return this.put(invoice);
        }
        return this.post(invoice);
    };
    InvoiceService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    };
    // Add new invoice
    InvoiceService.prototype.post = function (invoice) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.invoicesUrl, JSON.stringify(invoice), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // Update existing invoice
    InvoiceService.prototype.put = function (invoice) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.invoicesUrl + "/" + invoice.Id;
        return this.http
            .put(url, JSON.stringify(invoice), { headers: headers })
            .toPromise()
            .then(function () { return invoice; })
            .catch(this.handleError);
    };
    InvoiceService.prototype.delete = function (invoice) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.invoicesUrl + "/" + invoice.Id;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    InvoiceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InvoiceService);
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map